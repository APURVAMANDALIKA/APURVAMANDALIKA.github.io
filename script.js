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
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================
   Project screenshot galleries
   ============================ */
const galleries = {
  cpr: {
    title: 'Steady Hands CPR & First Aid',
    images: [
      { src: 'assets/img/cpr-hero.png', caption: 'Hero section with the animated pulse-line signature element.' },
      { src: 'assets/img/cpr-courses.png', caption: 'Heartsaver vs. BLS course comparison.' },
      { src: 'assets/img/cpr-about.png', caption: 'Instructor credentials section.' },
    ],
  },
  boutique: {
    title: 'Boutique Inventory Reconciliation',
    images: [
      { src: 'assets/img/boutique-store.png', caption: 'Storefront hero.' },
      { src: 'assets/img/boutique-upload.png', caption: 'CSV upload panel for the reconciliation tool.' },
      { src: 'assets/img/boutique-dashboard.png', caption: 'Discrepancy report after running exact + fuzzy SKU matching on sample data.' },
    ],
  },
};

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxCount = document.getElementById('lightboxCount');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let activeGallery = null;
let activeIndex = 0;
let lastFocusedEl = null;

function renderLightbox() {
  if (!activeGallery) return;
  const item = activeGallery.images[activeIndex];
  lightboxImg.src = item.src;
  lightboxImg.alt = `${activeGallery.title} — screenshot ${activeIndex + 1}`;
  lightboxTitle.textContent = activeGallery.title;
  lightboxCaption.textContent = item.caption || '';
  lightboxCount.textContent = `${activeIndex + 1} / ${activeGallery.images.length}`;
}

function openGallery(key, triggerEl) {
  const gallery = galleries[key];
  if (!gallery) return;
  activeGallery = gallery;
  activeIndex = 0;
  lastFocusedEl = triggerEl || document.activeElement;
  renderLightbox();
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  lightbox.querySelector('.lightbox-close').focus();
}

function closeGallery() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
  activeGallery = null;
  if (lastFocusedEl) lastFocusedEl.focus();
}

function showNext() {
  if (!activeGallery) return;
  activeIndex = (activeIndex + 1) % activeGallery.images.length;
  renderLightbox();
}

function showPrev() {
  if (!activeGallery) return;
  activeIndex = (activeIndex - 1 + activeGallery.images.length) % activeGallery.images.length;
  renderLightbox();
}

document.querySelectorAll('.gallery-trigger').forEach(btn => {
  btn.addEventListener('click', () => openGallery(btn.dataset.gallery, btn));
});

lightbox.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', closeGallery);
});

lightboxNext.addEventListener('click', showNext);
lightboxPrev.addEventListener('click', showPrev);

document.addEventListener('keydown', (e) => {
  if (lightbox.hidden) return;
  if (e.key === 'Escape') closeGallery();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});
