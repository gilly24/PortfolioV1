/**
 * skills.js
 * Animates skill progress bars to their target width
 * when scrolled into view (GSAP + ScrollTrigger).
 */
export function initSkills() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  document.querySelectorAll('.skill-bar').forEach(bar => {
    const pct = parseFloat(bar.dataset.pct);

    ScrollTrigger.create({
      trigger: bar,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(bar, {
          scaleX: pct,
          duration: 1,
          ease: 'power2.out',
        });
      },
    });
  });
}
