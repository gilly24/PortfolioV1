/**
 * api/contact.js
 * Vercel serverless function for the contact form.
 *
 *   GET  → returns the public Turnstile site key for the widget
 *   POST → honeypot check → Turnstile verification → email via Resend
 *
 * Environment variables (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY        required
 *   TURNSTILE_SITE_KEY    required (public, served to the browser)
 *   TURNSTILE_SECRET_KEY  required
 *   CONTACT_TO            optional, defaults to gordongill24@gmail.com
 *   CONTACT_FROM          optional, defaults to Resend's onboarding sender
 */

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const RESEND_URL           = 'https://api.resend.com/emails';

const DEFAULT_TO   = 'gordongill24@gmail.com';
const DEFAULT_FROM = 'Portfolio Contact <onboarding@resend.dev>';

const LIMITS = { name: 100, email: 254, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ turnstileSiteKey: process.env.TURNSTILE_SITE_KEY || null });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { RESEND_API_KEY, TURNSTILE_SECRET_KEY } = process.env;
  if (!RESEND_API_KEY || !TURNSTILE_SECRET_KEY) {
    console.error('Contact form is missing RESEND_API_KEY or TURNSTILE_SECRET_KEY');
    return res.status(500).json({ error: 'Contact form is not configured yet.' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};

  // Honeypot: real visitors never see this field. Pretend it worked so bots move on.
  if (body.website) return res.status(200).json({ ok: true });

  const name    = clean(body.name);
  const email   = clean(body.email);
  const message = clean(body.message);
  const token   = typeof body.token === 'string' ? body.token : '';

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in your name, email and message.' });
  }
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return res.status(400).json({ error: 'One of the fields is too long.' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (!token) {
    return res.status(400).json({ error: 'Verification is still loading. Please try again.' });
  }

  // Cloudflare Turnstile verification
  try {
    const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
    const params = new URLSearchParams({ secret: TURNSTILE_SECRET_KEY, response: token });
    if (ip) params.set('remoteip', ip);

    const verify  = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', body: params });
    const outcome = await verify.json();
    if (!outcome.success) {
      return res.status(403).json({ error: 'Verification failed. Please refresh and try again.' });
    }
  } catch (err) {
    console.error('Turnstile verification error', err);
    return res.status(502).json({ error: 'Could not verify your request. Please try again.' });
  }

  // Send via Resend
  try {
    const send = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || DEFAULT_FROM,
        to: [process.env.CONTACT_TO || DEFAULT_TO],
        reply_to: email,
        subject: `Portfolio message from ${name.replace(/[\r\n]+/g, ' ')}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!send.ok) {
      console.error('Resend error', send.status, await send.text());
      return res.status(502).json({ error: 'Message could not be sent. Please email me directly.' });
    }
  } catch (err) {
    console.error('Resend request error', err);
    return res.status(502).json({ error: 'Message could not be sent. Please email me directly.' });
  }

  return res.status(200).json({ ok: true });
};

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}
