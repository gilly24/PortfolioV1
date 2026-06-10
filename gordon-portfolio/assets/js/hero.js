/**
 * hero.js
 * GSAP entrance animation timeline for the hero section.
 * Runs once on page load (no ScrollTrigger).
 */
export function initHeroAnimations() {
  // gsap is loaded as a global CDN script
  if (typeof gsap === 'undefined') return;

  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.hero-label',                 { opacity: 0, y: 20, duration: 0.6 })
    .from('.hero h1',                    { opacity: 0, y: 40, duration: 0.8 }, '-=0.3')
    .from('.hero-subtitle',              { opacity: 0, y: 30, duration: 0.7 }, '-=0.4')
    .from('.hero-body',                  { opacity: 0,         duration: 0.6 }, '-=0.3')
    .from('.hero-ctas',                  { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
    .from('.tech-icons .tech-icon-item', { opacity: 0, stagger: 0.08, duration: 0.4 }, '-=0.2')
    .from('.hero-terminal',              { opacity: 0, x: 40, duration: 0.9, ease: 'power2.out' }, '-=0.6');
}
