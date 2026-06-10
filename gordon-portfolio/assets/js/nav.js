/**
 * nav.js
 * - Shrinks nav padding on scroll
 * - Highlights active nav link via IntersectionObserver
 * - Handles hamburger / mobile drawer toggle
 */
export function initNav() {
  const nav        = document.querySelector('.nav');
  const navLinks   = document.querySelectorAll('.nav-links a[data-section]');
  const hamburger  = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Scroll shrink
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Active section highlight
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));

  // Hamburger toggle
  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileNav?.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on mobile link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  function closeMobileNav() {
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    mobileNav?.classList.remove('open');
    document.body.style.overflow = '';
  }
}
