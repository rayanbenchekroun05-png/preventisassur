const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Active SSL automatiquement chez la plupart des hébergeurs cloud (Neon, Render, Railway...).
  // En local (localhost), on désactive SSL.
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('localhost')
    ? false
    : { rejectUnauthorized: false },
  // Sur Vercel (fonctions serverless), garde ce nombre bas — utilise de préférence
  // l'URL de connexion "pooled" fournie par Neon/Vercel Postgres (via PgBouncer).
  max: parseInt(process.env.PG_POOL_MAX || '5', 10),
});

pool.on('error', (err) => {
  console.error('Erreur inattendue du pool PostgreSQL', err);
});

module.exports = pool;
