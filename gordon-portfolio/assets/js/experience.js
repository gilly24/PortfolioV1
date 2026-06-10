/**
 * experience.js
 * Draws the timeline SVG line downward using stroke-dashoffset
 * when the timeline section enters the viewport.
 */
export function initExperience() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const path = document.querySelector('.timeline-line-path');
  if (!path) return;

  ScrollTrigger.create({
    trigger: '#timeline',
    start: 'top 70%',
    once: true,
    onEnter: () => {
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut',
      });
    },
  });
}
