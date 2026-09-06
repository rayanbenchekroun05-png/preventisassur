const express = require('express');
const pool = require('../db');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

function serialize(row) {
  return {
    id: row.id,
    employeeId: row.employee_id,
    employeeName: row.name,
    label: row.label,
    approved: row.approved,
    requestedAt: row.requested_at,
    approvedAt: row.approved_at,
    lastUsedAt: row.last_used_at,
  };
}

// GET /api/devices — liste de tous les appareils, en attente en premier (admin uniquement).
router.get('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT d.*, e.name FROM trusted_devices d
       JOIN employees e ON e.id = d.employee_id
       ORDER BY d.approved ASC, d.requested_at DESC`
    );
    res.json({ devices: rows.map(serialize) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// PATCH /api/devices/:id/approve — valider une demande de connexion (admin uniquement).
router.patch('/:id/approve', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { rows } = await pool.query(
      'UPDATE trusted_devices SET approved = true, approved_at = now() WHERE id = $1 RETURNING *',
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Demande introuvable.' });
    const { rows: withName } = await pool.query(
      'SELECT d.*, e.name FROM trusted_devices d JOIN employees e ON e.id = d.employee_id WHERE d.id = $1',
      [rows[0].id]
    );
    res.json({ device: serialize(withName[0]) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// DELETE /api/devices/:id — refuser une demande en attente, ou révoquer un appareil déjà approuvé (admin uniquement).
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM trusted_devices WHERE id = $1', [req.params.id]);
    if (!rowCount) return res.status(404).json({ error: 'Appareil introuvable.' });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

module.exports = router;