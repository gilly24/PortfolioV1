/**
 * main.js
 * Entry point — bootstraps every module and configures
 * global GSAP ScrollTrigger scroll reveals + progress bar.
 *
 * Loaded as <script type="module"> so ES imports work
 * without a build step.
 */

import { initCursor, attachHoverListeners } from './cursor.js';
import { initTheme }      from './theme.js';
import { initNav }        from './nav.js';
import { initStarfield }  from './starfield.js';
import { initTerminal }   from './terminal.js';
import { initHeroAnimations } from './hero.js';
import { initAbout }      from './about.js';
import { initProjects }   from './projects.js';
import { initSkills }     from './skills.js';
import { initExperience } from './experience.js';
import { initContact }    from './contact.js';

// ── Wait for DOM ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // Initialize Lucide icons (global from CDN)
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Register GSAP ScrollTrigger plugin
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    initScrollProgress();
    initSectionReveals();
  }

  // Initialize all modules
  initCursor();
  initTheme();
  initNav();
  initStarfield();
  initTerminal(1800);
  initHeroAnimations();
  initAbout();
  initProjects();
  initSkills();
  initExperience();
  initContact();

  // Re-attach cursor hover listeners after icons render
  setTimeout(attachHoverListeners, 500);
});

// ── Scroll progress bar ───────────────────────────────────────
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;

  ScrollTrigger.create({
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: self => gsap.set(bar, { scaleX: self.progress }),
  });
}

// ── Generic section reveal (clip-path wipe + fade + y) ───────
function initSectionReveals() {
  gsap.utils.toArray('.section-label, .section-heading, .section-desc, .reveal').forEach(el => {
    gsap.fromTo(
      el,
      { opacity: 0, clipPath: 'inset(0 0 100% 0)', y: 20 },
      {
        opacity: 1,
        clipPath: 'inset(0 0 0% 0)',
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}
