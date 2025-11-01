
import { State } from '../state.js';
import { el, clear } from '../utils/dom.js';
import { money } from '../utils/format.js';

function calcTotal(lines){
  let net=0, vat=0;
  lines.forEach(l=>{ const row = l.qty*l.price; net+=row; vat+= row*l.vat; });
  return { net, vat, total: net+vat };
}

export const View = (root)=>{
  clear(root);
  const wrap = el('div',{});
  const head = el('div',{className:'row', style:'justify-content:space-between;margin-bottom:12px'},
    el('div',{}, el('strong',{}, 'Order / Faktura')),
    el('div',{}, el('button',{id:'newOrder', className:'primary'}, '➕ Skapa order'))
  );
  wrap.append(head);

  const list = el('div',{className:'card', id:'orderList'}, 'Inga ordrar ännu.');
  wrap.append(list);

  const form = el('div',{className:'card', id:'orderForm', style:'display:none;gap:10px'});
  form.append(
    el('div',{}, el('strong',{}, 'Ny order')),
    el('div',{}, 'Kund: ', (()=>{
      const s = el('select',{id:'ordCustomer'});
      State.customers.forEach(c=> s.append(el('option',{value:c.id}, c.company)));
      return s;
    })()),
    el('div',{}, 'Artiklar: ', (()=>{
      const holder = el('div',{id:'lines'});
      const addLine = ()=>{
        const row = el('div',{className:'row', style:'gap:8px'},
          (()=>{const s=el('select',{className:'sku'}); State.products.forEach(p=> s.append(el('option',{value:p.sku}, p.name))); return s;})(),
          el('input',{className:'qty', type:'number', min:'1', value:'1', style:'width:80px'}),
          el('input',{className:'price', type:'number', min:'0', value:'100', style:'width:110px'}),
          el('input',{className:'vat', type:'number', min:'0', step:'0.01', value:'0.25', style:'width:90px'}),
        );
        holder.append(row);
      };
      addLine();
      const wrap = el('div',{}, holder, el('button',{className:'primary', id:'addLineBtn', style:'margin-top:6px'}, 'Lägg till rad'));
      wrap.querySelector('#addLineBtn').addEventListener('click', addLine);
      return wrap;
    })()),
    el('div',{}, 'Betalvillkor (dagar): ', el('input',{id:'terms', type:'number', min:'0', value:'30', style:'width:90px'})),
    el('div',{}, el('button',{id:'genInvoice', className:'primary'}, 'Generera faktura'))
  );
  wrap.append(form);

  head.querySelector('#newOrder').addEventListener('click', ()=>{
    form.style.display = (form.style.display==='none'?'block':'none');
  });

  form.querySelector('#genInvoice').addEventListener('click', ()=>{
    const cid = form.querySelector('#ordCustomer').value;
    const linesEls = form.querySelectorAll('#lines .row');
    const lines = Array.from(linesEls).map(row=>{
      const sku = row.querySelector('.sku').value;
      const qty = Number(row.querySelector('.qty').value||1);
      const price = Number(row.querySelector('.price').value||0);
      const vat = Number(row.querySelector('.vat').value||0.25);
      return { sku, qty, price, vat };
    });
    const tot = calcTotal(lines);
    const id = 'INV-'+String(1000+State.orders.length+1);
    const ord = { id, cid, lines, tot, terms: Number(form.querySelector('#terms').value||30), date: new Date().toISOString().slice(0,10) };
    State.orders.unshift(ord);
    renderList();
    form.style.display='none';
  });

  function renderList(){
    if(State.orders.length===0){ list.textContent='Inga ordrar ännu.'; return; }
    list.innerHTML='';
    State.orders.forEach(o=>{
      const cust = State.customers.find(c=>c.id===o.cid);
      const card = el('div',{className:'card', style:'margin-bottom:10px'},
        el('div',{className:'row', style:'justify-content:space-between'},
          el('div',{}, el('strong',{}, o.id), ' • ', cust?cust.company:o.cid, ' • ', o.date),
          el('div',{}, money(o.tot.total))
        ),
        el('div',{style:'margin-top:8px'}, 'Rader: ', o.lines.length, ' • Villkor: ', o.terms, ' dagar'),
        el('div',{style:'margin-top:8px;background:var(--glass);padding:10px;border-radius:10px'},
          el('div',{}, el('strong',{}, 'Faktura (mock-översikt)')),
          el('div',{}, 'Netto: ', money(o.tot.net), ' • Moms: ', money(o.tot.vat), ' • Totalt: ', money(o.tot.total))
        )
      );
      list.append(card);
    });
  }
  renderList();

  root.append(wrap);
};
