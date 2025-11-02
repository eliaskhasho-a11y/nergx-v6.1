
import { initRouter } from './router.js';
import { State, escapeHTML } from './state.js';

function openCmd(){ document.getElementById('cmdOverlay').classList.add('show'); document.getElementById('cmdInput').focus(); renderCmd(''); }
function hideCmd(){ document.getElementById('cmdOverlay').classList.remove('show'); }
function renderCmd(q){
  const data=[];
  ['dashboard','crm','inventory','economy','map','files','automation','academy','chat','settings'].forEach(r=>data.push({type:'Modul',label:r,action:()=>location.hash='#/'+r}));
  State.customers.forEach(c=>data.push({type:'Kund',label:c.name+' ('+c.city+')'}));
  State.files.forEach(f=>data.push({type:'Fil',label:f.name}));
  const list=data.filter(x=>x.label.toLowerCase().includes(q.toLowerCase()));
  const el=document.getElementById('cmdResults');
  el.innerHTML=list.map(x=>`<div class="item"><b>${escapeHTML(x.label)}</b><div class="muted">${x.type}</div></div>`).join('');
}
window.addEventListener('DOMContentLoaded',()=>{
  document.querySelector('.nav')?.addEventListener('click',(e)=>{const a=e.target.closest('a'); if(!a)return; e.preventDefault(); location.hash='#/'+a.dataset.route;});
  document.getElementById('openCmd')?.addEventListener('click',openCmd);
  document.addEventListener('keydown',(e)=>{ if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){ e.preventDefault(); openCmd(); }});
  document.getElementById('cmdOverlay')?.addEventListener('click',hideCmd);
  document.querySelector('.cmd')?.addEventListener('click',(e)=>e.stopPropagation());
  document.getElementById('cmdInput')?.addEventListener('input',(e)=>renderCmd(e.target.value));
  initRouter();
});
