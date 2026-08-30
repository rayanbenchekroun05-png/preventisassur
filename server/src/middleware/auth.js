const { verifyToken } = require('../utils/jwt');
const pool = require('../db');

// Vérifie le cookie de session ET que le compte est toujours actif en base
// (important : si l'admin supprime un employé, sa session en cours doit être
// coupée immédiatement, pas seulement à l'expiration du cookie 8h plus tard).
async function requireAuth(req, res, next) {
  const token = req.cookies && req.cookies.session;
  if (!token) return res.status(401).json({ error: 'Non authentifié.' });
  try {
    const payload = verifyToken(token);
    const { rows } = await pool.query(
      'SELECT id, username, name, role, title FROM employees WHERE id = $1 AND active = true',
      [payload.id]
    );
    if (!rows[0]) return res.status(401).json({ error: 'Ce compte a été désactivé.' });
    req.employee = rows[0];
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Session expirée ou invalide.' });
  }
}

// À utiliser après requireAuth : réserve la route au rôle admin.
function requireAdmin(req, res, next) {
  if (!req.employee || req.employee.role !== 'admin') {
    return res.status(403).json({ error: "Accès réservé à la direction du cabinet." });
  }
  next();
}

module.exports = { requireAuth, requireAdmin };