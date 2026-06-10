/**
 * starfield.js
 * Animated canvas star-field for the hero background.
 * ~200 stars that slowly drift upward and twinkle.
 */
export function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let stars  = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = Array.from({ length: 200 }, () => ({
      x:           Math.random() * canvas.width,
      y:           Math.random() * canvas.height,
      r:           Math.random() * 1.2 + 0.2,
      o:           Math.random(),
      speed:       Math.random() * 0.3 + 0.05,
      twinkleRate: Math.random() * 0.02 + 0.005,
      twinkleDir:  Math.random() > 0.5 ? 1 : -1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
      // Twinkle
      star.o += star.twinkleRate * star.twinkleDir;
      if (star.o > 0.9 || star.o < 0.1) star.twinkleDir *= -1;

      // Drift upward, wrap
      star.y -= star.speed;
      if (star.y < 0) star.y = canvas.height;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.o})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  createStars();
  draw();

  window.addEventListener('resize', () => {
    resize();
    createStars();
  });
}
