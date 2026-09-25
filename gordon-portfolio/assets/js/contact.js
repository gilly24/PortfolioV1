/**
 * contact.js
 * Sends the contact form to /api/contact with a
 * loading spinner → green checkmark success animation.
 * Bot protection: Cloudflare Turnstile widget + hidden honeypot field.
 */
const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

export function initContact() {
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const status    = document.getElementById('formStatus');
  const widgetEl  = document.getElementById('turnstileWidget');
  if (!form || !submitBtn) return;

  let widgetId = null;
  const turnstileReady = initTurnstile(widgetEl).then(id => { widgetId = id; });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (submitBtn.classList.contains('loading')) return;
    setStatus('');

    if (!form.reportValidity()) return;

    submitBtn.classList.add('loading');
    await turnstileReady;

    if (widgetId === null) {
      submitBtn.classList.remove('loading');
      setStatus('Spam protection could not load (an ad blocker may be blocking it). Please email me directly.', true);
      return;
    }

    const token = window.turnstile.getResponse(widgetId) || '';
    if (!token) {
      submitBtn.classList.remove('loading');
      setStatus('Still checking you are human. Please try again in a moment.', true);
      return;
    }

    const data = Object.fromEntries(new FormData(form));

    try {
      const res  = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    data.name,
          email:   data.email,
          message: data.message,
          website: data.website,
          token,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Something went wrong. Please try again.');

      submitBtn.classList.remove('loading');
      submitBtn.classList.add('success');
      form.reset();

      // Reset button after 3 s
      setTimeout(() => {
        submitBtn.classList.remove('success');
      }, 3000);
    } catch (err) {
      submitBtn.classList.remove('loading');
      setStatus(err.message || 'Something went wrong. Please try again.', true);
    } finally {
      // Turnstile tokens are single-use
      window.turnstile.reset(widgetId);
    }
  });

  function setStatus(text, isError = false) {
    if (!status) return;
    status.textContent = text;
    status.classList.toggle('error', isError);
  }
}

// Fetches the public site key, loads the Turnstile script and renders the widget.
// Resolves to the widget id, or null if Turnstile isn't available.
async function initTurnstile(container) {
  if (!container) return null;
  try {
    const res = await fetch('/api/contact');
    const { turnstileSiteKey } = await res.json();
    if (!turnstileSiteKey) return null;

    await loadScript(TURNSTILE_SRC);
    return window.turnstile.render(container, {
      sitekey: turnstileSiteKey,
      theme: document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark',
      appearance: 'interaction-only',
    });
  } catch (err) {
    console.warn('Turnstile unavailable', err);
    return null;
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}
