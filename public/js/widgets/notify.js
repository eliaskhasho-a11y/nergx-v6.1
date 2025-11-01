
import { $, el } from '../utils/dom.js';
import { dt } from '../utils/format.js';
export const pushNotis = (txt)=>{
  const list = JSON.parse(localStorage.getItem('mergx_notis')||'[]');
  list.unshift({txt, ts: Date.now()});
  localStorage.setItem('mergx_notis', JSON.stringify(list.slice(0,20)));
  const n=$('#toast'); n.textContent=txt; n.classList.add('show');
  setTimeout(()=>n.classList.remove('show'), 2200);
};
export const mountNotisUI = ()=>{
  const bell = $('#notisBell'); const panel = $('#notisPanel');
  const render=()=>{
    const list = JSON.parse(localStorage.getItem('mergx_notis')||'[]');
    panel.innerHTML = '<strong>Notiser</strong><hr style="opacity:.1">';
    list.slice(0,8).forEach(n=>{
      panel.append(el('div',{className:'notisItem'}, n.txt, ' ', el('small',{style:'opacity:.6'}, '• '+new Date(n.ts).toLocaleTimeString())));
    });
  };
  bell.addEventListener('click',()=>{
    if(panel.style.display==='block'){ panel.style.display='none'; }
    else { render(); panel.style.display='block'; }
  });
  document.addEventListener('click', (e)=>{
    if(!panel.contains(e.target) && e.target!==bell) panel.style.display='none';
  });
};
