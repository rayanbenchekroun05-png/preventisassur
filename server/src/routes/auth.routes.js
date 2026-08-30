const express = require('express');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const pool = require('../db');
const { signToken, verifyToken } = require('../utils/jwt');

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // 20 tentatives / 15 min / IP — protège contre le bruteforce du login employés
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de tentatives de connexion. Réessaie dans quelques minutes.' },
});

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 8 * 60 * 60 * 1000, // 8h
};

function toPublicEmployee(row) {
  return { id: row.id, username: row.username, name: row.name, role: row.role, title: row.title };
}

// POST /api/auth/login
router.post('/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Identifiant et mot de passe requis.' });
  }
  try {
    const { rows } = await pool.query(
      'SELECT * FROM employees WHERE username = $1 AND active = true',
      [String(username).trim()]
    );
    const emp = rows[0];
    if (!emp) return res.status(401).json({ error: 'Identifiant ou mot de passe incorrect.' });

    const ok = await bcrypt.compare(password, emp.password_hash);
    if (!ok) return res.status(401).json({ error: 'Identifiant ou mot de passe incorrect.' });

    const token = signToken({ id: emp.id, username: emp.username, role: emp.role, name: emp.name, title: emp.title });
    res.cookie('session', token, COOKIE_OPTS);
    res.json({ user: toPublicEmployee(emp) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('session', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
  res.json({ ok: true });
});

// GET /api/auth/me — restaure la session depuis le cookie (permet de rester connecté après un rafraîchissement de page)
router.get('/me', async (req, res) => {
  const token = req.cookies && req.cookies.session;
  if (!token) return res.json({ user: null });
  try {
    const payload = verifyToken(token);
    const { rows } = await pool.query('SELECT * FROM employees WHERE id = $1 AND active = true', [payload.id]);
    if (!rows[0]) return res.json({ user: null });
    res.json({ user: toPublicEmployee(rows[0]) });
  } catch (e) {
    res.json({ user: null });
  }
});

module.exports = router;
