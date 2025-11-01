import { initState, State, notify } from './state.js';
import { renderDashboard } from './views/dashboard.js';
import { renderCRM } from './views/crm.js';
import { renderInventory } from './views/inventory.js';
import { renderOrders } from './views/orders.js';
import { renderFinance } from './views/finance.js';
import { renderFiles } from './views/files.js';
import { renderTeam } from './views/team.js';
import { renderChat } from './views/chat.js';
import { renderMap } from './views/map.js';
import { renderSettings } from './views/settings.js';

const Views = {
  dashboard: renderDashboard,
  crm: renderCRM,
  inventory: renderInventory,
  orders: renderOrders,
  finance: renderFinance,
  files: renderFiles,
  team: renderTeam,
  chat: renderChat,
  map: renderMap,
  settings: renderSettings
};

function parseRoute(){
  const h = location.hash.replace(/^#\/?/, '');
  State.route = h || 'dashboard';
}

function setActive(){
  document.querySelectorAll('#nav a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('data-route') === State.route);
  });
}

export function render(){
  const fn = Views[State.route] || (() => '<div class="muted">Sidan saknas</div>');
  document.getElementById('app').innerHTML = fn();
  setActive();
}

import './ui_glue.js';
function boot(){
  initState().then(()=>{
    window.addEventListener('hashchange', ()=>{ parseRoute(); render(); });
    parseRoute(); render();
    // coach send
    document.getElementById('coachSend').addEventListener('click', ()=>{
      const v = document.getElementById('coachInput').value.trim();
      if(!v) return;
      document.getElementById('coachBody').textContent = `AI (mock): Jag förstår — "${v}".`;
      document.getElementById('coachInput').value='';
    });
    // theme/lang
    document.getElementById('themeSel').addEventListener('change', (e)=>{
      State.theme = e.target.value;
      document.body.style.background = State.theme==='dark' ? 'linear-gradient(180deg,#0f172a,#111827)' : 'linear-gradient(180deg,#f8fafc,#eef2ff)';
    });
    document.getElementById('langSel').addEventListener('change', (e)=>{
      State.lang = e.target.value;
      notify('Språk: '+State.lang);
    });
  });
}
boot();
