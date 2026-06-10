/**
 * cursor.js
 * Custom cyan dot + trailing ring cursor.
 * Hides automatically on touch devices.
 */
export function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let dotX = 0, dotY = 0;

  document.addEventListener('mousemove', e => {
    dotX = e.clientX;
    dotY = e.clientY;
    dot.style.left = dotX + 'px';
    dot.style.top  = dotY + 'px';
  });

  // Ring lerps toward dot position
  let ringX = 0, ringY = 0;
  function animateRing() {
    ringX += (dotX - ringX) * 0.12;
    ringY += (dotY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  attachHoverListeners();
}

/** Attach cursor hover expand to all interactive elements. */
export function attachHoverListeners() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  document.querySelectorAll('a, button, .filter-tab, .icon-btn, .stat-card, .contact-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('hover');
      dot.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('hover');
      dot.classList.remove('hover');
    });
  });
}
