
import { State } from '../state.js';
import { el, clear } from '../utils/dom.js';

export const View = (root)=>{
  clear(root);
  const wrap = el('div',{});
  const bar = el('div',{className:'row', style:'justify-content:space-between;margin-bottom:12px'},
    el('div',{}, el('strong',{}, 'Produkter / Lager')),
    el('div',{}, el('button',{id:'addBtn', className:'primary'}, '➕ Lägg till produkt'))
  );
  wrap.append(bar);

  const addPanel = el('div',{id:'addPanel', className:'card', style:'display:none;gap:8px'},
    el('div',{}, el('input',{placeholder:'SKU', id:'p_sku'})),
    el('div',{}, el('input',{placeholder:'Namn', id:'p_name'})),
    el('div',{}, el('input',{placeholder:'Pris (SEK)', id:'p_price', type:'number'})),
    el('div',{}, el('input',{placeholder:'Moms (t.ex. 0.25)', id:'p_vat', type:'number', step:'0.01'})),
    el('div',{}, el('input',{placeholder:'Lager (antal)', id:'p_stock', type:'number'})),
    el('div',{}, el('button',{id:'saveP', className:'primary'}, 'Spara produkt'))
  );
  wrap.append(addPanel);

  const tbl = el('table',{}, 
    el('thead',{}, el('tr',{}, el('th',{},'SKU'), el('th',{},'Namn'), el('th',{},'Pris'), el('th',{},'Moms'), el('th',{},'Lager'))),
    el('tbody',{id:'pbody'})
  );
  wrap.append(tbl);

  const body = tbl.querySelector('#pbody');
  const render=()=>{
    body.innerHTML = '';
    State.products.forEach(p=>{
      body.append(el('tr',{}, el('td',{},p.sku), el('td',{},p.name), el('td',{},p.price+' kr'), el('td',{},(p.vat*100)+' %'), el('td',{},p.stock)));
    });
  };
  render();

  bar.querySelector('#addBtn').addEventListener('click', ()=> addPanel.style.display = (addPanel.style.display==='none'?'block':'none'));
  addPanel.querySelector('#saveP').addEventListener('click', ()=>{
    const p = {
      sku: document.querySelector('#p_sku').value || 'SKU-'+(100+State.products.length+1),
      name: document.querySelector('#p_name').value || 'Ny produkt',
      price: Number(document.querySelector('#p_price').value||0),
      vat: Number(document.querySelector('#p_vat').value||0.25),
      stock: Number(document.querySelector('#p_stock').value||0),
    };
    State.products.push(p);
    render();
    addPanel.style.display='none';
  });

  root.append(wrap);
};
