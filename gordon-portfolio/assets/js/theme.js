/**
 * theme.js
 * Toggles [data-theme="dark"] / [data-theme="light"] on <html>.
 * Persists preference to localStorage.
 */
export function initTheme() {
  const html      = document.documentElement;
  const btn       = document.getElementById('themeToggle');
  const iconLight = document.getElementById('themeIconLight');
  const iconDark  = document.getElementById('themeIconDark');

  // Restore saved preference
  const saved = localStorage.getItem('theme');
  if (saved) {
    html.setAttribute('data-theme', saved);
    syncIcons(saved === 'dark');
  }

  btn?.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    const next   = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    syncIcons(!isDark);
  });

  function syncIcons(isDark) {
    if (!iconLight || !iconDark) return;
    iconLight.style.display = isDark ? 'none'  : 'block';
    iconDark.style.display  = isDark ? 'block' : 'none';
  }
}
