document.addEventListener('DOMContentLoaded', () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Window controls: close shows a hint, maximize opens a new tab.
  const controls = document.querySelector('.mac-window-controls');
  const dropdown = document.querySelector('.close-dropdown');
  document.querySelector('.control-btn.close').addEventListener('click', () => {
    controls.style.display = 'none';
    dropdown.classList.remove('hidden');
  });
  document.querySelector('.dropdown-close-btn').addEventListener('click', () => {
    dropdown.classList.add('hidden');
    controls.style.display = 'flex';
  });
  document.querySelector('.control-btn.maximize').addEventListener('click', () => {
    window.open(window.location.href, '_blank');
  });

  // Snowfall: pauses offscreen, becomes a still frame with reduced motion.
  document.querySelectorAll('canvas[data-snow]').forEach((canvas) => {
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, flakes = [], raf = 0, visible = false;
    const size = () => {
      const r = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height; canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(160, Math.max(50, w * h / 9000)));
      flakes = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h, r: 0.8 + Math.random() * 2.6,
        v: 0.25 + Math.random() * 0.9, s: Math.random() * Math.PI * 2, a: 0.45 + Math.random() * 0.5,
      }));
    };
    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        if (!reduce) {
          f.y += f.v * (0.5 + f.r / 3); f.x += Math.sin(t / 1400 + f.s) * 0.35 + 0.12;
          if (f.y > h + 5) { f.y = -5; f.x = Math.random() * w; }
          if (f.x > w + 5) f.x = -5;
        }
        ctx.beginPath(); ctx.fillStyle = `rgba(248,251,255,${f.a})`; ctx.arc(f.x, f.y, f.r, 0, 6.2832); ctx.fill();
      }
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    };
    size(); draw(0);
    window.addEventListener('resize', () => { size(); if (reduce) draw(0); });
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting; cancelAnimationFrame(raf);
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    }).observe(canvas);
  });

  // Pointer parallax on the hero scene.
  const hero = document.querySelector('.hero');
  if (hero && !reduce && window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    });
  }
});
