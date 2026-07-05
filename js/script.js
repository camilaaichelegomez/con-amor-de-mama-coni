document.getElementById('year').textContent = new Date().getFullYear();

// Menú móvil
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Animaciones de aparición al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Galería: las fotos se columpian al tocarlas
document.querySelectorAll('.polaroid').forEach(card => {
  const swing = () => {
    card.classList.remove('swinging');
    void card.offsetWidth; // reinicia la animación
    card.classList.add('swinging');
  };
  card.addEventListener('mouseenter', swing);
  card.addEventListener('touchstart', swing, { passive: true });
  card.addEventListener('click', swing);
});

// Galería: arrastrar para desplazar
const track = document.getElementById('gallery-track');
let isDown = false, startX = 0, scrollStart = 0, moved = false;

track.addEventListener('pointerdown', (e) => {
  isDown = true;
  moved = false;
  startX = e.clientX;
  scrollStart = track.scrollLeft;
  track.classList.add('dragging');
});
window.addEventListener('pointermove', (e) => {
  if (!isDown) return;
  const dx = e.clientX - startX;
  if (Math.abs(dx) > 5) moved = true;
  track.scrollLeft = scrollStart - dx;
});
window.addEventListener('pointerup', () => {
  isDown = false;
  track.classList.remove('dragging');
});
