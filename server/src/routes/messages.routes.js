const express = require('express');
const rateLimit = require('express-rate-limit');
const pool = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const postLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30, // 30 messages / minute / IP — largement suffisant pour un usage normal, freine le spam
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de messages envoyés, patiente quelques secondes.' },
});

function serialize(row) {
  return {
    id: row.id,
    content: row.content,
    createdAt: row.created_at,
    employee: { id: row.employee_id, name: row.name, role: row.role },
  };
}

// GET /api/messages — les 200 derniers messages de la messagerie d'équipe (tout employé connecté).
router.get('/', requireAuth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT m.*, e.name, e.role
       FROM messages m
       JOIN employees e ON e.id = m.employee_id
       ORDER BY m.created_at DESC
       LIMIT 200`
    );
    res.json({ messages: rows.reverse().map(serialize) }); // ordre chronologique (plus ancien en premier)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// POST /api/messages — envoyer un message à l'équipe (tout employé connecté).
router.post('/', requireAuth, postLimiter, async (req, res) => {
  const content = (req.body && req.body.content ? String(req.body.content) : '').trim();
  if (!content) return res.status(400).json({ error: 'Le message est vide.' });
  if (content.length > 2000) return res.status(400).json({ error: 'Message trop long (2000 caractères maximum).' });

  try {
    const { rows } = await pool.query(
      'INSERT INTO messages (employee_id, content) VALUES ($1, $2) RETURNING *',
      [req.employee.id, content]
    );
    const row = { ...rows[0], name: req.employee.name, role: req.employee.role };
    res.status(201).json({ message: serialize(row) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

module.exports = router;