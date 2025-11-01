
import { el, clear } from '../utils/dom.js';

export const View = (root)=>{
  clear(root);
  const wrap = el('div',{});
  const bar = el('div',{className:'row', style:'justify-content:space-between;margin-bottom:12px'},
    el('div',{}, el('strong',{}, 'Filer / Kvitton')),
    el('div',{}, el('button',{id:'upload', className:'primary'}, 'Ladda upp'))
  );
  wrap.append(bar);

  const lib = el('div',{className:'card', id:'lib'}, 'Inga filer ännu (mock).');
  wrap.append(lib);

  bar.querySelector('#upload').addEventListener('click', ()=>{
    lib.textContent = '1 fil uppladdad (mock) – “kvitto_2025-11-01.jpg”.';
  });

  root.append(wrap);
};
