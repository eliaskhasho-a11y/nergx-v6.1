// Core app & router
const State = {
  notis: [],
  lang: localStorage.getItem('mx.lang') || 'sv',
  role: localStorage.getItem('mx.role') || 'Admin',
  theme: 'light',
};

const Routes = [
  { key:'#/dashboard', name:'Översikt', icon:'📊', render: Dashboard.render },
  { key:'#/crm',       name:'CRM',      icon:'👥', render: CRM.render },
  { key:'#/inventory', name:'Inventarie', icon:'📦', render: Inventory.render },
  { key:'#/economy',   name:'Ekonomi',  icon:'💰', render: Economy.render },
  { key:'#/ai-map',    name:'AI-Karta', icon:'🗺️', render: MapView.render },
  { key:'#/files',     name:'Filer',    icon:'📄', render: Files.render },
  { key:'#/automation',name:'Automation', icon:'⚙️', render: Automation.render },
  { key:'#/academy',   name:'Akademi',  icon:'🎓', render: Academy.render },
  { key:'#/chat',      name:'Chatt',    icon:'💬', render: Chat.render },
  { key:'#/settings',  name:'Inställningar', icon:'⚙️', render: Settings.render },
];

function toggleSidebar(){ document.querySelector('aside').classList.toggle('open'); }

function go(hash){ location.hash = hash || '#/dashboard'; }

function buildNav(){
  const n = document.getElementById('nav');
  n.innerHTML = Routes.map(r => `<a href="${r.key}" data-key="${r.key}">${r.icon} ${r.name}</a>`).join('');
}

function setActiveNav(hash){
  document.querySelectorAll('#nav a').forEach(a=>{
    a.classList.toggle('active', a.getAttribute('data-key')===hash);
  });
}

function renderRoute(){
  const hash = location.hash || '#/dashboard';
  const route = Routes.find(r => r.key===hash);
  const v = document.getElementById('view');
  if(route){
    setActiveNav(hash);
    v.innerHTML = route.render();
    // Wire up any post-render scripts:
    if(typeof route.afterRender === 'function') route.afterRender();
  }else{
    v.innerHTML = `<div class="card"><div class="hd">Sidan finns inte</div><div class="bd">Kontrollera menyn.</div></div>`;
  }
}

function notis(text){
  const t = new Date().toLocaleTimeString();
  State.notis.unshift(`${t} — ${text}`);
  State.notis = State.notis.slice(0,8);
  document.getElementById('notisCount').textContent = `(${State.notis.length})`;
  document.getElementById('notisList').innerHTML = State.notis.map(x=>`<div class="row"><span>${x}</span></div>`).join('') || '–';
}

function globalShortcuts(){
  const box = document.getElementById('globalSearch');
  // Cmd/Ctrl+K focus
  window.addEventListener('keydown', (e)=>{
    if((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); box.focus(); }
    if(e.key==='/' && document.activeElement!==box){ box.focus(); e.preventDefault(); }
  });
  box.addEventListener('keydown',(e)=>{
    if(e.key==='Enter'){
      const q = box.value.trim().toLowerCase();
      const hit = Routes.find(r=> r.name.toLowerCase().includes(q) || r.key.includes(q));
      if(hit) go(hit.key);
    }
  });
}

function wireControls(){
  const roleSel = document.getElementById('role');
  const langSel = document.getElementById('lang');
  roleSel.value = State.role;
  langSel.value = State.lang;
  roleSel.addEventListener('change',()=>{
    State.role = roleSel.value; localStorage.setItem('mx.role', State.role);
    notis(`Roll satt till ${State.role}`);
  });
  langSel.addEventListener('change',()=>{
    State.lang = langSel.value; localStorage.setItem('mx.lang', State.lang);
    notis(`Språk satt till ${State.lang}`);
  });
  // Coach enter-to-send
  const coachInput = document.getElementById('coachInput');
  coachInput.addEventListener('keydown', (e)=>{
    if(e.key==='Enter'){ e.preventDefault(); Coach.send(); }
  });
}

window.addEventListener('hashchange', renderRoute);

(function init(){
  buildNav();
  renderRoute();
  globalShortcuts();
  wireControls();
  notis('MergX v8.60 laddad.');
  Coach.boot();
})();
