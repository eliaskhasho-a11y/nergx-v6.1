/* ======================================
   MergX v8.22 — app.js
   ====================================== */

/* === DOM ELEMENTS === */
const navLinks = document.querySelectorAll('.nav-link');
const modal = document.querySelector('.modal');
const modalBackdrop = document.querySelector('.modal-backdrop');
const modalPanel = document.querySelector('.modal-panel');
const themeToggle = document.getElementById('theme-toggle');
const sidebar = document.querySelector('.sidebar');
const body = document.body;

/* === GLOBAL STATE === */
let currentTheme = localStorage.getItem('theme') || 'dark';

/* === INIT === */
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);
  initNavigation();
  initModals();
  initThemeToggle();
  initMobileMenu();
  console.log('✅ MergX 8.22 app.js laddad');
});

/* === NAVIGATION === */
function initNavigation() {
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const target = link.dataset.target;
      loadView(target);
    });
  });
}

function loadView(view) {
  const viewContainer = document.querySelector('.view');
  if (!viewContainer) return;

  viewContainer.innerHTML = `
    <div class="placeholder">
      <div class="skeleton"></div>
      <div class="skeleton"></div>
      <div class="skeleton"></div>
    </div>
  `;

  // Simulera laddningstid
  setTimeout(() => {
    viewContainer.innerHTML = `
      <h2>${view}</h2>
      <p>Innehåll för <strong>${view}</strong> har laddats.</p>
    `;
  }, 600);
}

/* === MODALER === */
function initModals() {
  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.modalOpen));
  });

  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }

  // Stäng med Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function openModal(contentId) {
  modal.classList.add('active');
  const content = document.getElementById(contentId);
  if (content) {
    modalPanel.querySelector('.modal-body').innerHTML = content.innerHTML;
  } else {
    modalPanel.querySelector('.modal-body').innerHTML =
      `<p style="color:var(--text-muted)">Ingen data tillgänglig ännu.</p>`;
  }
}

function closeModal() {
  modal.classList.remove('active');
}

/* === TEMA === */
function initThemeToggle() {
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme);
  localStorage.setItem('theme', currentTheme);
}

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

/* === MOBILMENY === */
function initMobileMenu() {
  const menuButton = document.getElementById('menu-toggle');
  if (!menuButton) return;

  menuButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
}

/* === DEBUG === */
console.log('🧠 MergX JS aktivt — klar för interaktion');
