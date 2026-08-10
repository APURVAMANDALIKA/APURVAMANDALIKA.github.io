// Mobile nav toggle
const toggle = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

toggle.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
