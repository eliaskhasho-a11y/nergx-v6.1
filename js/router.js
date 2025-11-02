
import { renderDashboard } from './views/dashboard.js';
import { renderCRM } from './views/crm.js';
import { renderInventory } from './views/inventory.js';
import { renderEconomy } from './views/economy.js';
import { renderMap } from './views/map.js';
import { renderFiles } from './views/files.js';
import { renderAutomation } from './views/automation.js';
import { renderAcademy } from './views/academy.js';
import { renderChat } from './views/chat.js';
import { renderSettings } from './views/settings.js';

export function route(hash){ location.hash = hash; }
export function setActiveNav(){ document.querySelectorAll('.nav a').forEach(a=>a.classList.toggle('active',('#/'+a.dataset.route)===location.hash)); }
export function renderRoute(){
  setActiveNav();
  const v=document.getElementById('view'); const h=location.hash||'#/dashboard';
  if(h==="#/dashboard") return renderDashboard(v);
  if(h==="#/crm") return renderCRM(v);
  if(h==="#/inventory") return renderInventory(v);
  if(h==="#/economy") return renderEconomy(v);
  if(h==="#/map") return renderMap(v);
  if(h==="#/files") return renderFiles(v);
  if(h==="#/automation") return renderAutomation(v);
  if(h==="#/academy") return renderAcademy(v);
  if(h==="#/chat") return renderChat(v);
  if(h==="#/settings") return renderSettings(v);
  v.innerHTML='<div class="card"><h3>Sidan finns inte</h3></div>';
}
export function initRouter(){ window.addEventListener('hashchange',renderRoute); if(!location.hash){ route('#/dashboard'); } setTimeout(renderRoute,0); }
