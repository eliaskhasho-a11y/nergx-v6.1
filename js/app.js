// js/app.js
const appEl     = document.getElementById('app');
const overlay   = document.getElementById('overlay');
const aiNav     = document.getElementById('aiNav');
const openAINav = document.getElementById('openAINav');
const closeAINav= document.getElementById('closeAINav');

const routes = {
  overview : 'pages/overview.html',   // Steg 1: finns (placeholder)
  customers: 'pages/customers.html',  // Skapas i steg 2+
  inventory: 'pages/inventory.html',
  employees: 'pages/employees.html',
  orders   : 'pages/orders.html',
  files    : 'pages/files.html',
  'ai-map' : 'pages/ai-map.html',
  teamchat : 'pages/teamchat.html',
  settings : 'pages/settings.html',
};

// --- Router ---
async function loadRoute(route='overview'){
  const file = routes[route] || routes.overview;
  try{
    appEl.setAttribute('aria-busy', 'true');
    const res = await fetch(file, {cache:'no-cache'});
    if(!res.ok) throw new Error(`${file} ${res.status}`);
    const html = await res.text();
    appEl.innerHTML = html;
  }catch(err){
    appEl.innerHTML = `<div class="card"><h3>Fel vid laddning</h3><p>${err.message}</p></div>`;
  }finally{
    appEl.setAttribute('aria-busy','false');
  }
  // uppdatera aktiv länk
  document.querySelectorAll('.nav-link').forEach(btn=>{
    btn.classList.toggle('is-active', btn.dataset.route === route);
  });
  // uppdatera URL hash (enkel)
  history.replaceState({}, '', `#${route}`);
}

function initNav(){
  document.querySelectorAll('.nav-link').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const route = btn.dataset.route;
      loadRoute(route);
    });
  });
}

function openNav(){
  aiNav.classList.add('open');
  aiNav.setAttribute('aria-hidden','false');
  openAINav.setAttribute('aria-expanded','true');
  overlay.hidden = false;
}
function closeNav(){
  aiNav.classList.remove('open');
  aiNav.setAttribute('aria-hidden','true');
  openAINav.setAttribute('aria-expanded','false');
  overlay.hidden = true;
}

openAINav.addEventListener('click', ()=>{
  const isOpen = aiNav.classList.contains('open');
  isOpen ? closeNav() : openNav();
});
closeAINav.addEventListener('click', closeNav);
overlay.addEventListener('click', closeNav);
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeNav(); });

// starta
initNav();
const initial = location.hash?.slice(1) || 'overview';
loadRoute(initial);

// (Valfritt: hooks för tema/språk)
document.getElementById('themeToggle')?.addEventListener('click', ()=>{
  document.documentElement.classList.toggle('light'); // vi kan bygga light senare
});
