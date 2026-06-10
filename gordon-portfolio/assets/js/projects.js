/**
 * projects.js
 * Filter tabs — toggles project card visibility with a fade-in.
 * Categories are stored as space-separated values in data-category.
 */
export function initProjects() {
  const tabs  = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.project-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.dataset.filter;

      cards.forEach(card => {
        const cats = (card.dataset.category || '').split(' ');
        const show = filter === 'all' || cats.includes(filter);

        if (show) {
          card.classList.remove('hidden');
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(card, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
          }
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}
