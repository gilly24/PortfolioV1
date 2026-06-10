/**
 * contact.js
 * Handles the contact form submission with a
 * loading spinner → green checkmark success animation.
 * No real backend — purely visual feedback.
 */
export function initContact() {
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  if (!form || !submitBtn) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.classList.add('loading');

    // Simulate async send
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.classList.add('success');
      form.reset();

      // Reset button after 3 s
      setTimeout(() => {
        submitBtn.classList.remove('success');
      }, 3000);
    }, 1500);
  });
}
