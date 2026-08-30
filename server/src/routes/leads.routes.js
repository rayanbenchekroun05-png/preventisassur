const express = require('express');
const rateLimit = require('express-rate-limit');
const pool = require('../db');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

const COVERAGE_TYPES = ['seul', 'enfants', 'epouse', 'famille'];
const SERVICES = ['iard', 'decennale', 'auto', 'personnes'];
const STATUSES = ['nouveau', 'assigne', 'contacte', 'clos'];

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 12, // 12 demandes / heure / IP — laisse largement passer un usage normal, freine le spam de formulaire
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de demandes envoyées. Merci de réessayer plus tard ou de nous contacter directement.' },
});

function isEmail(v) { return typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

async function nextRef(client) {
  const year = new Date().getFullYear();
  const { rows } = await client.query(
    "SELECT COUNT(*)::int AS n FROM leads WHERE ref LIKE $1",
    [`PA-${year}-%`]
  );
  const n = (rows[0].n || 0) + 1;
  return `PA-${year}-${String(n).padStart(4, '0')}`;
}

function serializeLead(row, members) {
  return {
    id: row.id,
    ref: row.ref,
    coverageType: row.coverage_type,
    service: row.service,
    primary: {
      nom: row.nom, prenom: row.prenom, tel: row.telephone, email: row.email,
      adresse: row.adresse, codePostal: row.code_postal, message: row.message,
    },
    members: (members || []).map(m => ({ nom: m.nom, prenom: m.prenom, lien: m.lien })),
    consent: row.consent,
    status: row.status,
    assignedTo: row.assigned_to,
    createdAt: row.created_at,
  };
}

// POST /api/leads — formulaire public de demande de devis (aucune authentification requise)
router.post('/', submitLimiter, async (req, res) => {
  const body = req.body || {};
  const { coverageType, service, primary, members, consent } = body;

  if (!COVERAGE_TYPES.includes(coverageType)) return res.status(400).json({ error: 'Formule invalide.' });
  if (!SERVICES.includes(service)) return res.status(400).json({ error: 'Garantie invalide.' });
  if (!consent) return res.status(400).json({ error: "Le consentement à l'utilisation des données est requis." });
  if (!primary || !primary.nom || !primary.prenom || !primary.tel || !primary.adresse || !primary.codePostal) {
    return res.status(400).json({ error: 'Merci de compléter toutes les coordonnées obligatoires.' });
  }
  if (!isEmail(primary.email)) return res.status(400).json({ error: 'Adresse e-mail invalide.' });

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const ref = await nextRef(client);
    const insert = await client.query(
      `INSERT INTO leads (ref, coverage_type, service, nom, prenom, telephone, email, adresse, code_postal, message, consent, consent_at, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,true,now(),'nouveau') RETURNING *`,
      [ref, coverageType, service, primary.nom, primary.prenom, primary.tel, primary.email, primary.adresse, primary.codePostal, primary.message || null]
    );
    const lead = insert.rows[0];

    const insertedMembers = [];
    if (Array.isArray(members)) {
      for (const m of members) {
        if (!m || (!m.nom && !m.prenom)) continue;
        const r = await client.query(
          'INSERT INTO lead_members (lead_id, lien, nom, prenom) VALUES ($1,$2,$3,$4) RETURNING *',
          [lead.id, m.lien || null, m.nom || null, m.prenom || null]
        );
        insertedMembers.push(r.rows[0]);
      }
    }

    await client.query('COMMIT');
    res.status(201).json({ lead: serializeLead(lead, insertedMembers) });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: "Erreur lors de l'enregistrement de la demande." });
  } finally {
    client.release();
  }
});

// À partir d'ici, toutes les routes exigent une session employé valide.
router.use(requireAuth);

// GET /api/leads — liste des dossiers (agents : uniquement les leurs ; admin : tous)
router.get('/', async (req, res) => {
  try {
    const params = [];
    let where = '';
    if (req.employee.role === 'agent') {
      params.push(req.employee.id);
      where = 'WHERE assigned_to = $1';
    }
    const { rows } = await pool.query(`SELECT * FROM leads ${where} ORDER BY created_at DESC`, params);
    const ids = rows.map(r => r.id);
    let membersByLead = {};
    if (ids.length) {
      const { rows: memberRows } = await pool.query('SELECT * FROM lead_members WHERE lead_id = ANY($1)', [ids]);
      membersByLead = memberRows.reduce((acc, m) => {
        (acc[m.lead_id] = acc[m.lead_id] || []).push(m);
        return acc;
      }, {});
    }
    res.json({ leads: rows.map(r => serializeLead(r, membersByLead[r.id])) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// PATCH /api/leads/:id/assign — attribution à un conseiller (admin uniquement)
router.patch('/:id/assign', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { assignedTo } = req.body || {};
  try {
    if (assignedTo) {
      const agent = await pool.query("SELECT id FROM employees WHERE id = $1 AND role = 'agent' AND active = true", [assignedTo]);
      if (!agent.rows.length) return res.status(400).json({ error: 'Conseiller invalide.' });
    }
    const current = await pool.query('SELECT * FROM leads WHERE id = $1', [id]);
    if (!current.rows.length) return res.status(404).json({ error: 'Dossier introuvable.' });

    const newStatus = assignedTo && current.rows[0].status === 'nouveau' ? 'assigne' : current.rows[0].status;
    const { rows } = await pool.query(
      'UPDATE leads SET assigned_to = $1, status = $2 WHERE id = $3 RETURNING *',
      [assignedTo || null, newStatus, id]
    );
    const { rows: members } = await pool.query('SELECT * FROM lead_members WHERE lead_id = $1', [id]);
    res.json({ lead: serializeLead(rows[0], members) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// PATCH /api/leads/:id/status — mise à jour du statut (admin, ou agent sur ses propres dossiers)
router.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};
  if (!STATUSES.includes(status)) return res.status(400).json({ error: 'Statut invalide.' });
  try {
    const current = await pool.query('SELECT * FROM leads WHERE id = $1', [id]);
    if (!current.rows.length) return res.status(404).json({ error: 'Dossier introuvable.' });
    if (req.employee.role === 'agent' && current.rows[0].assigned_to !== req.employee.id) {
      return res.status(403).json({ error: "Ce dossier ne vous est pas attribué." });
    }
    const { rows } = await pool.query('UPDATE leads SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
    const { rows: members } = await pool.query('SELECT * FROM lead_members WHERE lead_id = $1', [id]);
    res.json({ lead: serializeLead(rows[0], members) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

module.exports = router;
