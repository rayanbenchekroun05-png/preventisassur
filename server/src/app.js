require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const leadsRoutes = require('./routes/leads.routes');
const employeesRoutes = require('./routes/employees.routes');
const messagesRoutes = require('./routes/messages.routes');
const devicesRoutes = require('./routes/devices.routes');

const app = express();

app.set('trust proxy', 1); // nécessaire derrière Nginx / Vercel / un load balancer pour un rate-limit correct

app.use(express.json({ limit: '200kb' }));
app.use(cookieParser());

// En développement, le frontend peut tourner sur un autre port ; en production
// (VPS ou Vercel), il est servi depuis le même domaine donc CORS n'est pas
// nécessaire. On l'active simplement en dev pour plus de confort.
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: true, credentials: true }));
}

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/devices', devicesRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true }));

// Sert le site (public/) — utile en local et sur un VPS.
// Sur Vercel, le dossier /public est servi directement en statique (CDN),
// ce middleware n'intervient donc pas pour ces requêtes-là.
const publicDir = path.join(__dirname, '..', '..', 'public');
app.use(express.static(publicDir));

// Toute route non-API renvoie index.html (site en une seule page)
app.get(/^\/(?!api\/).*/, (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erreur serveur.' });
});

module.exports = app;