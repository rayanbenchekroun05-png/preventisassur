const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  console.warn('⚠ JWT_SECRET manquant dans .env — utilise une valeur par défaut non sûre pour le développement uniquement.');
}

function signToken(payload) {
  return jwt.sign(payload, SECRET || 'dev-secret-do-not-use-in-production', { expiresIn: '8h' });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET || 'dev-secret-do-not-use-in-production');
}

module.exports = { signToken, verifyToken };
