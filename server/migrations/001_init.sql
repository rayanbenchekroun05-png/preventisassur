-- Schéma initial Preventisassur
-- Exécuté par "npm run migrate" (voir src/migrate.js)

CREATE TABLE IF NOT EXISTS employees (
  id            SERIAL PRIMARY KEY,
  username      VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name          VARCHAR(120) NOT NULL,
  role          VARCHAR(20) NOT NULL CHECK (role IN ('admin','agent')),
  title         VARCHAR(150),
  active        BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS leads (
  id             SERIAL PRIMARY KEY,
  ref            VARCHAR(30) UNIQUE NOT NULL,
  coverage_type  VARCHAR(20) NOT NULL CHECK (coverage_type IN ('seul','enfants','epouse','famille')),
  service        VARCHAR(20) NOT NULL CHECK (service IN ('iard','decennale','auto','personnes')),
  nom            VARCHAR(120) NOT NULL,
  prenom         VARCHAR(120) NOT NULL,
  telephone      VARCHAR(30) NOT NULL,
  email          VARCHAR(160) NOT NULL,
  adresse        VARCHAR(255) NOT NULL,
  code_postal    VARCHAR(10) NOT NULL,
  message        TEXT,
  consent        BOOLEAN NOT NULL DEFAULT false,
  consent_at     TIMESTAMPTZ,
  status         VARCHAR(20) NOT NULL DEFAULT 'nouveau' CHECK (status IN ('nouveau','assigne','contacte','clos')),
  assigned_to    INTEGER REFERENCES employees(id) ON DELETE SET NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lead_members (
  id       SERIAL PRIMARY KEY,
  lead_id  INTEGER NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  lien     VARCHAR(60),
  nom      VARCHAR(120),
  prenom   VARCHAR(120)
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_lead_members_lead_id ON lead_members(lead_id);
