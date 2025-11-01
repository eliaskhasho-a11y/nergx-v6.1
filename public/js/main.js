
import { $, $$ } from './utils/dom.js';
import { loadPrefs, savePrefs } from './utils/storage.js';
import { State } from './state.js';
import { route, mountNav } from './router.js';
import { coachInit } from './widgets/coach.js';
import { pushNotis, mountNotisUI } from './widgets/notify.js';

// prefs
const prefs = loadPrefs();
if(prefs.theme) document.body.setAttribute('data-theme', prefs.theme), State.theme=prefs.theme;
if(prefs.lang) State.lang=prefs.lang;
$('#themeSel').value = State.theme; $('#langSel').value = State.lang;
$('#themeSel').addEventListener('change', e=>{
  State.theme = e.target.value; document.body.setAttribute('data-theme', State.theme);
  savePrefs({ ...prefs, theme: State.theme });
});
$('#langSel').addEventListener('change', e=>{
  State.lang = e.target.value; savePrefs({ ...prefs, lang: State.lang });
});

window.addEventListener('hashchange', route);
mountNav(); route();

coachInit();
mountNotisUI();

// realtime mock
function tick(){
  State.kpi.revenue = Math.max(250000, State.kpi.revenue + Math.round((Math.random()-0.4)*1800));
  if(Math.random()<0.18) pushNotis('Ny order skapad #' + (Math.floor(Math.random()*9000)+1000));
}
setInterval(tick, 3000);

// topbar create order shortcut
$('#createOrderBtn').addEventListener('click', ()=>{
  location.hash = '#/orders';
  setTimeout(()=>{
    const btn = document.querySelector('#newOrder');
    if(btn) btn.click();
  }, 50);
});
