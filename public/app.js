/* ============================= DATA & i18n ============================= */
/* Employee accounts now live in the PostgreSQL database (see /server).
   The frontend only ever receives the current user (via /api/auth/me or
   /api/auth/login) and, for admins, the list of agents (via /api/employees).
   Passwords never reach the browser. */
const API = '/api';

const IMG = {
  hero:'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
  iard:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  decennale:'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
  auto:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
  personnes:'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
  trust:'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1000&q=80',
  login:'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
};

const TR = {
  fr:{
    nav_home:'Accueil', nav_services:'Nos garanties', nav_trust:'Le cabinet', nav_contact:'Contact',
    nav_client:'Demander un devis', nav_staff:'Espace employés', learn_more:'En savoir plus',
    hero_eyebrow:'Cabinet de courtage indépendant',
    hero_title:'Chaque protection commence par un dossier bien tenu.',
    hero_lead:"Preventisassur compare, négocie et suit votre dossier d'assurance — santé, habitation, auto, moto, mutuelle professionnelle, IARD ou RC décennale — du premier échange jusqu'à la signature de votre contrat.",
    hero_cta1:'Demander un devis', hero_cta2:"Découvrir nos garanties",
    stat1n:'2024', stat1l:"création du cabinet", stat2n:'ORIAS', stat2l:'courtier inscrit', stat3n:'48h', stat3l:'délai de réponse moyen',
    services_eyebrow:'Nos garanties', services_title:'Deux métiers, une même exigence de suivi.',
    services_lead:"Que vous protégiez votre foyer ou votre activité de construction, un conseiller dédié reste responsable de votre dossier jusqu'au bout.",
    iard_tag:'Particuliers & professionnels', iard_title:'IARD — Incendie, Accidents, Risques Divers',
    iard_desc:'Habitation, automobile, multirisque professionnelle : une protection large pour vous et les vôtres, ajustée à la réalité de votre foyer.',
    iard_l1:'Habitation propriétaire ou locataire', iard_l2:'Multirisque professionnelle', iard_l3:'Dégât des eaux, incendie, vol',
    decennale_tag:'Artisans & entreprises du BTP', decennale_title:'RC Décennale',
    decennale_desc:"L'assurance obligatoire des artisans et entreprises du bâtiment, valable dix ans après la réception des travaux.",
    decennale_l1:'Couverture obligatoire tous corps de métier', decennale_l2:'Attestation fournie sous 48h', decennale_l3:'Accompagnement chantier par chantier',
    iard_info_p1:"L'IARD (Incendie, Accidents et Risques Divers) regroupe les assurances qui protègent votre logement et vos biens contre les sinistres du quotidien : incendie, dégât des eaux, vol, bris de glace, catastrophes naturelles. Elle inclut aussi une garantie responsabilité civile qui couvre les dommages que vous pourriez causer involontairement à autrui.",
    iard_info_p2:"Que vous soyez propriétaire ou locataire, l'assurance habitation IARD est souvent obligatoire pour les locataires et toujours recommandée pour protéger financièrement votre foyer. Une formule multirisque professionnelle existe aussi pour les commerces et les bureaux.",
    decennale_info_p1:"La responsabilité civile décennale est une assurance obligatoire pour tout professionnel du bâtiment — maçon, couvreur, électricien, architecte — qui réalise des travaux de construction ou de rénovation touchant à la structure d'un bâtiment.",
    decennale_info_p2:"Elle couvre, pendant dix ans après la réception des travaux, les dommages qui compromettent la solidité de l'ouvrage ou le rendent impropre à sa destination : fissures importantes, infiltrations, effondrement. Sans cette assurance, l'exercice de l'activité est illégal en France (loi Spinetta).",
    auto_info_p1:"L'assurance automobile couvre votre véhicule et votre responsabilité en cas d'accident. La garantie au tiers, obligatoire, couvre les dommages que vous causez à autrui. Les formules intermédiaires et tous risques ajoutent une protection pour votre propre véhicule : vol, incendie, bris de glace, dommages tous accidents.",
    auto_info_p2:"Elle s'applique aussi aux deux-roues et aux flottes de véhicules professionnels, avec des garanties complémentaires comme l'assistance ou le véhicule de remplacement en cas d'immobilisation.",
    personnes_info_p1:"L'assurance santé, ou complémentaire santé, rembourse tout ou partie des frais médicaux qui restent à votre charge après le remboursement de la Sécurité sociale : consultations, hospitalisation, optique, dentaire.",
    personnes_info_p2:"Elle peut s'accompagner d'une garantie prévoyance, qui vous protège financièrement, vous et votre famille, en cas de décès, d'invalidité ou d'arrêt de travail prolongé.",
    auto_tag:'Particuliers & professionnels', auto_title:'Assurance Automobile',
    auto_desc:"Voiture, deux-roues ou flotte professionnelle : une formule ajustée à votre usage, du tiers au tous risques.",
    auto_l1:'Du tiers au tous risques', auto_l2:'Deux-roues et flottes professionnelles', auto_l3:'Assistance et véhicule de remplacement',
    personnes_tag:'Vous et vos proches', personnes_title:'Assurance Santé',
    personnes_desc:"Santé, prévoyance, complémentaire retraite : une protection pour vous et votre famille face aux aléas de la vie.",
    personnes_l1:'Complémentaire santé', personnes_l2:'Prévoyance (décès, invalidité, arrêt de travail)', personnes_l3:'Épargne et complémentaire retraite',
    trust_eyebrow:'Le cabinet', trust_title:'Un conseiller, pas un centre d\'appels.',
    trust_lead:"Preventisassur accompagne familles, indépendants et entreprises du bâtiment dans la construction de leur dossier d'assurance — avec un seul interlocuteur du début à la fin.",
    tp1t:'Comparateur indépendant', tp1d:"Nous ne sommes liés à aucun assureur : nous choisissons pour vous.",
    tp2t:'Un dossier, un conseiller', tp2d:'La même personne suit votre demande de la première prise de contact à la signature.',
    tp3t:'Réponse rapide', tp3d:'Accusé de réception sous 48h, par e-mail, pour chaque demande.',
    tp4t:'Données protégées', tp4d:'Vos informations ne servent qu\'à votre mise en relation avec un conseiller.',
    cta_title:'Prêt à constituer votre dossier ?', cta_lead:'Le formulaire prend moins de trois minutes.', cta_btn:'Demander un devis',
    foot_about:"Preventisassur est un cabinet de courtage en assurance indépendant, spécialisé en IARD et en responsabilité civile décennale.",
    foot_nav:'Navigation', foot_staff:'Accès professionnels', foot_staff_link:'Connexion employés',
    foot_legal:'Informations', foot_legal1:'Mentions légales', foot_legal2:'Politique de confidentialité', foot_legal3:'Réclamations',
    legal_back:"Retour à l'accueil",
    legal_mentions_title:'Mentions légales',
    legal_mentions_body:`
      <h3>Éditeur du site</h3>
      <p>Preventisassur, SASU au capital social de 1 000 €, immatriculée au RCS de Paris sous le numéro 938 236 825, dont le siège social est situé 229 rue Saint-Honoré, 75001 Paris, France.</p>
      <p>Directeur de la publication : Idrissi Yazami Taoufik.</p>
      <h3>Activité réglementée</h3>
      <p>Preventisassur est un courtier en assurance (COA), immatriculé à l'ORIAS sous le numéro 25 001 045 (<a href="https://www.orias.fr" target="_blank" rel="noopener">www.orias.fr</a>), sous le contrôle de l'Autorité de Contrôle Prudentiel et de Résolution (ACPR) — 4 place de Budapest, CS 92459, 75436 Paris Cedex 09.</p>
      <h3>Hébergement</h3>
      <p>Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.</p>
      <h3>Médiation de l'assurance</h3>
      <p>En cas de litige non résolu avec Preventisassur, vous pouvez saisir gratuitement le médiateur de l'assurance : La Médiation de l'Assurance, TSA 50110, 75441 Paris Cedex 09 — <a href="https://www.mediation-assurance.org" target="_blank" rel="noopener">www.mediation-assurance.org</a>.</p>
      <h3>Propriété intellectuelle</h3>
      <p>L'ensemble des contenus de ce site (textes, logos, mise en page) est la propriété de Preventisassur, sauf mention contraire, et ne peut être reproduit sans autorisation préalable.</p>
    `,
    legal_privacy_title:'Politique de confidentialité',
    legal_privacy_body:`
      <h3>Responsable du traitement</h3>
      <p>Preventisassur, 229 rue Saint-Honoré, 75001 Paris, est responsable du traitement des données collectées via ce site.</p>
      <h3>Données collectées</h3>
      <p>Lors d'une demande de devis, nous collectons : nom, prénom, téléphone, e-mail, adresse, code postal, la composition du foyer concerné par la demande, et une description libre du besoin.</p>
      <h3>Finalité et base légale</h3>
      <p>Ces données sont utilisées exclusivement pour vous mettre en relation avec un conseiller Preventisassur et établir un devis d'assurance, sur la base du consentement que vous donnez en cochant la case dédiée du formulaire.</p>
      <h3>Destinataires</h3>
      <p>Vos données sont accessibles à l'équipe de conseillers de Preventisassur en charge de votre dossier. Elles peuvent être transmises aux compagnies d'assurance partenaires strictement dans le cadre de l'établissement de votre devis.</p>
      <h3>Durée de conservation</h3>
      <p>Vos données sont conservées le temps nécessaire au traitement de votre demande, puis archivées conformément aux obligations légales applicables au courtage en assurance.</p>
      <h3>Cookies</h3>
      <p>Le site n'utilise aucun cookie de mesure d'audience ou publicitaire. Un unique cookie technique, strictement nécessaire, est déposé lors de la connexion à l'espace employés pour maintenir la session de travail.</p>
      <h3>Vos droits</h3>
      <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et d'opposition sur vos données. Vous pouvez exercer ces droits en contactant Preventisassur, et introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener">www.cnil.fr</a>) si vous estimez que vos droits ne sont pas respectés.</p>
    `,
    legal_complaints_title:'Réclamations',
    legal_complaints_body:`
      <h3>Comment déposer une réclamation</h3>
      <p>Si vous n'êtes pas satisfait du traitement de votre dossier, vous pouvez adresser votre réclamation directement à votre conseiller Preventisassur, ou par écrit au siège social : 229 rue Saint-Honoré, 75001 Paris.</p>
      <h3>Délais de traitement</h3>
      <p>Un accusé de réception vous sera adressé sous 10 jours ouvrables, et une réponse sur le fond sous 2 mois maximum à compter de la réception de votre réclamation, conformément aux recommandations de l'ACPR.</p>
      <h3>En cas de désaccord persistant</h3>
      <p>Si la réponse apportée ne vous satisfait pas, vous pouvez saisir gratuitement le médiateur de l'assurance : La Médiation de l'Assurance, TSA 50110, 75441 Paris Cedex 09 — <a href="https://www.mediation-assurance.org" target="_blank" rel="noopener">www.mediation-assurance.org</a>.</p>
      <h3>Autorité de contrôle</h3>
      <p>Preventisassur est un courtier en assurance inscrit à l'ORIAS (n°25 001 045) et contrôlé par l'ACPR — 4 place de Budapest, CS 92459, 75436 Paris Cedex 09.</p>
    `,
    foot_rights:'© 2026 Preventisassur. Tous droits réservés.', foot_orias:'SIREN 938 236 825 · 229 rue Saint-Honoré, 75001 Paris · ORIAS n°25 001 045, sous contrôle de l\'ACPR',

    /* quote form */
    q_step1:'Formule', q_step2:'Garantie', q_step3:'Coordonnées', q_step4:'Confirmation',
    q1_title:'Pour qui est cette demande ?', q1_sub:'Choisissez la formule la plus proche de votre situation ; vous pourrez préciser les membres de votre foyer à l\'étape suivante.',
    c_seul_t:'Moi seul(e)', c_seul_d:'Une protection individuelle, pensée pour vous.',
    c_enfants_t:'Moi et mes enfants', c_enfants_d:'Un socle familial, sans conjoint(e) rattaché(e) au dossier.',
    c_epouse_t:'Moi et mon (ma) conjoint(e)', c_epouse_d:'Une couverture pensée à deux.',
    c_famille_t:'Toute la famille', c_famille_d:'Conjoint(e) et enfants réunis dans un même dossier.',
    q2_title:'Quelle garantie souhaitez-vous étudier ?', q2_sub:'Vous pourrez toujours ajuster votre demande avec votre conseiller.',
    g_iard_t:'IARD', g_iard_d:'Habitation, multirisque.',
    g_dec_t:'RC Décennale', g_dec_d:'Assurance obligatoire des professionnels du bâtiment.',
    g_auto_t:'Automobile', g_auto_d:'Voiture, deux-roues, flotte professionnelle.',
    g_pers_t:'Assurance santé', g_pers_d:'Santé, prévoyance, retraite.',
    q3_title:'Vos coordonnées', q3_sub:'Ces informations permettent à votre conseiller de vous recontacter et de préparer votre dossier.',
    f_nom:'Nom', f_prenom:'Prénom', f_tel:'Téléphone', f_email:'E-mail', f_adresse:"Adresse d'habitation", f_cp:'Code postal',
    f_message:'Décrivez votre besoin', f_message_ph:'Ex : je souhaite assurer ma maison de 90m² et mon véhicule utilitaire…',
    members_title:'Membres à inclure dans le dossier',
    tag_conjoint:'Conjoint(e)', tag_enfant:'Enfant', add_child:'Ajouter un enfant', remove:'Retirer',
    q4_title:'Dernière étape', q4_sub:'Vérifiez votre demande avant envoi.',
    consent:"J'accepte que mes données soient utilisées pour ma demande de mise en relation, et ce, avec accusé de réception par le courtier Preventisassur à l'adresse e-mail que j'ai fournie.",
    btn_next:'Continuer', btn_back:'Retour', btn_send:'Envoyer ma demande',
    confirm_title:'Votre dossier a bien été enregistré', confirm_lead:'Un conseiller Preventisassur reviendra vers vous sous 48h. Un accusé de réception vous a été envoyé par e-mail.',
    confirm_ref:'Référence de dossier', confirm_home:"Retour à l'accueil",
    err_required:'Merci de compléter ce champ.', err_consent:'Merci d\'accepter l\'utilisation de vos données pour continuer.', err_choice:'Merci de faire un choix pour continuer.',

    /* login */
    login_title:'Espace employés', login_lead:'Connectez-vous pour accéder aux dossiers clients et à votre espace de travail.',
    login_visual_title:'Un espace pensé pour le suivi de dossier', login_visual_lead:'Attribution des demandes, suivi de statut, dossier de travail par conseiller.',
    f_username:'Identifiant', f_password:'Mot de passe', btn_login:'Se connecter', login_error:'Identifiant ou mot de passe incorrect.',
    show_password:'Afficher', hide_password:'Masquer',

    /* dashboard */
    dash_leads:'Demandes', dash_team:'Équipe', logout:'Déconnexion',
    dash_all_status:'Tous les statuts', dash_all_service:'Toutes les garanties',
    st_nouveau:'Nouveau', st_assigne:'Assigné', st_contacte:'Contacté', st_clos:'Clos',
    col_ref:'Référence', col_date:'Date', col_formule:'Formule', col_service:'Garantie', col_statut:'Statut', col_conseiller:'Conseiller', col_actions:'',
    stat_total:'Demandes reçues', stat_new:'Non assignées', stat_progress:'En cours', stat_closed:'Dossiers clos',
    empty_leads:'Aucune demande pour le moment.', empty_leads_agent:"Aucun dossier ne vous est encore attribué.",
    detail_title:'Détail du dossier', assign_to:'Attribuer à', unassigned:'Non attribué',
    detail_primary:'Demandeur principal', detail_members:'Membres du foyer', detail_message:'Besoin exprimé', detail_consent:'Consentement RGPD donné le',
    update_status:'Mettre à jour le statut', view:'Voir le dossier',
    team_title:'Dossier de travail par conseiller', team_assigned:'Attribués', team_contacted:'Contactés', team_closed:'Clos',
    team_admins_title:'Direction du cabinet', team_you:'Vous', team_add_title:'Ajouter un membre',
    team_add_success:'Compte créé avec succès.', team_remove_success:'Membre retiré de l\'équipe.',
    team_remove_confirm:'Retirer {name} de l\'équipe ? Ses dossiers en cours redeviendront non attribués.',
    f_fullname:'Nom complet', f_role:'Rôle', role_admin:'Direction', role_agent:'Conseiller',
    f_title:'Poste (optionnel)', f_title_ph:'Ex : Conseiller IARD', btn_add:'Ajouter', btn_remove:'Retirer', btn_cancel:'Annuler',
    dash_chat:'Messagerie', chat_placeholder:'Écrire un message à l\'équipe…', chat_send:'Envoyer',
    chat_empty:'Aucun message pour le moment. Soyez le premier à écrire à l\'équipe !', chat_you:'Vous',
    change_password:'Mot de passe', pwd_modal_title:'Changer mon mot de passe',
    f_current_password:'Mot de passe actuel', f_new_password:'Nouveau mot de passe', f_confirm_password:'Confirmer le nouveau mot de passe',
    pwd_mismatch:'Les deux mots de passe ne correspondent pas.', pwd_success:'Mot de passe mis à jour avec succès.', btn_save:'Enregistrer',
    remember_me:'Rester connecté', login_pending:'Ta demande de connexion est en attente de validation par un administrateur.',
    devices_pending_title:'Demandes de connexion en attente', devices_none_pending:'Aucune demande en attente.',
    devices_approved_title:'Appareils approuvés', devices_approved_since:'depuis le',
    device_approve:'Approuver', device_reject:'Refuser', device_revoke:'Révoquer',
    device_approved:'Appareil approuvé.', device_rejected:'Appareil retiré.',
        device_reject_confirm:'Retirer cet appareil ? La personne devra refaire une demande pour se reconnecter depuis celui-ci.',
    btn_reset_password:'Réinitialiser', reset_password_confirm:'Générer un nouveau mot de passe temporaire pour {name} ? Son mot de passe actuel cessera immédiatement de fonctionner.',
    temp_password_title:'Nouveau mot de passe temporaire', temp_password_lead:'Communique ce mot de passe à {name} — il ne sera plus jamais affiché.',
    btn_copy:'Copier', copied:'Copié !', btn_close:'Fermer',
    notif_new_lead_one:'Nouvelle demande reçue : {ref}', notif_new_lead_many:'{n} nouvelles demandes reçues',
    notif_assigned_one:'Un dossier vous a été attribué : {ref}', notif_assigned_many:'{n} dossiers vous ont été attribués',
  },
  en:{
    nav_home:'Home', nav_services:'Cover', nav_trust:'The firm', nav_contact:'Contact',
    nav_client:'Get a quote', nav_staff:'Staff portal', learn_more:'Learn more',
    hero_eyebrow:'Independent brokerage firm',
    hero_title:'Every policy starts with a well-kept file.',
    hero_lead:'Preventisassur compares, negotiates and follows your insurance file — health, home, motor, motorcycle, professional group cover, IARD or ten-year builder liability — from the first contact to the signed policy.',
    hero_cta1:'Get a quote', hero_cta2:'See our cover',
    stat1n:'2024', stat1l:'firm founded', stat2n:'ORIAS', stat2l:'registered broker', stat3n:'48h', stat3l:'average response time',
    services_eyebrow:'Our cover', services_title:'Two lines of business, one standard of follow-up.',
    services_lead:'Whether you are protecting your home or your building trade, one dedicated advisor stays responsible for your file until it is settled.',
    iard_tag:'Individuals & professionals', iard_title:'IARD — Home, Motor & Multi-risk',
    iard_desc:'Home, motor, professional multi-risk: broad cover for you and your household, adjusted to your real situation.',
    iard_l1:'Home cover, owner or tenant', iard_l2:'Professional multi-risk', iard_l3:'Water damage, fire, theft',
    decennale_tag:'Tradespeople & building firms', decennale_title:'Ten-Year Builder Liability',
    decennale_desc:'The compulsory cover for building tradespeople and firms, valid for ten years after handover of the works.',
    decennale_l1:'Compulsory cover, every trade', decennale_l2:'Certificate issued within 48h', decennale_l3:'Support site by site',
    iard_info_p1:"IARD (Fire, Accident and Miscellaneous Risks) covers your home and belongings against everyday incidents: fire, water damage, theft, broken glass, and natural disasters. It also includes civil liability cover for damage you might accidentally cause to others.",
    iard_info_p2:"Whether you own or rent, IARD home insurance is often compulsory for tenants and always recommended to protect your household financially. A professional multi-risk version also exists for shops and offices.",
    decennale_info_p1:"Ten-year builder liability is compulsory insurance for any building trade professional — bricklayer, roofer, electrician, architect — carrying out construction or renovation work that affects a building's structure.",
    decennale_info_p2:"For ten years after the work is handed over, it covers damage that compromises the soundness of the building or makes it unfit for its purpose: major cracks, water infiltration, collapse. Without this cover, practising the trade is illegal in France (Loi Spinetta).",
    auto_info_p1:"Motor insurance covers your vehicle and your liability in the event of an accident. Third-party cover, which is compulsory, covers damage you cause to others. Intermediate and fully comprehensive policies add protection for your own vehicle: theft, fire, broken glass, all-accident damage.",
    auto_info_p2:"It also applies to two-wheelers and company fleets, with add-ons such as roadside assistance or a replacement vehicle if yours is off the road.",
    personnes_info_p1:"Health insurance, or supplementary health cover, reimburses some or all of the medical costs left after France's basic social security scheme pays its share: consultations, hospital stays, optical and dental care.",
    personnes_info_p2:"It can be combined with income-protection cover, which protects you and your family financially in the event of death, disability, or long-term incapacity to work.",
    auto_tag:'Individuals & professionals', auto_title:'Motor Insurance',
    auto_desc:'Car, two-wheeler or company fleet: cover tailored to how you actually drive, from third-party to fully comprehensive.',
    auto_l1:'Third-party to fully comprehensive', auto_l2:'Two-wheelers and company fleets', auto_l3:'Roadside assistance and replacement vehicle',
    personnes_tag:'You and your family', personnes_title:'Health Insurance',
    personnes_desc:'Health, income protection, retirement savings: cover for you and your family against life\'s setbacks.',
    personnes_l1:'Supplementary health cover', personnes_l2:'Income protection (death, disability, incapacity)', personnes_l3:'Savings and retirement top-up',
    trust_eyebrow:'The firm', trust_title:'An advisor, not a call centre.',
    trust_lead:'Preventisassur has supported families, sole traders and building firms in building their insurance file — with a single point of contact from start to finish.',
    tp1t:'Independent broker', tp1d:'We are tied to no single insurer: we choose on your behalf.',
    tp2t:'One file, one advisor', tp2d:'The same person follows your request from first contact to signature.',
    tp3t:'Fast turnaround', tp3d:'Acknowledgement by e-mail within 48h for every request.',
    tp4t:'Protected data', tp4d:'Your information is only used to put you in touch with an advisor.',
    cta_title:'Ready to open your file?', cta_lead:'The form takes under three minutes.', cta_btn:'Get a quote',
    foot_about:'Preventisassur is an independent insurance brokerage, specialised in IARD and ten-year builder liability.',
    foot_nav:'Navigation', foot_staff:'Staff access', foot_staff_link:'Staff login',
    foot_legal:'Information', foot_legal1:'Legal notice', foot_legal2:'Privacy policy', foot_legal3:'Complaints',
    legal_back:'Back to home',
    legal_mentions_title:'Legal notice',
    legal_mentions_body:`
      <h3>Site publisher</h3>
      <p>Preventisassur, a French SASU with share capital of €1,000, registered with the Paris Trade and Companies Register under number 938 236 825, with registered office at 229 rue Saint-Honoré, 75001 Paris, France.</p>
      <p>Publication director: Idrissi Yazami Taoufik.</p>
      <h3>Regulated activity</h3>
      <p>Preventisassur is an insurance broker (COA), registered with ORIAS under number 25 001 045 (<a href="https://www.orias.fr" target="_blank" rel="noopener">www.orias.fr</a>), supervised by the French Prudential Supervision and Resolution Authority (ACPR) — 4 place de Budapest, CS 92459, 75436 Paris Cedex 09.</p>
      <h3>Hosting</h3>
      <p>This site is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.</p>
      <h3>Insurance mediation</h3>
      <p>In case of an unresolved dispute with Preventisassur, you may refer the matter free of charge to the French insurance mediator: La Médiation de l'Assurance, TSA 50110, 75441 Paris Cedex 09 — <a href="https://www.mediation-assurance.org" target="_blank" rel="noopener">www.mediation-assurance.org</a>.</p>
    `,
    legal_privacy_title:'Privacy policy',
    legal_privacy_body:`
      <h3>Data controller</h3>
      <p>Preventisassur, 229 rue Saint-Honoré, 75001 Paris, is the controller of the data collected through this site.</p>
      <h3>Data collected</h3>
      <p>When requesting a quote, we collect: last name, first name, phone, e-mail, address, postal code, the household composition relevant to the request, and a free-text description of your needs.</p>
      <h3>Purpose and legal basis</h3>
      <p>This data is used solely to put you in touch with a Preventisassur advisor and prepare an insurance quote, based on the consent you give by ticking the dedicated box on the form.</p>
      <h3>Recipients</h3>
      <p>Your data is accessible to the Preventisassur advisors handling your file, and may be shared with partner insurers strictly for the purpose of preparing your quote.</p>
      <h3>Retention period</h3>
      <p>Your data is kept for as long as necessary to process your request, then archived in line with the legal obligations applicable to insurance brokerage.</p>
      <h3>Cookies</h3>
      <p>This site does not use any analytics or advertising cookies. A single strictly necessary technical cookie is set when signing in to the staff portal, to keep the work session active.</p>
      <h3>Your rights</h3>
      <p>Under the GDPR, you have the right to access, rectify, erase, restrict, and object to the processing of your data. You may exercise these rights by contacting Preventisassur, and lodge a complaint with the CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener">www.cnil.fr</a>) if you believe your rights are not respected.</p>
    `,
    legal_complaints_title:'Complaints',
    legal_complaints_body:`
      <h3>How to file a complaint</h3>
      <p>If you are not satisfied with how your file was handled, you may contact your Preventisassur advisor directly, or write to our registered office: 229 rue Saint-Honoré, 75001 Paris, France.</p>
      <h3>Processing times</h3>
      <p>An acknowledgement will be sent within 10 business days, and a substantive response within 2 months at most from receipt of your complaint, in line with ACPR recommendations.</p>
      <h3>If you remain unsatisfied</h3>
      <p>You may refer the matter free of charge to the French insurance mediator: La Médiation de l'Assurance, TSA 50110, 75441 Paris Cedex 09 — <a href="https://www.mediation-assurance.org" target="_blank" rel="noopener">www.mediation-assurance.org</a>.</p>
      <h3>Supervisory authority</h3>
      <p>Preventisassur is an insurance broker registered with ORIAS (no. 25 001 045) and supervised by the ACPR — 4 place de Budapest, CS 92459, 75436 Paris Cedex 09.</p>
    `,
    foot_rights:'© 2026 Preventisassur. All rights reserved.', foot_orias:'SIREN 938 236 825 · 229 rue Saint-Honoré, 75001 Paris, France · ORIAS no. 25 001 045, regulated by the ACPR',

    q_step1:'Cover for', q_step2:'Guarantee', q_step3:'Your details', q_step4:'Confirmation',
    q1_title:'Who is this request for?', q1_sub:'Choose the option closest to your situation; you can add household members on the next step.',
    c_seul_t:'Just me', c_seul_d:'Individual cover, built around you.',
    c_enfants_t:'Me and my children', c_enfants_d:'A family base, without a partner on the file.',
    c_epouse_t:'Me and my spouse', c_epouse_d:'Cover designed for two.',
    c_famille_t:'My whole family', c_famille_d:'Spouse and children combined in one file.',
    q2_title:'Which guarantee would you like to look into?', q2_sub:'You can always adjust your request with your advisor later.',
    g_iard_t:'IARD', g_iard_d:'Home, multi-risk.',
    g_dec_t:'Builder liability', g_dec_d:'Compulsory cover for building trades.',
    g_auto_t:'Motor', g_auto_d:'Car, two-wheeler, company fleet.',
    g_pers_t:'Health insurance', g_pers_d:'Health, income protection, retirement.',
    q3_title:'Your details', q3_sub:'This lets your advisor call you back and prepare your file.',
    f_nom:'Last name', f_prenom:'First name', f_tel:'Phone', f_email:'E-mail', f_adresse:'Home address', f_cp:'Postal code',
    f_message:'Describe what you need', f_message_ph:'E.g. I\'d like to cover my 90m² house and my work van…',
    members_title:'Members to include in the file',
    tag_conjoint:'Spouse', tag_enfant:'Child', add_child:'Add a child', remove:'Remove',
    q4_title:'Last step', q4_sub:'Check your request before sending.',
    consent:'I agree that my data will be used to process my introduction request, and acknowledged by broker Preventisassur at the e-mail address I have provided.',
    btn_next:'Continue', btn_back:'Back', btn_send:'Send my request',
    confirm_title:'Your file has been recorded', confirm_lead:'A Preventisassur advisor will get back to you within 48h. An acknowledgement has been sent to your e-mail.',
    confirm_ref:'File reference', confirm_home:'Back to home',
    err_required:'Please fill in this field.', err_consent:'Please accept the use of your data to continue.', err_choice:'Please make a choice to continue.',

    login_title:'Staff portal', login_lead:'Sign in to access client files and your workspace.',
    login_visual_title:'A workspace built for file follow-up', login_visual_lead:'Assign requests, track status, review each advisor\'s workload.',
    f_username:'Username', f_password:'Password', btn_login:'Sign in', login_error:'Incorrect username or password.',

    dash_leads:'Requests', dash_team:'Team', logout:'Sign out',
    dash_all_status:'All statuses', dash_all_service:'All guarantees',
    st_nouveau:'New', st_assigne:'Assigned', st_contacte:'Contacted', st_clos:'Closed',
    col_ref:'Reference', col_date:'Date', col_formule:'Cover for', col_service:'Guarantee', col_statut:'Status', col_conseiller:'Advisor', col_actions:'',
    stat_total:'Requests received', stat_new:'Unassigned', stat_progress:'In progress', stat_closed:'Closed files',
    empty_leads:'No requests yet.', empty_leads_agent:'No file has been assigned to you yet.',
    detail_title:'File detail', assign_to:'Assign to', unassigned:'Unassigned',
    detail_primary:'Main applicant', detail_members:'Household members', detail_message:'Stated need', detail_consent:'GDPR consent given on',
    update_status:'Update status', view:'View file',
    team_title:"Advisor workload", team_assigned:'Assigned', team_contacted:'Contacted', team_closed:'Closed',
    team_admins_title:'Management', team_you:'You', team_add_title:'Add a team member',
    team_add_success:'Account created successfully.', team_remove_success:'Team member removed.',
    team_remove_confirm:"Remove {name} from the team? Their in-progress files will become unassigned.",
    f_fullname:'Full name', f_role:'Role', role_admin:'Management', role_agent:'Advisor',
    f_title:'Job title (optional)', f_title_ph:'E.g. IARD advisor', btn_add:'Add', btn_remove:'Remove', btn_cancel:'Cancel',
    dash_chat:'Team chat', chat_placeholder:'Write a message to the team…', chat_send:'Send',
    chat_empty:'No messages yet. Be the first to write to the team!', chat_you:'You',
    change_password:'Password', pwd_modal_title:'Change my password',
    show_password:'Show', hide_password:'Hide',
    f_current_password:'Current password', f_new_password:'New password', f_confirm_password:'Confirm new password',
    pwd_mismatch:'The two passwords do not match.', pwd_success:'Password updated successfully.', btn_save:'Save',
    remember_me:'Stay signed in', login_pending:'Your sign-in request is awaiting approval from an administrator.',
    devices_pending_title:'Pending sign-in requests', devices_none_pending:'No pending requests.',
    devices_approved_title:'Approved devices', devices_approved_since:'since',
    device_approve:'Approve', device_reject:'Reject', device_revoke:'Revoke',
    device_approved:'Device approved.', device_rejected:'Device removed.',
        device_reject_confirm:"Remove this device? The person will need to request access again to sign in from it.",
    btn_reset_password:'Reset password', reset_password_confirm:"Generate a new temporary password for {name}? Their current password will stop working immediately.",
    temp_password_title:'New temporary password', temp_password_lead:'Share this password with {name} — it will never be shown again.',
    btn_copy:'Copy', copied:'Copied!', btn_close:'Close',
    notif_new_lead_one:'New request received: {ref}', notif_new_lead_many:'{n} new requests received',
    notif_assigned_one:'A file was assigned to you: {ref}', notif_assigned_many:'{n} files were assigned to you',
  }
};
function L(k){ return (TR[state.lang] && TR[state.lang][k]) || TR.fr[k] || k; }

const COVERAGE_TYPES = ['seul','enfants','epouse','famille'];
const SERVICES = ['iard','decennale','auto','personnes'];
const STATUSES = ['nouveau','assigne','contacte','clos'];

/* ============================= STATE ============================= */
let state = {
  lang:'fr',
  view:'home',
  user:null,
  leads:[],
  employees:[],
  devices:[],
  leadsLoaded:false,
  sessionChecked:false,
  quote:{ step:1, coverageType:null, service:null },
  memberSeq:0,
  dash:{ tab:'leads', filterStatus:'all', filterService:'all', showAddEmployee:false },
    chat:{ messages:[], loaded:false, pollHandle:null, draft:'', inputFocused:false },
  leadsPollHandle:null,
  activeLeadId:null,
  loginError:false,
  toast:null,
};

/* ============================= API ============================= */
async function api(path, options){
  const res = await fetch(API+path, Object.assign({credentials:'include', headers:{'Content-Type':'application/json'}}, options||{}));
  if(res.status === 401){ state.user = null; }
  let data = null;
  try{ data = await res.json(); }catch(e){}
  if(!res.ok){ throw (data && data.error) ? data.error : 'Erreur réseau'; }
  return data;
}

async function checkSession(){
  try{
    const data = await api('/auth/me');
    state.user = data.user;
    if(state.user){
      await Promise.all([loadLeads(), state.user.role==='admin' ? Promise.all([loadEmployees(), loadDevices()]) : Promise.resolve()]);
            if(state.view==='home' || state.view==='login'){ state.view = 'dashboard'; }
      startLeadsPolling();
    }
  }catch(e){ state.user = null; }
  state.sessionChecked = true;
  render();
}

async function loadLeads(){
  try{
    const data = await api('/leads');
    const newLeads = data.leads || [];
    if(state.leadsLoaded && state.user){
      const oldById = {};
      state.leads.forEach(l => { oldById[l.id] = l; });
      const isAdmin = state.user.role === 'admin';
      const freshRefs = [];
      const assignedToMeRefs = [];
      newLeads.forEach(l => {
        const old = oldById[l.id];
        if(!old){
          if(isAdmin) freshRefs.push(l.ref);
          else if(l.assignedTo === state.user.id) assignedToMeRefs.push(l.ref);
        } else if(!isAdmin && old.assignedTo !== state.user.id && l.assignedTo === state.user.id){
          assignedToMeRefs.push(l.ref);
        }
      });
      if(freshRefs.length===1) showToast(L('notif_new_lead_one').replace('{ref}', freshRefs[0]));
      else if(freshRefs.length>1) showToast(L('notif_new_lead_many').replace('{n}', freshRefs.length));
      if(assignedToMeRefs.length===1) showToast(L('notif_assigned_one').replace('{ref}', assignedToMeRefs[0]));
      else if(assignedToMeRefs.length>1) showToast(L('notif_assigned_many').replace('{n}', assignedToMeRefs.length));
    }
    state.leads = newLeads;
  }catch(e){ state.leads = []; }
  state.leadsLoaded = true;
  render();
}
async function loadEmployees(){
  try{
    const data = await api('/employees');
    state.employees = data.employees || [];
  }catch(e){ state.employees = []; }
  render();
}
async function loadDevices(){
  try{
    const data = await api('/devices');
    state.devices = data.devices || [];
  }catch(e){ state.devices = []; }
  render();
}
async function approveDevice(id){
  try{
    await api(`/devices/${id}/approve`, { method:'PATCH' });
    await loadDevices();
    showToast(L('device_approved'));
  }catch(err){ showToast(typeof err==='string' ? err : 'Erreur.'); }
}
async function rejectDevice(id){
  if(!window.confirm(L('device_reject_confirm'))) return;
  try{
    await api(`/devices/${id}`, { method:'DELETE' });
    await loadDevices();
    showToast(L('device_rejected'));
  }catch(err){ showToast(typeof err==='string' ? err : 'Erreur.'); }
}

function showToast(msg){
  state.toast = msg;
  render();
  setTimeout(()=>{ state.toast=null; render(); }, 3200);
}

/* ============================= ICONS ============================= */
const ICO = {
  person:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>',
  family:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 21c0-3.5 2.7-6.3 6-6.3s6 2.8 6 6.3M14.5 21c0-2.8 2-5 4.8-5s4.7 2.2 4.7 5"/></svg>',
  couple:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="3.2"/><circle cx="16" cy="8" r="3.2"/><path d="M2 21c0-3.3 2.7-5.8 6-5.8s6 2.5 6 5.8M10 21c0-3.3 2.7-5.8 6-5.8s6 2.5 6 5.8"/></svg>',
  kids:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="7" r="3"/><circle cx="17" cy="10" r="2.3"/><path d="M3 21c0-3.3 2.7-6 6-6s6 2.7 6 6M14.7 21c0-2.6 1.9-4.6 4.3-4.6s4.3 2 4.3 4.6"/></svg>',
  shieldcheck:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg>',
  home:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></svg>',
  helmet:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15a8 8 0 0116 0"/><path d="M2 15h20"/><path d="M9 15V9M15 15V9"/></svg>',
  car:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 13l1.6-4.8A2 2 0 016.5 7h11a2 2 0 011.9 1.2L21 13"/><path d="M3 13h18v4a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H6v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-4z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>',
  heart:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20s-7-4.5-9.5-9A5 5 0 0112 5a5 5 0 019.5 6c-2.5 4.5-9.5 9-9.5 9z"/><path d="M8.5 11.5h2l1-2 2 4 1-2h2"/></svg>',
};
function seal(size){
  return `<svg class="seal" width="${size||150}" height="${size||150}" viewBox="0 0 200 200">
    <path id="sc${size}" d="M100,20 a80,80 0 1,1 -0.1,0" fill="none"/>
    <circle cx="100" cy="100" r="82" fill="none" stroke="#8C3B2E" stroke-width="2"/>
    <circle cx="100" cy="100" r="70" fill="none" stroke="#8C3B2E" stroke-width="1" stroke-dasharray="2 4"/>
    <text font-family="IBM Plex Mono, monospace" font-size="10.5" fill="#8C3B2E" letter-spacing="3">
      <textPath href="#sc${size}" startOffset="1%">PREVENTISASSUR • COURTIER D'ASSURANCE INDÉPENDANT • </textPath>
    </text>
    <g transform="translate(100,100)">
      <path d="M0,-30 L22,-20 L22,5 C22,25 8,35 0,40 C-8,35 -22,25 -22,5 L-22,-20 Z" fill="none" stroke="#8C3B2E" stroke-width="3"/>
      <path d="M-9,0 L-2,9 L12,-10" fill="none" stroke="#8C3B2E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </svg>`;
}

/* ============================= HELPERS ============================= */
function fmtDate(iso){
  const d = new Date(iso);
  return d.toLocaleDateString(state.lang==='fr'?'fr-FR':'en-GB', {day:'2-digit',month:'short',year:'numeric'});
}
function coverageLabel(type){
  return {seul:L('c_seul_t'),enfants:L('c_enfants_t'),epouse:L('c_epouse_t'),famille:L('c_famille_t')}[type] || type;
}
function serviceLabel(s){
  return {iard:L('g_iard_t'), decennale:L('g_dec_t'), auto:L('g_auto_t'), personnes:L('g_pers_t')}[s] || s;
}
function employeeName(id){ const e = state.employees.find(e=>e.id===id); return e ? e.name : L('unassigned'); }
function escapeHtml(s){
  return String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

/* ============================= NAV ACTIONS ============================= */
function setLang(l){ state.lang = l; render(); }
function goView(v){ window.scrollTo(0,0); state.view = v; render(); }
function goHome(){ goView('home'); }
function goLegal(page){ state.legalPage = page; goView('legal'); }
function goQuote(){ state.quote = {step:1, coverageType:null, service:null}; goView('quote'); }
function goServiceInfo(key){ state.serviceInfoKey = key; goView('serviceInfo'); }
function goQuoteForService(key){ state.quote = {step:1, coverageType:null, service:key}; goView('quote'); }
function goStaffLogin(){ state.loginError=false; goView('login'); }
async function logout(){
  try{ await api('/auth/logout', {method:'POST'}); }catch(e){}
    stopChatPolling();
  stopLeadsPolling();
  state.user=null; state.activeLeadId=null; state.leads=[]; state.employees=[]; state.leadsLoaded=false;
  goView('home');
}

/* ============================= QUOTE FLOW ============================= */
function selectCoverage(type){ state.quote.coverageType = type; render(); }
function toStep(n){ state.quote.step = n; window.scrollTo(0,0); render(); }
function quoteNext1(){
  if(!state.quote.coverageType){ showToast(L('err_choice')); return; }
  toStep(2);
}
function selectService(s){ state.quote.service = s; render(); }
function quoteNext2(){
  if(!state.quote.service){ showToast(L('err_choice')); return; }
  toStep(3);
}

function memberRowHtml(tagKey, id, removable){
  return `<div class="member-row" data-mid="${id}">
    ${removable?`<button class="remove-member" onclick="removeMember(${id})" aria-label="${L('remove')}">&times;</button>`:''}
    <span class="member-tag">${L(tagKey)}</span>
    <div class="field-row">
      <div class="field"><label>${L('f_nom')}</label><input type="text" id="m_nom_${id}"></div>
      <div class="field"><label>${L('f_prenom')}</label><input type="text" id="m_prenom_${id}"></div>
    </div>
  </div>`;
}
function addMember(kind){
  state.memberSeq += 1;
  const id = state.memberSeq;
  const container = document.getElementById('membersContainer');
  const tagKey = kind==='conjoint' ? 'tag_conjoint' : 'tag_enfant';
  container.insertAdjacentHTML('beforeend', memberRowHtml(tagKey, id, true));
}
function removeMember(id){
  const row = document.querySelector(`.member-row[data-mid="${id}"]`);
  if(row) row.remove();
}

function quoteStep3Body(){
  let membersInit = '';
  const type = state.quote.coverageType;
  if(type==='epouse' || type==='famille'){
    state.memberSeq += 1;
    membersInit += memberRowHtml('tag_conjoint', state.memberSeq, false);
  }
  if(type==='enfants' || type==='famille'){
    state.memberSeq += 1;
    membersInit += memberRowHtml('tag_enfant', state.memberSeq, true);
  }
  const showMembers = type!=='seul';
  return `
    <div class="field-row">
      <div class="field"><label>${L('f_nom')} *</label><input type="text" id="p_nom" required></div>
      <div class="field"><label>${L('f_prenom')} *</label><input type="text" id="p_prenom" required></div>
    </div>
    <div class="field-row">
      <div class="field"><label>${L('f_tel')} *</label><input type="tel" id="p_tel" required></div>
      <div class="field"><label>${L('f_email')} *</label><input type="email" id="p_email" required></div>
    </div>
    <div class="field-row">
      <div class="field"><label>${L('f_adresse')} *</label><input type="text" id="p_adresse" required></div>
      <div class="field"><label>${L('f_cp')} *</label><input type="text" id="p_cp" required></div>
    </div>
    <div class="field">
      <label>${L('f_message')}</label>
      <textarea id="p_message" rows="3" placeholder="${L('f_message_ph')}"></textarea>
    </div>
    ${showMembers ? `
      <div class="field" style="margin-top:8px;">
        <label style="margin-bottom:12px;">${L('members_title')}</label>
        <div id="membersContainer">${membersInit}</div>
        ${(type==='enfants'||type==='famille') ? `<button type="button" class="add-member-btn" onclick="addMember('enfant')">+ ${L('add_child')}</button>` : ''}
      </div>
    ` : ''}
    <div class="consent-box">
      <input type="checkbox" id="consentCheck" ${state.quote.consent ? 'checked' : ''}>
      <p>${L('consent')}</p>
    </div>
  `;
}

function collectPrimary(){
  const val = id => (document.getElementById(id)||{}).value || '';
  return {
    nom: val('p_nom'), prenom: val('p_prenom'), tel: val('p_tel'), email: val('p_email'),
    adresse: val('p_adresse'), codePostal: val('p_cp'), message: val('p_message')
  };
}
function collectMembers(){
  const rows = document.querySelectorAll('#membersContainer .member-row');
  const members = [];
  rows.forEach(row=>{
    const id = row.getAttribute('data-mid');
    const nom = (document.getElementById('m_nom_'+id)||{}).value || '';
    const prenom = (document.getElementById('m_prenom_'+id)||{}).value || '';
    const tag = row.querySelector('.member-tag').textContent;
    if(nom || prenom) members.push({nom, prenom, lien:tag});
  });
  return members;
}
function quoteNext3(){
  const p = collectPrimary();
  const required = ['nom','prenom','tel','email','adresse','codePostal'];
  for(const f of required){ if(!p[f]){ showToast(L('err_required')); return; } }
  const consentBox = document.getElementById('consentCheck');
  if(!consentBox.checked){ showToast(L('err_consent')); return; }
  state.quote.primary = p;
  state.quote.members = collectMembers();
  state.quote.consent = true;
  toStep(4);
}
async function submitQuote(){
  const btn = document.querySelector('.quote-nav .btn-primary');
  if(btn){ btn.disabled = true; }
  try{
    const data = await api('/leads', { method:'POST', body: JSON.stringify({
      coverageType: state.quote.coverageType,
      service: state.quote.service,
      primary: state.quote.primary,
      members: state.quote.members || [],
      consent: true,
    })});
    state.quote.lastRef = data.lead.ref;
    toStep(5);
  }catch(err){
    showToast(typeof err==='string' ? err : 'Une erreur est survenue, merci de réessayer.');
    if(btn){ btn.disabled = false; }
  }
}


/* ============================= LOGIN ============================= */
async function attemptLogin(e){
  e.preventDefault();
  const u = document.getElementById('loginUser').value.trim();
  const p = document.getElementById('loginPass').value;
  const rememberMe = document.getElementById('rememberMe') ? document.getElementById('rememberMe').checked : false;
  state.loginPending = false;
  state.loginError = false;
  try{
    const res = await fetch(API+'/auth/login', {
      method:'POST', credentials:'include', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ username:u, password:p, rememberMe }),
    });
    let data = null;
    try{ data = await res.json(); }catch(e){}
    if(!res.ok){
      if(data && data.pending){
        state.loginPending = true;
        state.loginPendingMessage = data.error;
      } else {
        state.loginError = true;
        state.loginErrorMessage = (data && data.error) || L('login_error');
      }
      render();
      return;
    }
    state.user = data.user;
    await loadLeads();
    if(state.user.role==='admin'){ await Promise.all([loadEmployees(), loadDevices()]); }
        goView('dashboard');
    startLeadsPolling();
  } catch(err){
    state.loginError = true;
    state.loginErrorMessage = L('login_error');
    render();
  }
}

/* ============================= DASHBOARD ACTIONS ============================= */
function setDashTab(t){
  state.dash.tab = t;
  if(t==='chat'){ startChatPolling(); } else { stopChatPolling(); }
  render();
}

async function loadMessages(){
  try{
    const data = await api('/messages');
    state.chat.messages = data.messages || [];
  }catch(e){ /* silent — polling errors shouldn't spam toasts */ }
  state.chat.loaded = true;
  if(state.dash.tab==='chat') render();
}
function startLeadsPolling(){
  if(state.leadsPollHandle) return;
  state.leadsPollHandle = setInterval(loadLeads, 10000);
}
function stopLeadsPolling(){
  if(state.leadsPollHandle){ clearInterval(state.leadsPollHandle); state.leadsPollHandle = null; }
}

function startChatPolling(){
  if(state.chat.pollHandle) return;
  loadMessages();
  state.chat.pollHandle = setInterval(loadMessages, 4000);
}
function stopChatPolling(){
  if(state.chat.pollHandle){ clearInterval(state.chat.pollHandle); state.chat.pollHandle = null; }
}
function handleChatKeydown(e){
  if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); sendChatMessage(); }
}
async function sendChatMessage(){
  const input = document.getElementById('chatInput');
  const content = (input ? input.value : '').trim();
  if(!content) return;
  if(input){ input.value=''; }
  state.chat.draft = '';
  try{
    await api('/messages', { method:'POST', body: JSON.stringify({ content }) });
    await loadMessages();
  }catch(err){
    showToast(typeof err==='string' ? err : "Erreur lors de l'envoi du message.");
  }
}

function togglePasswordVisibility(id, btn){
  const input = document.getElementById(id);
  if(!input) return;
  if(input.type === 'password'){ input.type = 'text'; btn.textContent = L('hide_password'); }
  else { input.type = 'password'; btn.textContent = L('show_password'); }
}
async function resetEmployeePassword(id, name){
  if(!window.confirm(L('reset_password_confirm').replace('{name}', name))) return;
  try{
    const data = await api(`/employees/${id}/reset-password`, { method:'PATCH' });
    state.tempPasswordInfo = { name, tempPassword: data.tempPassword };
    render();
  }catch(err){
    showToast(typeof err==='string' ? err : 'Erreur lors de la réinitialisation.');
  }
}

function toggleAddEmployee(show){
function toggleAddEmployee(show){ state.dash.showAddEmployee = show; render(); }

async function submitNewEmployee(){
  const val = id => (document.getElementById(id)||{}).value || '';
  const payload = {
    name: val('new_emp_name').trim(),
    username: val('new_emp_username').trim(),
    password: val('new_emp_password'),
    role: val('new_emp_role') || 'agent',
    title: val('new_emp_title').trim(),
  };
  if(!payload.name || !payload.username || !payload.password){
    showToast(L('err_required'));
    return;
  }
  try{
    await api('/employees', { method:'POST', body: JSON.stringify(payload) });
    state.dash.showAddEmployee = false;
    await loadEmployees();
    showToast(L('team_add_success'));
  }catch(err){
    showToast(typeof err==='string' ? err : 'Erreur lors de la création du compte.');
  }
}

async function deleteEmployee(id, name){
  if(!window.confirm(L('team_remove_confirm').replace('{name}', name))) return;
  try{
    await api(`/employees/${id}`, { method:'DELETE' });
    await Promise.all([loadEmployees(), loadLeads()]);
    showToast(L('team_remove_success'));
  }catch(err){
    showToast(typeof err==='string' ? err : 'Erreur lors de la suppression.');
  }
}
function setFilter(kind, val){ state.dash.filterStatus = kind==='status'?val:state.dash.filterStatus; state.dash.filterService = kind==='service'?val:state.dash.filterService; render(); }
function openLead(id){ state.activeLeadId = Number(id); render(); }
function closeLead(){ state.activeLeadId = null; render(); }
async function assignLead(id, empId){
  id = Number(id);
  const assignedTo = empId ? Number(empId) : null;
  try{
    const data = await api(`/leads/${id}/assign`, { method:'PATCH', body: JSON.stringify({ assignedTo }) });
    const i = state.leads.findIndex(l=>l.id===id);
    if(i>-1) state.leads[i] = data.lead;
  }catch(err){ showToast(typeof err==='string' ? err : 'Erreur lors de l\'attribution.'); }
  render();
}
async function updateStatus(id, status){
  id = Number(id);
  try{
    const data = await api(`/leads/${id}/status`, { method:'PATCH', body: JSON.stringify({ status }) });
    const i = state.leads.findIndex(l=>l.id===id);
    if(i>-1) state.leads[i] = data.lead;
  }catch(err){ showToast(typeof err==='string' ? err : 'Erreur lors de la mise à jour.'); }
  render();
}

function visibleLeads(){
  let leads = state.leads;
  if(state.user.role==='agent'){ leads = leads.filter(l=>l.assignedTo===state.user.id); }
  if(state.dash.filterStatus!=='all'){ leads = leads.filter(l=>l.status===state.dash.filterStatus); }
  if(state.dash.filterService!=='all'){ leads = leads.filter(l=>l.service===state.dash.filterService); }
  return leads;
}

/* ============================= RENDER: SHARED CHROME ============================= */
function headerHtml(){
  return `
  <header class="site">
    <div class="header-row">
      <div class="logo" onclick="goHome()">
        <span>Preventisassur</span>
      </div>
      <nav class="main">
        <a onclick="goHome()">${L('nav_home')}</a>
        <a href="#services" onclick="goHome()">${L('nav_services')}</a>
        <a href="#trust" onclick="goHome()">${L('nav_trust')}</a>
        <a onclick="goStaffLogin()">${L('nav_staff')}</a>
      </nav>
      <div class="header-actions">
        <div class="lang-toggle">
          <button class="${state.lang==='fr'?'active':''}" onclick="setLang('fr')">FR</button>
          <button class="${state.lang==='en'?'active':''}" onclick="setLang('en')">EN</button>
        </div>
        <button class="btn btn-primary btn-sm" onclick="goQuote()">${L('nav_client')}</button>
      </div>
    </div>
  </header>`;
}
function footerHtml(){
  return `
  <footer class="site">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <div class="logo" style="color:#fff;margin-bottom:14px;"><span>Preventisassur</span></div>
          <p style="color:#9FB0C2;max-width:340px;font-size:13.5px;">${L('foot_about')}</p>
        </div>
        <div>
          <h4>${L('foot_nav')}</h4>
          <a onclick="goQuote()">${L('nav_client')}</a>
          <a onclick="goHome()">${L('nav_services')}</a>
          <a onclick="goHome()">${L('nav_trust')}</a>
        </div>
        <div>
          <h4>${L('foot_staff')}</h4>
          <a onclick="goStaffLogin()">${L('foot_staff_link')}</a>
        </div>
        <div>
          <h4>${L('foot_legal')}</h4>
          <a onclick="goLegal('mentions')">${L('foot_legal1')}</a>
          <a onclick="goLegal('privacy')">${L('foot_legal2')}</a>
          <a onclick="goLegal('complaints')">${L('foot_legal3')}</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>${L('foot_rights')}</span>
        <span>${L('foot_orias')}</span>
      </div>
    </div>
  </footer>`;
}

/* ============================= RENDER: HOME ============================= */
function viewHome(){
  return `
  ${headerHtml()}
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <div class="eyebrow" style="color:#E8A487;">${L('hero_eyebrow')}</div>
        <h1>${L('hero_title')}</h1>
        <p class="lead">${L('hero_lead')}</p>
        <div class="hero-ctas">
          <button class="btn btn-primary" onclick="goQuote()">${L('hero_cta1')}</button>
          <a href="#services" onclick="goHome()"><button class="btn btn-outline-light">${L('hero_cta2')}</button></a>
        </div>
        <div class="hero-stats">
          <div><div class="num">${L('stat1n')}</div><div class="lbl">${L('stat1l')}</div></div>
          <div><div class="num">${L('stat2n')}</div><div class="lbl">${L('stat2l')}</div></div>
          <div><div class="num">${L('stat3n')}</div><div class="lbl">${L('stat3l')}</div></div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-photo"><img src="${IMG.hero}" alt="" onerror="this.style.display='none'"></div>
        ${seal(150)}
      </div>
    </div>
  </section>

  <section id="services">
    <div class="wrap">
      <div class="section-head">
        <div class="eyebrow">${L('services_eyebrow')}</div>
        <h2>${L('services_title')}</h2>
        <p>${L('services_lead')}</p>
      </div>
      <div class="services-grid">
        <div class="service-card">
          <div class="service-photo"><img src="${IMG.iard}" alt="" onerror="this.parentElement.style.background='linear-gradient(135deg,#33526E,#10233A)';this.remove()"></div>
          <div class="service-body">
            <span class="service-tag">${L('iard_tag')}</span>
            <h3>${L('iard_title')}</h3>
            <p style="font-size:14px;">${L('iard_desc')}</p>
            <button class="btn btn-outline btn-sm" style="margin-top:auto;width:fit-content;" onclick="goServiceInfo('iard')">${L('learn_more')}</button>
          </div>
        </div>
        <div class="service-card">
          <div class="service-photo"><img src="${IMG.decennale}" alt="" onerror="this.parentElement.style.background='linear-gradient(135deg,#33526E,#10233A)';this.remove()"></div>
          <div class="service-body">
            <span class="service-tag">${L('decennale_tag')}</span>
            <h3>${L('decennale_title')}</h3>
            <p style="font-size:14px;">${L('decennale_desc')}</p>
            <ul><li>${L('decennale_l1')}</li><li>${L('decennale_l2')}</li><li>${L('decennale_l3')}</li></ul>
            <button class="btn btn-outline btn-sm" style="margin-top:auto;width:fit-content;" onclick="goServiceInfo('decennale')">${L('learn_more')}</button>
          </div>
        </div>
        <div class="service-card">
          <div class="service-photo"><img src="${IMG.auto}" alt="" onerror="this.parentElement.style.background='linear-gradient(135deg,#33526E,#10233A)';this.remove()"></div>
          <div class="service-body">
            <span class="service-tag">${L('auto_tag')}</span>
            <h3>${L('auto_title')}</h3>
            <p style="font-size:14px;">${L('auto_desc')}</p>
            <ul><li>${L('auto_l1')}</li><li>${L('auto_l2')}</li><li>${L('auto_l3')}</li></ul>
            <button class="btn btn-outline btn-sm" style="margin-top:auto;width:fit-content;" onclick="goServiceInfo('auto')">${L('learn_more')}</button>
          </div>
        </div>
        <div class="service-card">
          <div class="service-photo"><img src="${IMG.personnes}" alt="" onerror="this.parentElement.style.background='linear-gradient(135deg,#33526E,#10233A)';this.remove()"></div>
          <div class="service-body">
            <span class="service-tag">${L('personnes_tag')}</span>
            <h3>${L('personnes_title')}</h3>
            <p style="font-size:14px;">${L('personnes_desc')}</p>
            <ul><li>${L('personnes_l1')}</li><li>${L('personnes_l2')}</li><li>${L('personnes_l3')}</li></ul>
            <button class="btn btn-outline btn-sm" style="margin-top:auto;width:fit-content;" onclick="goServiceInfo('personnes')">${L('learn_more')}</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="trust" id="trust">
    <div class="wrap trust-grid">
      <div>
        <div class="trust-photo"><img src="${IMG.trust}" alt="" onerror="this.parentElement.style.background='linear-gradient(135deg,#33526E,#10233A)';this.remove()"></div>
      </div>
      <div>
        <div class="eyebrow">${L('trust_eyebrow')}</div>
        <h2>${L('trust_title')}</h2>
        <p>${L('trust_lead')}</p>
        <div class="trust-points">
          <div class="trust-point"><b>${L('tp1t')}</b><span>${L('tp1d')}</span></div>
          <div class="trust-point"><b>${L('tp2t')}</b><span>${L('tp2d')}</span></div>
          <div class="trust-point"><b>${L('tp3t')}</b><span>${L('tp3d')}</span></div>
          <div class="trust-point"><b>${L('tp4t')}</b><span>${L('tp4d')}</span></div>
        </div>
      </div>
    </div>
  </section>

  <div class="cta-band">
    <div class="wrap cta-band-inner">
      <div>
        <h2>${L('cta_title')}</h2>
        <p>${L('cta_lead')}</p>
      </div>
      <button class="btn btn-primary" onclick="goQuote()">${L('cta_btn')}</button>
    </div>
  </div>

  ${footerHtml()}
  `;
}

/* ============================= RENDER: SERVICE INFO ============================= */
const SERVICE_META = {
  iard:   { tag:'iard_tag',   title:'iard_title',   img:'iard',   p1:'iard_info_p1',   p2:'iard_info_p2',   l:['iard_l1','iard_l2','iard_l3'] },
  decennale: { tag:'decennale_tag', title:'decennale_title', img:'decennale', p1:'decennale_info_p1', p2:'decennale_info_p2', l:['decennale_l1','decennale_l2','decennale_l3'] },
  auto:   { tag:'auto_tag',   title:'auto_title',   img:'auto',   p1:'auto_info_p1',   p2:'auto_info_p2',   l:['auto_l1','auto_l2','auto_l3'] },
  personnes: { tag:'personnes_tag', title:'personnes_title', img:'personnes', p1:'personnes_info_p1', p2:'personnes_info_p2', l:['personnes_l1','personnes_l2','personnes_l3'] },
};
function viewServiceInfo(){
  const key = state.serviceInfoKey;
  const meta = SERVICE_META[key] || SERVICE_META.iard;
  return `
  ${headerHtml()}
  <section style="padding:56px 0 90px;">
    <div class="wrap" style="max-width:820px;">
      <button class="btn-ghost" style="margin-bottom:24px;" onclick="goHome()">← ${L('nav_home')}</button>
      <div class="service-photo" style="aspect-ratio:21/9;border-radius:8px;margin-bottom:32px;">
        <img src="${IMG[meta.img]}" alt="" onerror="this.parentElement.style.background='linear-gradient(135deg,#33526E,#10233A)';this.remove()">
      </div>
      <span class="service-tag">${L(meta.tag)}</span>
      <h1 style="font-size:clamp(28px,4vw,40px);margin:14px 0 22px;">${L(meta.title)}</h1>
      <p style="font-size:16px;color:var(--text);line-height:1.7;">${L(meta.p1)}</p>
      <p style="font-size:16px;color:var(--text);line-height:1.7;">${L(meta.p2)}</p>
      <ul style="margin:24px 0 34px;padding:0;list-style:none;">
        ${meta.l.map(k=>`<li style="font-size:14.5px;color:var(--text-dim);padding:7px 0 7px 22px;position:relative;">
          <span style="position:absolute;left:0;top:14px;width:9px;height:9px;border:1.5px solid var(--brick);border-radius:50%;"></span>
          ${L(k)}</li>`).join('')}
      </ul>
      <button class="btn btn-primary" onclick="goQuoteForService('${key}')">${L('nav_client')}</button>
    </div>
  </section>
  ${footerHtml()}
  `;
}

/* ============================= RENDER: LEGAL PAGES ============================= */
const LEGAL_META = {
  mentions:  { title:'legal_mentions_title',  body:'legal_mentions_body' },
  privacy:   { title:'legal_privacy_title',   body:'legal_privacy_body' },
  complaints:{ title:'legal_complaints_title', body:'legal_complaints_body' },
};
function viewLegal(){
  const meta = LEGAL_META[state.legalPage] || LEGAL_META.mentions;
  return `
  ${headerHtml()}
  <section style="padding:56px 0 90px;">
    <div class="wrap" style="max-width:760px;">
      <button class="btn-ghost" style="margin-bottom:24px;" onclick="goHome()">← ${L('legal_back')}</button>
      <h1 style="font-size:clamp(26px,3.4vw,34px);margin-bottom:26px;">${L(meta.title)}</h1>
      <div class="legal-body">${L(meta.body)}</div>
    </div>
  </section>
  ${footerHtml()}
  `;
}

/* ============================= RENDER: QUOTE FLOW ============================= */
function stepperHtml(current){
  const labels = [L('q_step1'),L('q_step2'),L('q_step3'),L('q_step4')];
  let html = '<div class="stepper">';
  labels.forEach((lbl,i)=>{
    const n = i+1;
    const cls = n<current ? 'done' : (n===current ? 'active' : '');
    html += `<div class="step-dot ${cls}">${n<current?'&#10003;':n}</div>`;
    if(i<labels.length-1) html += `<div class="step-line ${n<current?'done':''}"></div>`;
  });
  html += '</div>';
  return html;
}

function viewQuote(){
  const step = state.quote.step;
  let body = '';

  if(step===1){
    const opts = [
      ['seul','person','c_seul_t','c_seul_d'],
      ['enfants','kids','c_enfants_t','c_enfants_d'],
      ['epouse','couple','c_epouse_t','c_epouse_d'],
      ['famille','family','c_famille_t','c_famille_d'],
    ];
    body = `
      <h2>${L('q1_title')}</h2><p class="sub">${L('q1_sub')}</p>
      <div class="choice-grid">
        ${opts.map(([key,icon,t,d])=>`
          <div class="choice-card ${state.quote.coverageType===key?'selected':''}" onclick="selectCoverage('${key}')">
            <div class="icon">${ICO[icon]}</div>
            <b>${L(t)}</b><span>${L(d)}</span>
          </div>`).join('')}
      </div>
      <div class="quote-nav"><span></span><button class="btn btn-primary" onclick="quoteNext1()">${L('btn_next')}</button></div>
    `;
  } else if(step===2){
    body = `
      <h2>${L('q2_title')}</h2><p class="sub">${L('q2_sub')}</p>
      <div class="choice-grid">
        <div class="choice-card ${state.quote.service==='iard'?'selected':''}" onclick="selectService('iard')">
          <div class="icon">${ICO.home}</div><b>${L('g_iard_t')}</b><span>${L('g_iard_d')}</span>
        </div>
        <div class="choice-card ${state.quote.service==='decennale'?'selected':''}" onclick="selectService('decennale')">
          <div class="icon">${ICO.helmet}</div><b>${L('g_dec_t')}</b><span>${L('g_dec_d')}</span>
        </div>
        <div class="choice-card ${state.quote.service==='auto'?'selected':''}" onclick="selectService('auto')">
          <div class="icon">${ICO.car}</div><b>${L('g_auto_t')}</b><span>${L('g_auto_d')}</span>
        </div>
        <div class="choice-card ${state.quote.service==='personnes'?'selected':''}" onclick="selectService('personnes')">
          <div class="icon">${ICO.heart}</div><b>${L('g_pers_t')}</b><span>${L('g_pers_d')}</span>
        </div>
      </div>
      <div class="quote-nav"><button class="btn btn-outline" onclick="toStep(1)">${L('btn_back')}</button><button class="btn btn-primary" onclick="quoteNext2()">${L('btn_next')}</button></div>
    `;
  } else if(step===3){
    body = `
      <h2>${L('q3_title')}</h2><p class="sub">${L('q3_sub')}</p>
      ${quoteStep3Body()}
      <div class="quote-nav"><button class="btn btn-outline" onclick="toStep(2)">${L('btn_back')}</button><button class="btn btn-primary" onclick="quoteNext3()">${L('btn_next')}</button></div>
    `;
  } else if(step===4){
    const p = state.quote.primary || {};
    const members = state.quote.members || [];
    body = `
      <h2>${L('q4_title')}</h2><p class="sub">${L('q4_sub')}</p>
      <div class="detail-grid">
        <div class="detail-item"><div class="l">${L('q_step1')}</div><div class="v">${coverageLabel(state.quote.coverageType)}</div></div>
        <div class="detail-item"><div class="l">${L('q_step2')}</div><div class="v">${serviceLabel(state.quote.service)}</div></div>
        <div class="detail-item"><div class="l">${L('f_nom')} / ${L('f_prenom')}</div><div class="v">${p.nom} ${p.prenom}</div></div>
        <div class="detail-item"><div class="l">${L('f_tel')}</div><div class="v">${p.tel}</div></div>
        <div class="detail-item"><div class="l">${L('f_email')}</div><div class="v">${p.email}</div></div>
        <div class="detail-item"><div class="l">${L('f_adresse')}</div><div class="v">${p.adresse}, ${p.codePostal}</div></div>
      </div>
      ${members.length? `<div class="field"><label>${L('detail_members')}</label>${members.map(m=>`<div class="member-chip">${m.lien} — ${m.nom} ${m.prenom}</div>`).join('')}</div>` : ''}
      <div class="quote-nav"><button class="btn btn-outline" onclick="toStep(3)">${L('btn_back')}</button><button class="btn btn-primary" onclick="submitQuote()">${L('btn_send')}</button></div>
    `;
  } else if(step===5){
    return `
      ${headerHtml()}
      <div class="quote-shell">
        <div class="wrap quote-container">
          <div class="quote-panel confirm-wrap">
            <div class="stamp-anim">${seal(150)}</div>
            <h2>${L('confirm_title')}</h2>
            <p>${L('confirm_lead')}</p>
            <div class="hint mono" style="text-transform:uppercase;">${L('confirm_ref')}</div>
            <div class="ref-box">${state.quote.lastRef}</div>
            <div><button class="btn btn-outline" onclick="goHome()">${L('confirm_home')}</button></div>
          </div>
        </div>
      </div>
      ${footerHtml()}
    `;
  }

  return `
    ${headerHtml()}
    <div class="quote-shell">
      <div class="wrap quote-container">
        ${stepperHtml(step)}
        <div class="quote-panel">${body}</div>
      </div>
    </div>
    ${footerHtml()}
  `;
}

/* ============================= RENDER: LOGIN ============================= */
function viewLogin(){
  return `
  ${headerHtml()}
  <div class="login-shell">
    <div class="login-visual">
      <img src="${IMG.login}" alt="" onerror="this.remove()">
      <div class="login-visual-content">
        <h3 style="color:#fff;font-size:26px;">${L('login_visual_title')}</h3>
        <p style="color:#B9C4D1;">${L('login_visual_lead')}</p>
      </div>
    </div>
    <div class="login-form-side">
      <div class="login-box">
        <div class="eyebrow">${L('nav_staff')}</div>
        <h2>${L('login_title')}</h2>
        <p style="margin-bottom:22px;">${L('login_lead')}</p>
        ${state.loginPending ? `<div class="hint" style="color:var(--gold);margin-bottom:14px;background:var(--brick-tint);padding:12px 14px;border-radius:6px;">${state.loginPendingMessage || L('login_pending')}</div>` : ''}
        ${state.loginError ? `<div class="hint" style="color:#8C3B2E;margin-bottom:14px;">${state.loginErrorMessage || L('login_error')}</div>` : ''}
        <form onsubmit="attemptLogin(event)">
          <div class="field"><label>${L('f_username')}</label><input type="text" id="loginUser" required></div>
          <div class="field"><label>${L('f_password')}</label>
            <div class="password-field">
              <input type="password" id="loginPass" required>
              <button type="button" class="btn-ghost password-toggle" onclick="togglePasswordVisibility('loginPass', this)">${L('show_password')}</button>
            </div>
          </div>
          <div class="remember-row">
            <input type="checkbox" id="rememberMe">
            <label for="rememberMe" style="margin:0;text-transform:none;font-family:inherit;letter-spacing:normal;font-weight:400;">${L('remember_me')}</label>
          </div>
          <button class="btn btn-primary btn-block" type="submit">${L('btn_login')}</button>
        </form>
      </div>
    </div>
  </div>
  ${footerHtml()}
  `;
}

/* ============================= RENDER: DASHBOARD ============================= */
function statusBadge(s){ return `<span class="badge badge-${s}">${L('st_'+s)}</span>`; }

function passwordModal(){
  return `
  <div class="modal-bg" onclick="if(event.target===this) closePasswordModal()">
    <div class="modal" style="max-width:420px;">
      <div class="modal-head">
        <h3 style="margin:0;">${L('pwd_modal_title')}</h3>
        <button class="modal-close" onclick="closePasswordModal()">&times;</button>
      </div>
      <div class="field"><label>${L('f_current_password')}</label><input type="password" id="pwd_current" autocomplete="current-password"></div>
      <div class="field"><label>${L('f_new_password')}</label><input type="password" id="pwd_new" autocomplete="new-password"></div>
      <div class="field"><label>${L('f_confirm_password')}</label><input type="password" id="pwd_confirm" autocomplete="new-password"></div>
      <button class="btn btn-primary btn-block" onclick="submitPasswordChange()">${L('btn_save')}</button>
    </div>
  </div>`;
}
function openPasswordModal(){ state.showPasswordModal = true; render(); }
function closePasswordModal(){ state.showPasswordModal = false; render(); }
async function submitPasswordChange(){
  const currentPassword = (document.getElementById('pwd_current')||{}).value || '';
  const newPassword = (document.getElementById('pwd_new')||{}).value || '';
  const confirmPassword = (document.getElementById('pwd_confirm')||{}).value || '';
  if(!currentPassword || !newPassword || !confirmPassword){ showToast(L('err_required')); return; }
  if(newPassword !== confirmPassword){ showToast(L('pwd_mismatch')); return; }
  try{
    await api('/auth/password', { method:'PATCH', body: JSON.stringify({ currentPassword, newPassword }) });
    state.showPasswordModal = false;
    showToast(L('pwd_success'));
  }catch(err){
    showToast(typeof err==='string' ? err : 'Erreur lors du changement de mot de passe.');
  }
}
function tempPasswordModal(){
  const info = state.tempPasswordInfo;
  if(!info) return '';
  return `
  <div class="modal-bg">
    <div class="modal" style="max-width:420px;">
      <div class="modal-head">
        <h3 style="margin:0;">${L('temp_password_title')}</h3>
      </div>
      <p style="margin-bottom:16px;">${L('temp_password_lead').replace('{name}', escapeHtml(info.name))}</p>
      <div style="display:flex;gap:8px;margin-bottom:20px;">
        <input type="text" readonly value="${escapeHtml(info.tempPassword)}" id="tempPasswordField" style="font-family:var(--font-mono);font-size:16px;letter-spacing:.05em;flex:1;">
        <button class="btn btn-outline btn-sm" onclick="copyTempPassword()">${L('btn_copy')}</button>
      </div>
      <button class="btn btn-primary btn-block" onclick="closeTempPasswordModal()">${L('btn_close')}</button>
    </div>
  </div>`;
}
function copyTempPassword(){
  const field = document.getElementById('tempPasswordField');
  if(!field) return;
  field.select();
  try{ navigator.clipboard.writeText(field.value); showToast(L('copied')); }
  catch(e){ document.execCommand('copy'); showToast(L('copied')); }
}
function closeTempPasswordModal(){ state.tempPasswordInfo = null; render(); }

function leadDetailModal(){
  const lead = state.leads.find(l=>l.id===state.activeLeadId);
  if(!lead) return '';
  const isAdmin = state.user.role==='admin';
  return `
  <div class="modal-bg" onclick="if(event.target===this) closeLead()">
    <div class="modal">
      <div class="modal-head">
        <div>
          <div class="eyebrow" style="margin-bottom:6px;">${L('detail_title')}</div>
          <h3 style="margin:0;">${lead.ref}</h3>
        </div>
        <button class="modal-close" onclick="closeLead()">&times;</button>
      </div>
      <div style="margin-bottom:16px;">${statusBadge(lead.status)} <span class="hint mono" style="margin-left:8px;">${fmtDate(lead.createdAt)}</span></div>

      <div class="detail-grid">
        <div class="detail-item"><div class="l">${L('q_step1')}</div><div class="v">${coverageLabel(lead.coverageType)}</div></div>
        <div class="detail-item"><div class="l">${L('q_step2')}</div><div class="v">${serviceLabel(lead.service)}</div></div>
      </div>

      <h4 style="font-size:14px;font-family:var(--font-mono);text-transform:uppercase;letter-spacing:.04em;color:var(--ink-soft);margin-bottom:10px;">${L('detail_primary')}</h4>
      <div class="detail-grid">
        <div class="detail-item"><div class="l">${L('f_nom')} / ${L('f_prenom')}</div><div class="v">${lead.primary.nom} ${lead.primary.prenom}</div></div>
        <div class="detail-item"><div class="l">${L('f_tel')}</div><div class="v">${lead.primary.tel}</div></div>
        <div class="detail-item"><div class="l">${L('f_email')}</div><div class="v">${lead.primary.email}</div></div>
        <div class="detail-item"><div class="l">${L('f_adresse')}</div><div class="v">${lead.primary.adresse}, ${lead.primary.codePostal}</div></div>
      </div>

      ${lead.primary.message ? `<div class="field"><label>${L('detail_message')}</label><p style="color:var(--text);font-size:13.5px;">${lead.primary.message}</p></div>` : ''}

      ${lead.members && lead.members.length ? `
        <h4 style="font-size:14px;font-family:var(--font-mono);text-transform:uppercase;letter-spacing:.04em;color:var(--ink-soft);margin:16px 0 10px;">${L('detail_members')}</h4>
        ${lead.members.map(m=>`<div class="member-chip">${m.lien} — ${m.nom} ${m.prenom}</div>`).join('')}
      ` : ''}

      <div class="hint" style="margin-top:14px;">${L('detail_consent')} ${fmtDate(lead.createdAt)}</div>

      <div style="margin-top:22px;padding-top:18px;border-top:1px solid var(--line);">
        ${isAdmin ? `
          <div class="field" style="max-width:280px;">
            <label>${L('assign_to')}</label>
            <select onchange="assignLead('${lead.id}', this.value)">
              <option value="">${L('unassigned')}</option>
              ${state.employees.filter(e=>e.role==='agent').map(e=>`<option value="${e.id}" ${lead.assignedTo===e.id?'selected':''}>${e.name}</option>`).join('')}
            </select>
          </div>
        ` : ''}
        <div class="field" style="max-width:280px;">
          <label>${L('update_status')}</label>
          <div class="pill-actions">
            ${STATUSES.map(s=>`<button class="pill-btn ${lead.status===s?'active':''}" onclick="updateStatus('${lead.id}','${s}')">${L('st_'+s)}</button>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function viewDashboard(){
  const u = state.user;
  const isAdmin = u.role === 'admin';
  const leads = visibleLeads();

  const total = isAdmin ? state.leads.length : state.leads.filter(l=>l.assignedTo===u.id).length;
  const base = isAdmin ? state.leads : state.leads.filter(l=>l.assignedTo===u.id);
  const newCount = base.filter(l=>l.status==='nouveau').length;
  const progressCount = base.filter(l=>l.status==='assigne'||l.status==='contacte').length;
  const closedCount = base.filter(l=>l.status==='clos').length;

  let tableHtml;
  if(!leads.length){
    tableHtml = `<div class="empty-state">${isAdmin ? L('empty_leads') : L('empty_leads_agent')}</div>`;
  } else {
    tableHtml = `
    <table class="leads">
      <thead><tr>
        <th>${L('col_ref')}</th><th>${L('col_date')}</th><th>${L('col_formule')}</th><th>${L('col_service')}</th><th>${L('col_statut')}</th>${isAdmin?`<th>${L('col_conseiller')}</th>`:''}<th>${L('col_actions')}</th>
      </tr></thead>
      <tbody>
        ${leads.map(l=>`
          <tr class="clickable" onclick="openLead('${l.id}')">
            <td class="mono">${l.ref}</td>
            <td>${fmtDate(l.createdAt)}</td>
            <td>${coverageLabel(l.coverageType)}</td>
            <td>${serviceLabel(l.service)}</td>
            <td>${statusBadge(l.status)}</td>
            ${isAdmin?`<td>${employeeName(l.assignedTo)}</td>`:''}
            <td><button class="btn-ghost">${L('view')} →</button></td>
          </tr>
        `).join('')}
      </tbody>
    </table>`;
  }

  let teamHtml = '';
  if(isAdmin){
    const agents = state.employees.filter(e=>e.role==='agent');
    const pendingDevices = state.devices.filter(d=>!d.approved);
    const approvedDevices = state.devices.filter(d=>d.approved);
    const devicesHtml = `
      <h3 style="margin-bottom:16px;">${L('devices_pending_title')}</h3>
      ${!pendingDevices.length ? `<p class="hint" style="margin-bottom:24px;">${L('devices_none_pending')}</p>` : pendingDevices.map(d=>`
        <div class="device-row pending">
          <div class="device-info">
            <b>${escapeHtml(d.employeeName)}</b>
            <span>${escapeHtml(d.label || '')} · ${fmtDate(d.requestedAt)}</span>
          </div>
          <div class="device-actions">
            <button class="btn btn-primary btn-sm" onclick="approveDevice(${d.id})">${L('device_approve')}</button>
            <button class="btn btn-outline btn-sm" onclick="rejectDevice(${d.id})">${L('device_reject')}</button>
          </div>
        </div>
      `).join('')}
      ${approvedDevices.length ? `
        <h3 style="margin:28px 0 16px;">${L('devices_approved_title')}</h3>
        ${approvedDevices.map(d=>`
          <div class="device-row">
            <div class="device-info">
              <b>${escapeHtml(d.employeeName)}</b>
              <span>${escapeHtml(d.label || '')} · ${L('devices_approved_since')} ${fmtDate(d.approvedAt)}</span>
            </div>
            <div class="device-actions">
              <button class="btn-ghost" style="font-size:12px;" onclick="rejectDevice(${d.id})">${L('device_revoke')}</button>
            </div>
          </div>
        `).join('')}
      ` : ''}
    `;
    const addFormHtml = state.dash.showAddEmployee ? `
      <div class="card" style="padding:22px;margin-bottom:24px;">
        <h4 style="margin-bottom:16px;">${L('team_add_title')}</h4>
        <div class="field-row">
          <div class="field"><label>${L('f_fullname')}</label><input type="text" id="new_emp_name"></div>
          <div class="field"><label>${L('f_username')}</label><input type="text" id="new_emp_username" autocomplete="off"></div>
        </div>
        <div class="field-row">
          <div class="field"><label>${L('f_password')}</label>
            <div class="password-field">
              <input type="password" id="new_emp_password" autocomplete="new-password">
              <button type="button" class="btn-ghost password-toggle" onclick="togglePasswordVisibility('new_emp_password', this)">${L('show_password')}</button>
            </div>
          </div>
          <div class="field"><label>${L('f_role')}</label>
            <select id="new_emp_role">
              <option value="agent">${L('role_agent')}</option>
              <option value="admin">${L('role_admin')}</option>
            </select>
          </div>
        </div>
        <div class="field"><label>${L('f_title')}</label><input type="text" id="new_emp_title" placeholder="${L('f_title_ph')}"></div>
        <div class="pill-actions">
          <button class="btn btn-primary btn-sm" onclick="submitNewEmployee()">${L('btn_add')}</button>
          <button class="btn btn-outline btn-sm" onclick="toggleAddEmployee(false)">${L('btn_cancel')}</button>
        </div>
      </div>
    ` : `
      <button class="btn btn-outline btn-sm" style="margin-bottom:24px;" onclick="toggleAddEmployee(true)">+ ${L('team_add_title')}</button>
    `;

    teamHtml = `
      ${devicesHtml}
      ${addFormHtml}
      <h3 style="margin-bottom:16px;">${L('team_title')}</h3>
      <div class="team-grid">
        ${agents.map(a=>{
          const mine = state.leads.filter(l=>l.assignedTo===a.id);
          const assigned = mine.length;
          const contacted = mine.filter(l=>l.status==='contacte'||l.status==='clos').length;
          const closed = mine.filter(l=>l.status==='clos').length;
          return `
          <div class="team-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <div class="avatar">${a.name.split(' ').map(w=>w[0]).join('')}</div>
             <button class="btn-ghost" style="font-size:12px;" onclick="resetEmployeePassword(${a.id}, '${a.name.replace(/'/g,"\\'")}')">${L('btn_reset_password')}</button>
              <button class="btn-ghost" style="font-size:12px;" onclick="deleteEmployee(${a.id}, '${a.name.replace(/'/g,"\\'")}')">${L('btn_remove')}</button>
            </div>
            <h4 style="margin:10px 0 2px;font-size:17px;">${a.name}</h4>
            <span class="hint mono" style="text-transform:uppercase;">${a.title || L('role_agent')}</span>
            <div class="stats">
              <div><b>${assigned}</b><span>${L('team_assigned')}</span></div>
              <div><b>${contacted}</b><span>${L('team_contacted')}</span></div>
              <div><b>${closed}</b><span>${L('team_closed')}</span></div>
            </div>
          </div>`;
        }).join('')}
      </div>

      <h3 style="margin:32px 0 16px;">${L('team_admins_title')}</h3>
      <div class="team-grid">
        ${state.employees.filter(e=>e.role==='admin').map(a=>`
          <div class="team-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <div class="avatar">${a.name.split(' ').map(w=>w[0]).join('')}</div>
              ${a.id!==state.user.id ? `<button class="btn-ghost" style="font-size:12px;" onclick="deleteEmployee(${a.id}, '${a.name.replace(/'/g,"\\'")}')">${L('btn_remove')}</button>` : `<span class="hint mono" style="text-transform:uppercase;">${L('team_you')}</span>`}
            </div>
            <h4 style="margin:10px 0 2px;font-size:17px;">${a.name}</h4>
            <span class="hint mono" style="text-transform:uppercase;">${a.title || L('role_admin')}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  const chatHtml = `
    <div class="chat-shell">
      <div class="chat-messages" id="chatMessages">
        ${!state.chat.messages.length ? `<div class="empty-state">${L('chat_empty')}</div>` : state.chat.messages.map(m=>{
          const mine = m.employee.id === state.user.id;
          return `
          <div class="chat-msg ${mine?'own':'other'}">
            <div class="chat-msg-meta">${mine ? L('chat_you') : escapeHtml(m.employee.name)} · ${fmtDate(m.createdAt)}</div>
            <div class="chat-msg-bubble">${escapeHtml(m.content)}</div>
          </div>`;
        }).join('')}
      </div>
      <div class="chat-compose">
        <textarea id="chatInput" rows="1" placeholder="${L('chat_placeholder')}"
          oninput="state.chat.draft=this.value"
          onkeydown="handleChatKeydown(event)">${escapeHtml(state.chat.draft)}</textarea>
        <button class="btn btn-primary btn-sm" onclick="sendChatMessage()">${L('chat_send')}</button>
      </div>
    </div>
  `;

  const leadsBody = state.dash.tab==='leads' ? `
      <div class="stat-cards">
        <div class="stat-card"><div class="n">${total}</div><div class="l">${L('stat_total')}</div></div>
        <div class="stat-card"><div class="n">${newCount}</div><div class="l">${L('stat_new')}</div></div>
        <div class="stat-card"><div class="n">${progressCount}</div><div class="l">${L('stat_progress')}</div></div>
        <div class="stat-card"><div class="n">${closedCount}</div><div class="l">${L('stat_closed')}</div></div>
      </div>
      <div class="dash-filters">
        <select onchange="setFilter('status', this.value)">
          <option value="all">${L('dash_all_status')}</option>
          ${STATUSES.map(s=>`<option value="${s}" ${state.dash.filterStatus===s?'selected':''}>${L('st_'+s)}</option>`).join('')}
        </select>
        <select onchange="setFilter('service', this.value)">
          <option value="all">${L('dash_all_service')}</option>
          ${SERVICES.map(s=>`<option value="${s}" ${state.dash.filterService===s?'selected':''}>${serviceLabel(s)}</option>`).join('')}
        </select>
      </div>
      ${tableHtml}
  ` : state.dash.tab==='chat' ? chatHtml : teamHtml;

  return `
  <div class="dash-shell">
    <div class="dash-top">
      <div class="wrap dash-top-inner">
        <div class="logo" style="color:#fff;cursor:pointer;" onclick="goHome()"><span>Preventisassur</span></div>
        <div class="dash-user">
          <div class="lang-toggle" style="border-color:rgba(255,255,255,.3);">
            <button class="${state.lang==='fr'?'active':''}" onclick="setLang('fr')">FR</button>
            <button class="${state.lang==='en'?'active':''}" onclick="setLang('en')">EN</button>
          </div>
          <div class="avatar">${u.name.split(' ').map(w=>w[0]).join('')}</div>
          <div><div class="name">${u.name}</div><div class="role">${u.title || ''}</div></div>
          <button class="btn-ghost" style="color:#fff;" onclick="openPasswordModal()">${L('change_password')}</button>
          <button class="btn btn-outline-light btn-sm" onclick="logout()">${L('logout')}</button>
        </div>
      </div>
    </div>
    <div class="wrap dash-body">
      <div class="dash-tabs">
        <button class="dash-tab ${state.dash.tab==='leads'?'active':''}" onclick="setDashTab('leads')">${L('dash_leads')}</button>
        <button class="dash-tab ${state.dash.tab==='chat'?'active':''}" onclick="setDashTab('chat')">${L('dash_chat')}</button>
        ${isAdmin ? `<button class="dash-tab ${state.dash.tab==='team'?'active':''}" onclick="setDashTab('team')">${L('dash_team')}</button>` : ''}
      </div>
      ${state.dash.tab!=='chat' && !state.leadsLoaded ? `<div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>` : leadsBody}
    </div>
  </div>
  ${state.activeLeadId ? leadDetailModal() : ''}
    ${state.showPasswordModal ? passwordModal() : ''}
  ${state.tempPasswordInfo ? tempPasswordModal() : ''}
  `;
}

/* ============================= MASTER RENDER ============================= */
function render(){
  const app = document.getElementById('app');

  // Preserve focus and cursor position across auto-refreshes, whatever field
  // the user happens to be typing in (chat box, add-employee form, password
  // fields, etc.) — checking this AFTER replacing the DOM is unreliable,
  // since removing a focused element fires its blur handler mid-replacement.
  const prevActive = document.activeElement;
  const prevId = prevActive && prevActive.id ? prevActive.id : null;
  const isTextInput = prevActive && (prevActive.tagName === 'INPUT' || prevActive.tagName === 'TEXTAREA');
  const prevSelStart = isTextInput ? prevActive.selectionStart : null;
  const prevSelEnd = isTextInput ? prevActive.selectionEnd : null;

  let html = '';
  if(state.view==='home') html = viewHome();
  else if(state.view==='legal') html = viewLegal();
  else if(state.view==='serviceInfo') html = viewServiceInfo();
  else if(state.view==='quote') html = viewQuote();
  else if(state.view==='login') html = viewLogin();
  else if(state.view==='dashboard') html = state.user ? viewDashboard() : viewLogin();
  else html = viewHome();

  if(state.toast) html += `<div class="toast">${state.toast}</div>`;

  app.innerHTML = html;

  if(prevId){
    const el = document.getElementById(prevId);
    if(el){
      el.focus();
      if(isTextInput && typeof prevSelStart === 'number'){
        try{ el.setSelectionRange(prevSelStart, prevSelEnd); }catch(e){}
      }
    }
  }

  if(state.view==='dashboard' && state.dash.tab==='chat'){
    const msgEl = document.getElementById('chatMessages');
    if(msgEl) msgEl.scrollTop = msgEl.scrollHeight;
  }
}

render();
checkSession();