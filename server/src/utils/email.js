// Envoi d'e-mails via l'API Resend (https://resend.com).
// Si RESEND_API_KEY n'est pas configuré, la fonction ne fait rien (et le
// reste du site continue de fonctionner normalement — la création de
// dossier ou l'attribution ne doivent jamais échouer à cause d'un e-mail).

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || 'Preventisassur <onboarding@resend.dev>';

async function sendMail({ to, subject, html }) {
  if (!RESEND_API_KEY) {
    console.log(`[email] RESEND_API_KEY non configuré — e-mail non envoyé (à: ${to}, sujet: ${subject})`);
    return { skipped: true };
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: EMAIL_FROM, to, subject, html }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error(`[email] Échec de l'envoi (${res.status}) à ${to} :`, text);
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error(`[email] Erreur réseau lors de l'envoi à ${to} :`, err);
    return { ok: false };
  }
}

module.exports = { sendMail };