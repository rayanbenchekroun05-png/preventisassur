require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('./db');

async function upsertEmployee({ username, password, name, role, title }) {
  const hash = await bcrypt.hash(password, 12);
  const existing = await pool.query('SELECT id FROM employees WHERE username = $1', [username]);
  if (existing.rows.length) {
    await pool.query(
      'UPDATE employees SET password_hash=$1, name=$2, role=$3, title=$4 WHERE username=$5',
      [hash, name, role, title, username]
    );
    console.log(`↻ Compte mis à jour : ${username}`);
  } else {
    await pool.query(
      'INSERT INTO employees (username, password_hash, name, role, title) VALUES ($1,$2,$3,$4,$5)',
      [username, hash, name, role, title]
    );
    console.log(`+ Compte créé : ${username}`);
  }
}

async function run() {
  const adminUser = process.env.SEED_ADMIN_USERNAME || 'admin';
  const adminPass = process.env.SEED_ADMIN_PASSWORD || 'change-this-password';
  const adminName = process.env.SEED_ADMIN_NAME || 'Direction Preventisassur';

  await upsertEmployee({ username: adminUser, password: adminPass, name: adminName, role: 'admin', title: 'Direction du cabinet' });

  // Deux comptes conseillers de démonstration — à adapter ou supprimer.
  await upsertEmployee({ username: 'agent1', password: 'agent2026', name: 'Karim Benali', role: 'agent', title: 'Conseiller IARD' });
  await upsertEmployee({ username: 'agent2', password: 'agent2026', name: 'Julie Renard', role: 'agent', title: 'Conseillère RC Décennale' });

  console.log('\n✓ Comptes prêts. Pense à changer le mot de passe admin dès la première connexion.');
  await pool.end();
}

run().catch((err) => {
  console.error('✗ Échec du seed :', err);
  process.exit(1);
});
