// Point d'entrée Vercel : toute requête vers /api/* est routée ici (voir vercel.json).
// Vercel appelle directement l'app Express comme une fonction (req, res) —
// pas besoin d'app.listen ici, contrairement à server/src/index.js.
module.exports = require('../server/src/app');
