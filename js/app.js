import { Router } from './router.js';
import { dashboardView } from './modules/dashboard.js';
import { crmView } from './modules/crm.js';
import { inventoryView } from './modules/inventory.js';
import { economyView } from './modules/economy.js';
import { mapView } from './modules/map.js';
import { filesView } from './modules/files.js';
import { automationView } from './modules/automation.js';
import { academyView } from './modules/academy.js';
import { chatView } from './modules/chat.js';
import { settingsView } from './modules/settings.js';

// Global state (mock, can be swapped for API later)
const State = {
  kpi:{ revenue:324500, orders:71, margin:62 },
  notis:[]
};

// Notis helper
function pushNotis(txt){
  const ts = new Date().toLocaleTimeString('sv-SE');
  State.notis.unshift(`${ts} — ${txt}`);
  const list = document.getElementById('notisList');
  if(list){ list.textContent = State.notis.slice(0,20).join('\n'); }
}

// AI Coach (local mock – Enter to send)
const aiForm = document.getElementById('aiForm');
const aiInput = document.getElementById('aiInput');
const aiChat = document.getElementById('aiChat');
aiForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const val = aiInput.value.trim();
  if(!val) return;
  const u = document.createElement('div');
  u.className='user';
  u.textContent = `Du: ${val}`;
  aiChat.appendChild(u);
  aiInput.value='';
  // Mock assistant
  setTimeout(()=>{
    const a = document.createElement('div');
    a.className='answer';
    a.textContent = 'AI: Jag övervakar KPI:er, lager & deadlines. Vill du se prognos för Q4?';
    aiChat.appendChild(a);
    aiChat.scrollTop = aiChat.scrollHeight;
  }, 350);
});

// Search form
document.getElementById('globalSearch').addEventListener('submit', (e)=>{
  e.preventDefault();
  const q = document.getElementById('q').value.trim();
  pushNotis(q ? `Global sök: "${q}"` : 'Tom sökning');
});

document.getElementById('toDashboard').addEventListener('click', ()=> location.hash = '#/dashboard');

// Router
const viewEl = document.getElementById('view');
Router.mount(viewEl);
Router.register('/dashboard', (el)=> dashboardView(el, State, pushNotis));
Router.register('/crm', crmView);
Router.register('/inventory', inventoryView);
Router.register('/economy', (el)=> economyView(el, State));
Router.register('/map', mapView);
Router.register('/files', filesView);
Router.register('/automation', automationView);
Router.register('/academy', academyView);
Router.register('/chat', chatView);
Router.register('/settings', settingsView);
Router.register('/404', (el)=>{
  el.innerHTML = `<div class="card"><h2>Sidan finns inte</h2><p class="small">Kontrollera länken eller välj i menyn.</p></div>`;
});

// Demo tick to update KPI on dashboard
setInterval(()=>{
  State.kpi.revenue = Math.max(100000, State.kpi.revenue + Math.round((Math.random()-0.45)*2000));
  if(location.hash==='#/dashboard'){
    dashboardView(viewEl, State, pushNotis); // re-render small parts
  }
  if(Math.random()<.15) pushNotis(`Ny order skapad #M-${10000+Math.floor(Math.random()*9999)}`);
}, 4000);
