const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

function isValidUsername(u) {
  return typeof u === 'string' && /^[a-zA-Z0-9._-]{3,50}$/.test(u);
}

// GET /api/employees — liste de toute l'équipe (admin uniquement).
// Ne renvoie jamais le hash de mot de passe.
router.get('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, username, name, role, title FROM employees WHERE active = true ORDER BY role, name"
    );
    res.json({ employees: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// POST /api/employees — ajouter un membre à l'équipe (admin uniquement).
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  const { username, password, name, role, title } = req.body || {};

  if (!isValidUsername(username)) {
    return res.status(400).json({ error: "Identifiant invalide (3 à 50 caractères : lettres, chiffres, '.', '_', '-')." });
  }
  if (!password || String(password).length < 6) {
    return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères.' });
  }
  if (!name || !String(name).trim()) {
    return res.status(400).json({ error: 'Le nom est requis.' });
  }
  if (!['admin', 'agent'].includes(role)) {
    return res.status(400).json({ error: 'Rôle invalide.' });
  }

  try {
    const hash = await bcrypt.hash(password, 12);
    const { rows } = await pool.query(
      `INSERT INTO employees (username, password_hash, name, role, title)
       VALUES ($1,$2,$3,$4,$5) RETURNING id, username, name, role, title`,
      [username.trim(), hash, name.trim(), role, title ? String(title).trim() : null]
    );
    res.status(201).json({ employee: rows[0] });
  } catch (err) {
    if (err.code === '23505') { // violation de contrainte unique (identifiant déjà pris)
      return res.status(409).json({ error: 'Cet identifiant est déjà utilisé.' });
    }
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// DELETE /api/employees/:id — retirer un membre de l'équipe (admin uniquement).
// Les dossiers en cours qui lui étaient attribués repassent en "nouveau" et non-attribués ;
// ses dossiers déjà "contactés" ou "clos" gardent leur statut (pour l'historique).
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  const targetId = Number(req.params.id);

  if (targetId === req.employee.id) {
    return res.status(400).json({ error: 'Impossible de retirer son propre compte.' });
  }

  const client = await pool.connect();
  try {
    const target = await client.query('SELECT * FROM employees WHERE id = $1 AND active = true', [targetId]);
    if (!target.rows.length) return res.status(404).json({ error: 'Employé introuvable.' });

    if (target.rows[0].role === 'admin') {
      const { rows } = await client.query("SELECT COUNT(*)::int AS n FROM employees WHERE role = 'admin' AND active = true");
      if (rows[0].n <= 1) {
        return res.status(400).json({ error: 'Impossible de supprimer le dernier compte de direction.' });
      }
    }

    await client.query('BEGIN');
    await client.query(
      "UPDATE leads SET assigned_to = NULL, status = CASE WHEN status = 'assigne' THEN 'nouveau' ELSE status END WHERE assigned_to = $1",
      [targetId]
    );
    await client.query('DELETE FROM employees WHERE id = $1', [targetId]);
    await client.query('COMMIT');
    res.json({ ok: true });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur.' });
  } finally {
    client.release();
  }
});

module.exports = router;