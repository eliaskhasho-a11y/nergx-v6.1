
import { State } from '../state.js';
import { el, clear } from '../utils/dom.js';

export const View = (root)=>{
  clear(root);
  const wrap = el('div',{});
  const bar = el('div',{className:'row', style:'justify-content:space-between;margin-bottom:12px'},
    el('div',{}, el('strong',{}, 'Kunder')), el('div',{}, el('button',{id:'addBtn', className:'primary'}, '➕ Lägg till kund'))
  );
  wrap.append(bar);

  const addPanel = el('div',{id:'addPanel', className:'card', style:'display:none;gap:8px'},
    el('div',{}, el('input',{placeholder:'Företag', id:'c_company'})),
    el('div',{}, el('input',{placeholder:'Kontakt', id:'c_contact'})),
    el('div',{}, el('input',{placeholder:'E-post', id:'c_email'})),
    el('div',{}, el('input',{placeholder:'Org.nr', id:'c_org'})),
    el('div',{}, el('input',{placeholder:'Stad', id:'c_city'})),
    el('div',{}, el('select',{id:'c_type'}, el('option',{value:'B2B'},'B2B'), el('option',{value:'B2C'},'B2C'))),
    el('div',{}, el('select',{id:'c_status'}, el('option',{value:'aktiv'},'aktiv'), el('option',{value:'ny'},'ny'))),
    el('div',{}, el('button',{id:'saveC', className:'primary'}, 'Spara kund'))
  );
  wrap.append(addPanel);

  const tbl = el('table',{}, 
    el('thead',{}, el('tr',{}, el('th',{},'ID'), el('th',{},'Företag'), el('th',{},'Kontakt'), el('th',{},'E-post'), el('th',{},'Org.nr'), el('th',{},'Stad'), el('th',{},'Typ'), el('th',{},'Status'))),
    el('tbody',{id:'cbody'})
  );
  wrap.append(tbl);

  const body = tbl.querySelector('#cbody');
  const render=()=>{
    body.innerHTML = '';
    State.customers.forEach(c=>{
      body.append(el('tr',{}, el('td',{},c.id), el('td',{},c.company), el('td',{},c.contact), el('td',{},c.email), el('td',{},c.org), el('td',{},c.city), el('td',{},c.type), el('td',{},c.status)));
    });
  };
  render();

  bar.querySelector('#addBtn').addEventListener('click', ()=> addPanel.style.display = (addPanel.style.display==='none'?'block':'none'));
  addPanel.querySelector('#saveC').addEventListener('click', ()=>{
    const id = 'C'+(1000+State.customers.length+1);
    const c = {
      id, company: document.querySelector('#c_company').value || 'Företag ' + id,
      contact: document.querySelector('#c_contact').value || '',
      email: document.querySelector('#c_email').value || '',
      org: document.querySelector('#c_org').value || '',
      city: document.querySelector('#c_city').value || '',
      type: document.querySelector('#c_type').value || 'B2B',
      status: document.querySelector('#c_status').value || 'aktiv'
    };
    State.customers.push(c);
    render();
    addPanel.style.display='none';
  });

  root.append(wrap);
};
