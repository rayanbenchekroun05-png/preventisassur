# Preventisassur — Site + espace employés

Site vitrine, formulaire de demande de devis (IARD / RC Décennale / Automobile / Santé)
et espace employés (attribution des dossiers, suivi, dossier de travail par conseiller).

- **Frontend** : HTML/CSS/JS natif, aucun build nécessaire (`/public`)
- **Backend** : Node.js + Express, API REST (`/server`), aussi exploitable comme
  fonction serverless (`/api/index.js`, pour Vercel)
- **Base de données** : PostgreSQL
- **Auth** : session par cookie httpOnly signé (JWT), mots de passe hashés (bcrypt)

```
preventisassur-app/
├── public/              # Frontend (index.html, styles.css, app.js)
├── server/
│   ├── src/
│   │   ├── app.js               # l'app Express (routes, middlewares) — sans app.listen
│   │   ├── index.js              # démarre l'app en serveur classique (local/VPS/Docker)
│   │   ├── db.js, migrate.js, seed.js
│   │   ├── middleware/auth.js
│   │   └── routes/ (auth, leads, employees)
│   └── migrations/001_init.sql
├── api/
│   └── index.js          # ré-exporte l'app Express pour Vercel (fonction serverless)
├── package.json           # à la racine : c'est lui que Vercel utilise pour installer les dépendances
├── vercel.json             # route /api/* vers la fonction serverless
├── Dockerfile / docker-compose.yml
└── README.md
```

---

## 1. Ouvrir le projet dans Visual Studio Code

1. Décompresse le zip, ouvre le dossier `preventisassur-app` dans VS Code (`File > Open Folder`).
2. Installe l'extension **ESLint** (optionnel) et assure-toi d'avoir **Node.js 18+** installé sur ta machine.
3. Ouvre un terminal intégré (`` Ctrl+` ``) et lance :
   ```bash
   npm install
   ```
4. Copie le fichier d'exemple d'environnement :
   ```bash
   cp .env.example .env
   ```
   puis édite `.env` (renseigne `DATABASE_URL` vers une base PostgreSQL locale ou distante, et `JWT_SECRET`).
5. Prépare la base et lance le serveur :
   ```bash
   npm run migrate
   npm run seed
   npm run dev
   ```
   Le site tourne sur http://localhost:3000. `npm run dev` redémarre automatiquement à chaque modification.

### Comptes créés par `npm run seed`

| Rôle | Identifiant | Mot de passe |
|---|---|---|
| Direction (admin) | valeur de `SEED_ADMIN_USERNAME` | valeur de `SEED_ADMIN_PASSWORD` |
| Conseiller | `agent1` | `agent2026` |
| Conseiller | `agent2` | `agent2026` |

**Change le mot de passe admin dès la première connexion** (pour l'instant, en éditant `server/src/seed.js` puis en relançant `npm run seed`).

---

## 2. Connecter le projet à GitHub

Dans le terminal VS Code, à la racine du projet :

```bash
git init
git add .
git commit -m "Premier commit — site Preventisassur"
```

Puis sur github.com, crée un nouveau dépôt vide (sans README, sans .gitignore — on les a déjà), et lie-le :

```bash
git remote add origin https://github.com/TON-COMPTE/preventisassur.git
git branch -M main
git push -u origin main
```

Le `.gitignore` du projet exclut déjà `node_modules/` et `.env` — tes secrets ne partiront jamais sur GitHub.

Tu peux aussi le faire directement depuis VS Code : icône **Source Control** dans la barre latérale
→ *Publish to GitHub*, une fois connecté à ton compte GitHub dans VS Code.

---

## 3. Déployer sur Vercel

Le projet est déjà prêt pour Vercel (`vercel.json` + `api/index.js`). Il te faut juste une base
PostgreSQL accessible depuis internet — je recommande **Neon** (gratuit, et pensé pour le serverless).

### Étape A — créer la base de données (Neon)

1. Va sur neon.tech, crée un compte et un projet (choisis une région proche, ex. Paris/Francfort).
2. Récupère la **chaîne de connexion "pooled"** (celle avec `-pooler` dans le nom d'hôte — importante pour le serverless).
3. En local, dans ton `.env`, mets cette valeur dans `DATABASE_URL`, puis exécute une seule fois :
   ```bash
   npm run migrate
   npm run seed
   ```
   Cela crée les tables et les comptes employés directement sur ta base Neon.

### Étape B — déployer sur Vercel

1. Va sur vercel.com, connecte-toi avec ton compte GitHub.
2. *Add New → Project*, sélectionne le dépôt `preventisassur` que tu viens de pousser.
3. Vercel détecte automatiquement `package.json` et `vercel.json` — laisse les réglages par défaut (pas de "build command" nécessaire, ce n'est pas un site avec compilation).
4. Avant de déployer, ajoute les variables d'environnement (*Settings → Environment Variables*) :

   | Nom | Valeur |
   |---|---|
   | `DATABASE_URL` | ta chaîne de connexion Neon (pooled) |
   | `JWT_SECRET` | une valeur aléatoire longue (`openssl rand -hex 32`) |
   | `NODE_ENV` | `production` |

5. Clique sur **Deploy**. Ton site est en ligne sur `ton-projet.vercel.app`.

### Étape C — brancher ton propre domaine

Dans le projet Vercel : *Settings → Domains* → ajoute ton domaine (celui que tu as acheté), puis suis les
instructions pour pointer tes DNS (Vercel indique les enregistrements A/CNAME à ajouter chez ton registrar).
Le HTTPS est automatique et gratuit.

### À savoir sur la version Vercel

- Chaque requête `/api/*` est traitée par une fonction serverless (démarrage à froid possible,
  quelques centaines de ms de latence de temps en temps — normal sur l'offre gratuite).
- Le "rate limiting" (protection anti-spam du formulaire et anti-bruteforce du login) est moins
  fiable en serverless qu'avec un vrai serveur, car chaque instance a sa propre mémoire. Pour un usage
  pro à fort trafic, un VPS (voir section 4) donne un contrôle plus fin ; pour un usage normal, Vercel
  convient très bien.
- Le dossier `/public` est servi directement par le CDN de Vercel (rapide), et seules les requêtes
  `/api/*` passent par la fonction serverless.

---

## 4. Alternative : déployer sur un VPS (si tu préfères un serveur classique)

```bash
sudo apt update && sudo apt install -y nodejs npm postgresql nginx
sudo npm install -g pm2

sudo -u postgres psql -c "CREATE USER preventisassur WITH PASSWORD 'un-mot-de-passe-solide';"
sudo -u postgres psql -c "CREATE DATABASE preventisassur OWNER preventisassur;"

cd preventisassur-app
cp .env.example .env
nano .env
npm install
npm run migrate
npm run seed

pm2 start server/src/index.js --name preventisassur
pm2 save
pm2 startup
```

```nginx
server {
    listen 80;
    server_name tondomaine.fr www.tondomaine.fr;
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/preventisassur /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d tondomaine.fr -d www.tondomaine.fr
```

### Avec Docker (local ou VPS)

```bash
docker compose up -d
docker compose exec app npm run migrate
docker compose exec app npm run seed
```

---

## 5. Ce que fait déjà l'application

- Formulaire client public en 4 étapes (formule → garantie → coordonnées + consentement → confirmation),
  avec génération automatique d'une référence de dossier (`PA-2026-0001`, etc.)
- Quatre garanties : IARD, RC Décennale, Automobile, Assurance Santé
- Connexion employés par identifiant/mot de passe, session sécurisée par cookie httpOnly
- Espace **direction (admin)** : toutes les demandes, attribution à un conseiller, tableau de bord
  par statut/garantie, dossier de travail par conseiller
- Espace **conseiller (agent)** : uniquement ses dossiers attribués, mise à jour du statut
- Site bilingue FR/EN, boutons interactifs (survol/clic)

## 6. Prochaines améliorations possibles

- Envoi automatique de l'e-mail d'accusé de réception au client (Resend, Postmark, ou SMTP)
- Écran de gestion des comptes employés pour la direction
- Export CSV des dossiers
- Journal d'activité pour la traçabilité RGPD
