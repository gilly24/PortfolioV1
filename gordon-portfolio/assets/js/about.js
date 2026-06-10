/**
 * about.js
 * Animates stat card numbers counting up when scrolled into view.
 * Uses GSAP + ScrollTrigger (globals from CDN).
 */
export function initAbout() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const proxy  = { val: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(proxy, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(proxy.val) + suffix;
          },
        });
      },
    });
  });
}
