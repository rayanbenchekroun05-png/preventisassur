// Point d'entrée pour un serveur classique (local, VPS, Docker).
// Sur Vercel, c'est /api/index.js qui est utilisé à la place (pas d'app.listen
// avec les fonctions serverless : Vercel appelle directement l'app Express).
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✓ Preventisassur en écoute sur http://localhost:${PORT}`);
});
