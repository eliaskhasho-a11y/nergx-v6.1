
const SEK = new Intl.NumberFormat('sv-SE',{style:'currency',currency:'SEK'});
const fmtSEK = v => SEK.format(v);
const uuidv4 = () => (crypto.randomUUID ? crypto.randomUUID() :
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{
    const r = Math.random()*16|0, v = c==='x'? r : (r&0x3|0x8); return v.toString(16);
  }));
function toast(msg,type='',actionLabel='',actionCb=null){
  const wrap = document.getElementById('toasts'); const el = document.createElement('div'); el.className = 'toast '+type;
  const span = document.createElement('span'); span.textContent = msg; el.appendChild(span);
  if(actionLabel && actionCb){ const btn = document.createElement('button'); btn.textContent = actionLabel; btn.onclick = ()=>{ actionCb(); el.remove(); }; el.appendChild(btn); }
  wrap.appendChild(el); setTimeout(()=>el.remove(), 4200);
}
function notis(msg){ const li = document.createElement('li'); li.textContent = msg; document.getElementById('noticeList').prepend(li); }

let DB = {
  customers: [
    { id: uuidv4(), code:'C1001', name: 'Nordic AB', orgnr:'556677-8899', contact:'Eva Berg', email:'eva@nordic.se', phone:'+46 70 123 45 67', city:'Stockholm' },
    { id: uuidv4(), code:'C1002', name: 'Stock Wireless', orgnr:'559900-1122', contact:'Jonas Ek', email:'sales@stockwireless.se', phone:'+46 73 555 66 77', city:'Stockholm' },
    { id: uuidv4(), code:'C1003', name: 'Elon Ljud & Bild', orgnr:'556000-0001', contact:'Butikschef', email:'info@elonlb.se', phone:'+46 8 111 22 33', city:'Västerås' },
    { id: uuidv4(), code:'C1004', name: 'Tammerbrands', orgnr:'556100-1234', contact:'Inköp', email:'buy@tammerbrands.fi', phone:'+358 50 123 45', city:'Tampere' },
  ],
  products: [
    { id: uuidv4(), sku:'A-STICK-CC60', name:'USB‑C till USB‑C 60W', price:149, stock:73 },
    { id: uuidv4(), sku:'CAR-CHG-60W', name:'Bil‑laddare 60W (2‑port)', price:199, stock:4 },
    { id: uuidv4(), sku:'LIGHT-27W', name:'USB‑C till Lightning 27W', price:179, stock:12 },
    { id: uuidv4(), sku:'A-USB-A-C36', name:'USB‑A till USB‑C 36W', price:129, stock:38 },
  ],
  orders: [
    { id: uuidv4(), no:'O-230015', customer:'Nordic AB', status:'Packas', total:34200, due:'30 dagar' },
    { id: uuidv4(), no:'O-230016', customer:'Stock Wireless', status:'Skapad', total:12890, due:'14 dagar' },
  ],
  employees: [
    { id: uuidv4(), code:'E-01', name:'Jesper Karlsson', role:'Sälj', email:'jesper@mergx.se' },
    { id: uuidv4(), code:'E-02', name:'Lea Nguyen', role:'Lager', email:'lea@mergx.se' },
  ],
  files: []
};
let lastDeleted = null;

const routes = {
  '/dashboard': dashboardView,
  '/crm': crmView,
  '/inventory': inventoryView,
  '/orders': ordersView,
  '/employees': employeesView,
  '/files': filesView,
  '/ai-map': aiMapView,
  '/automation': automationView,
  '/chat': chatView,
  '/settings': settingsView,
};
function resolveRoute(){ const raw = location.hash.slice(1)||'/dashboard'; const r = raw.split('?')[0]; return routes[r]? r : '/dashboard'; }
function setActiveLink(route){ document.querySelectorAll('[data-route]').forEach(a=> a.classList.toggle('active', a.getAttribute('href') === '#'+route)); }
const safeRender = (()=>{ let t; return ()=>{ clearTimeout(t); t=setTimeout(()=>{
  const app = document.getElementById('app');
  if(!app) return;
  const route = resolveRoute();
  setActiveLink(route);
  app.innerHTML = '<div class="loading">Laddar…</div>';
  setTimeout(()=>routes[route](app), 0);
}, 20);} })();
addEventListener('hashchange', safeRender);
addEventListener('DOMContentLoaded', ()=>{ if(!location.hash) location.hash = '#/dashboard'; initDock(); safeRender(); });

function makeSortable(table, data, columns){
  let dir = 1; let lastKey = '';
  columns.forEach((c)=>{
    const th = table.querySelector(c.selector);
    if(!th) return;
    th.addEventListener('click', ()=>{
      const key = c.key;
      dir = (lastKey===key)? -dir : 1;
      lastKey = key;
      data.sort((a,b)=> (a[key] > b[key] ? dir : a[key] < b[key] ? -dir : 0));
      routes[resolveRoute()](document.getElementById('app'));
    });
  });
}
function inlineEdit(td, value, onSave){
  const input = document.createElement('input');
  input.value = value ?? '';
  input.className = 'inline-edit';
  const prev = td.textContent;
  td.textContent='';
  td.appendChild(input);
  input.focus();
  const end = (save)=>{
    const v = input.value.trim();
    td.removeChild(input);
    if(save){ onSave(v); td.textContent = v; td.classList.add('saved'); setTimeout(()=>td.classList.remove('saved'),500); }
    else{ td.textContent = prev; }
  };
  input.addEventListener('keydown', e=>{
    if(e.key==='Enter'){ end(true); }
    if(e.key==='Escape'){ end(false); }
  });
  input.addEventListener('blur', ()=> end(true));
}
function withUndo(type, item){
  lastDeleted = { type, item };
  toast('Borttagen.','warn','Ångra', ()=>{
    DB[type].push(item);
    routes[resolveRoute()](document.getElementById('app'));
    toast('Återställd.','ok');
  });
}

function dashboardView(el){
  el.innerHTML = `
    <h1>Översikt <span class="badge small">v8.9 Online</span></h1>
    <section class="kpis">
      <div class="kpi"><div>Omsättning idag</div><div class="v mono">324 500 kr</div><div class="muted">+12 % mot igår</div></div>
      <div class="kpi"><div>Order idag</div><div class="v mono">${DB.orders.length}</div><div class="muted">3 stora B2B</div></div>
      <div class="kpi"><div>Artiklar i brist</div><div class="v mono">${DB.products.filter(p=>p.stock<10).length}</div><div class="muted">under 10 i lager</div></div>
    </section>
    <div class="grid" style="margin-top:12px">
      <div class="card"><h3>Ekonomi — graf</h3><canvas id="ecoChart" height="120"></canvas></div>
      <div class="card"><h3>Schema (dag)</h3>
        <ul class="list"><li>09:00 Orderplock (Jesper)</li><li>11:00 Kundmöte — Nordic</li><li>14:00 Inventarie (Lea)</li></ul>
      </div>
      <div class="card"><h3>Lager — brist/inköp</h3>
        <ul class="list"><li><strong>CAR‑CHG‑60W</strong> – brist (4 kvar)</li><li><strong>LIGHT‑27W</strong> – låg nivå (12)</li></ul>
      </div>
    </div>
  `;
  const ctx = document.getElementById('ecoChart');
  if (window.Chart && ctx){
    new Chart(ctx, {type:'bar', data:{
      labels:['Mån','Tis','Ons','Tor','Fre','Lör','Sön'],
      datasets:[
        {label:'Omsättning', backgroundColor:'#3b82f6', data:[320,410,380,450,520,300,260]},
        {label:'Kostnader', backgroundColor:'#22c55e', data:[210,240,230,250,270,200,180]},
        {label:'GM%', type:'line', borderColor:'#8b5cf6', backgroundColor:'transparent', data:[34,36,35,38,40,33,32]}
      ]
    }, options:{plugins:{legend:{display:false}}, responsive:true, maintainAspectRatio:false}});
  }
}

function crmView(el){
  const rows = DB.customers;
  const cities = [...new Set(rows.map(r=>r.city))];
  el.innerHTML = `
    <h1>Kunder</h1>
    <div class="card">
      <div class="toolbar">
        <input type="search" id="custSearch" placeholder="Sök kund, kontakt, stad…" value="${sessionStorage.getItem('custFilter')||''}">
        <span class="badge">${rows.length} kunder</span>
        <div class="actions"><button class="btn" id="addCust">Lägg till kund</button></div>
      </div>
      <div class="chips" id="custChips">
        ${cities.map(c=>`<div class="chip" data-city="${c}">${c}</div>`).join('')}
        <div class="chip" data-city="">Alla</div>
      </div>
      <table class="table" id="custTable" style="margin-top:10px">
        <thead><tr><th>ID</th><th>Företag</th><th>Kontakt</th><th>Email</th><th>Telefon</th><th>Stad</th><th></th></tr></thead>
        <tbody id="custRows"></tbody>
      </table>
    </div>
    <div class="card" id="custFormCard" style="display:none">
      <h3 id="custFormTitle">Ny kund</h3>
      <div class="form">
        <div class="full"><label>Företag</label><input id="c_name" required></div>
        <div><label>Org.nr</label><input id="c_org"></div>
        <div><label>Kontakt</label><input id="c_contact"></div>
        <div><label>Email</label><input id="c_email" type="email"></div>
        <div><label>Telefon</label><input id="c_phone"></div>
        <div><label>Stad</label><input id="c_city"></div>
      </div>
      <div class="actions">
        <button class="btn ok" id="saveCust">Spara</button>
        <button class="btn ghost" id="cancelCust">Avbryt</button>
      </div>
    </div>
  `;
  const tbody = document.getElementById('custRows');
  const search = document.getElementById('custSearch');
  const chips = document.getElementById('custChips');
  let chipCity = sessionStorage.getItem('custChipCity')||'';
  if(chipCity){
    const active = chips.querySelector(`[data-city="${chipCity}"]`); if(active) active.classList.add('active');
  }
  function filteredData(filter='', city=''){
    const f = filter.toLowerCase();
    return rows.filter(r => {
      const okCity = city? r.city===city : true;
      return okCity && [r.code,r.name,r.contact,r.email,r.phone,r.city].join(' ').toLowerCase().includes(f);
    });
  }
  function renderRows(){
    const data = filteredData(search.value, chipCity);
    tbody.innerHTML = data.map(r=>`
      <tr data-id="${r.id}">
        <td>${r.code}</td>
        <td class="cell-edit" data-key="name">${r.name}</td>
        <td class="cell-edit" data-key="contact">${r.contact||''}</td>
        <td class="cell-edit" data-key="email">${r.email||''}</td>
        <td class="cell-edit" data-key="phone">${r.phone||''}</td>
        <td class="cell-edit" data-key="city">${r.city||''}</td>
        <td class="row-actions">
          <button class="btn ghost" data-edit>Redigera</button>
          <button class="btn bad" data-del>Ta bort</button>
        </td>
      </tr>`).join('');
  }
  renderRows();
  search.addEventListener('input', e=>{ sessionStorage.setItem('custFilter', e.target.value); renderRows(); });
  chips.addEventListener('click', e=>{
    const chip = e.target.closest('.chip'); if(!chip) return;
    chips.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
    chipCity = chip.getAttribute('data-city')||'';
    sessionStorage.setItem('custChipCity', chipCity);
    renderRows();
  });
  function makeSortableLocal(){
    let dir=1,last=''; const table=document.getElementById('custTable');
    [['th:nth-child(2)','name'],['th:nth-child(6)','city']].forEach(([sel,key])=>{
      const th = table.querySelector(sel); if(!th) return;
      th.onclick = ()=>{ dir = (last===key)? -dir : 1; last=key; DB.customers.sort((a,b)=> a[key]>b[key]?dir:a[key]<b[key]?-dir:0 ); crmView(document.getElementById('app')); };
    });
  }
  makeSortableLocal();
  tbody.addEventListener('dblclick', e=>{
    const td = e.target.closest('.cell-edit'); if(!td) return;
    const tr = td.closest('tr'); const id = tr.getAttribute('data-id');
    const key = td.getAttribute('data-key'); const obj = DB.customers.find(x=>x.id===id);
    inlineEdit(td, obj[key]||'', (v)=>{ obj[key]=v; toast('Uppdaterat', 'ok'); });
  });
  tbody.addEventListener('click', e=>{
    const tr = e.target.closest('tr'); if(!tr) return;
    const id = tr.getAttribute('data-id');
    const obj = DB.customers.find(x=>x.id===id);
    if(e.target.hasAttribute('data-edit')){
      document.getElementById('custFormTitle').textContent = 'Redigera kund';
      ['c_name','c_org','c_contact','c_email','c_phone','c_city'].forEach(idf=>{
        const map = {c_name:'name',c_org:'orgnr',c_contact:'contact',c_email:'email',c_phone:'phone',c_city:'city'};
        document.getElementById(idf).value = obj[map[idf]]||'';
      });
      document.getElementById('custFormCard').style.display='block';
      document.getElementById('saveCust').onclick = ()=>{
        obj.name = document.getElementById('c_name').value.trim();
        obj.orgnr = document.getElementById('c_org').value.trim();
        obj.contact = document.getElementById('c_contact').value.trim();
        obj.email = document.getElementById('c_email').value.trim();
        obj.phone = document.getElementById('c_phone').value.trim();
        obj.city = document.getElementById('c_city').value.trim();
        document.getElementById('custFormCard').style.display='none'; renderRows(); toast('Kund uppdaterad','ok');
      };
    }
    if(e.target.hasAttribute('data-del')){
      if(confirm('Ta bort kund?')){
        const i = DB.customers.findIndex(x=>x.id===id);
        const removed = DB.customers.splice(i,1)[0];
        lastDeleted = {type:'customers', item: removed};
        toast('Borttagen.','warn','Ångra', ()=>{ DB.customers.push(removed); crmView(document.getElementById('app')); });
        renderRows();
      }
    }
  });
  document.getElementById('addCust').onclick = ()=>{
    document.getElementById('custFormTitle').textContent = 'Ny kund';
    ['c_name','c_org','c_contact','c_email','c_phone','c_city'].forEach(idf=>document.getElementById(idf).value='');
    document.getElementById('custFormCard').style.display='block';
    document.getElementById('saveCust').onclick = ()=>{
      const name = document.getElementById('c_name').value.trim();
      if(!name){ toast('Företagsnamn krävs','bad'); return; }
      DB.customers.push({
        id: uuidv4(), code:'C'+(1000+DB.customers.length+1),
        name, orgnr:document.getElementById('c_org').value.trim(),
        contact:document.getElementById('c_contact').value.trim(),
        email:document.getElementById('c_email').value.trim(),
        phone:document.getElementById('c_phone').value.trim(),
        city:document.getElementById('c_city').value.trim()
      });
      document.getElementById('custFormCard').style.display='none'; renderRows(); toast('Kund skapad','ok');
    };
  };
}

function inventoryView(el){
  const rows = DB.products;
  el.innerHTML = `
    <h1>Inventarie</h1>
    <div class="card">
      <div class="toolbar">
        <input type="search" id="prodSearch" placeholder="Sök SKU, namn…" value="${sessionStorage.getItem('prodFilter')||''}">
        <span class="badge">${rows.length} artiklar</span>
        <div class="actions"><button class="btn" id="addProd">Lägg till produkt</button></div>
      </div>
      <div class="chips" id="prodChips">
        <div class="chip" data-q="low">Lågt lager (&lt;10)</div>
        <div class="chip" data-q="highprice">Högt pris (&gt;=180)</div>
        <div class="chip" data-q="">Alla</div>
      </div>
      <table class="table" id="prodTable" style="margin-top:10px">
        <thead><tr><th>SKU</th><th>Namn</th><th>Pris</th><th>Lagersaldo</th><th></th></tr></thead>
        <tbody id="prodRows"></tbody>
      </table>
    </div>
    <div class="card" id="prodFormCard" style="display:none">
      <h3 id="prodFormTitle">Ny produkt</h3>
      <div class="form">
        <div><label>SKU</label><input id="p_sku" required></div>
        <div class="full"><label>Produktnamn</label><input id="p_name" required></div>
        <div><label>Pris (SEK)</label><input id="p_price" type="number" min="0" step="0.01"></div>
        <div><label>Lagersaldo</label><input id="p_stock" type="number" min="0" step="1"></div>
      </div>
      <div class="actions"><button class="btn ok" id="saveProd">Spara</button><button class="btn ghost" id="cancelProd">Avbryt</button></div>
    </div>
  `;
  const tbody = document.getElementById('prodRows');
  const search = document.getElementById('prodSearch');
  const chips = document.getElementById('prodChips');
  let q = sessionStorage.getItem('prodChip')||'';
  if(q){ const active = chips.querySelector(`[data-q="${q}"]`); if(active) active.classList.add('active'); }
  function filteredData(){
    const f = (search.value||'').toLowerCase();
    return DB.products.filter(r=>{
      const text = [r.sku,r.name,String(r.price),String(r.stock)].join(' ').toLowerCase().includes(f);
      const low = (q==='low') ? r.stock<10 : true;
      const hp = (q==='highprice') ? r.price>=180 : true;
      return text && low && hp;
    });
  }
  function renderRows(){
    const data = filteredData();
    tbody.innerHTML = data.map(r=>`
      <tr data-id="${r.id}">
        <td class="cell-edit" data-key="sku">${r.sku}</td>
        <td class="cell-edit" data-key="name">${r.name}</td>
        <td class="cell-edit" data-key="price">${r.price}</td>
        <td class="cell-edit" data-key="stock">${r.stock}</td>
        <td class="row-actions">
          <button class="btn ghost" data-edit>Redigera</button>
          <button class="btn bad" data-del>Ta bort</button>
        </td>
      </tr>`).join('');
  }
  renderRows();
  search.addEventListener('input', e=>{ sessionStorage.setItem('prodFilter', e.target.value); renderRows(); });
  chips.addEventListener('click', e=>{
    const chip = e.target.closest('.chip'); if(!chip) return;
    chips.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
    chip.classList.add('active'); q = chip.getAttribute('data-q')||'';
    sessionStorage.setItem('prodChip', q); renderRows();
  });
  function makeSortableLocal(){
    let dir=1,last=''; const table=document.getElementById('prodTable');
    [['th:nth-child(1)','sku'],['th:nth-child(2)','name'],['th:nth-child(3)','price'],['th:nth-child(4)','stock']].forEach(([sel,key])=>{
      const th = table.querySelector(sel); if(!th) return;
      th.onclick = ()=>{ dir = (last===key)? -dir : 1; last=key; DB.products.sort((a,b)=> a[key]>b[key]?dir:a[key]<b[key]?-dir:0 ); inventoryView(document.getElementById('app')); };
    });
  }
  makeSortableLocal();
  tbody.addEventListener('dblclick', e=>{
    const td = e.target.closest('.cell-edit'); if(!td) return;
    const tr = td.closest('tr'); const id = tr.getAttribute('data-id');
    const key = td.getAttribute('data-key'); const obj = DB.products.find(x=>x.id===id);
    const saver = (v)=>{
      let val = v;
      if(key==='price'){ val = parseFloat(v); if(Number.isNaN(val)||val<0){ toast('Ogiltigt pris','warn'); return; } }
      if(key==='stock'){ val = parseInt(v,10); if(Number.isNaN(val)||val<0){ toast('Ogiltigt lager','warn'); return; } }
      obj[key]=val; toast('Produkt uppdaterad','ok');
    };
    inlineEdit(td, obj[key]??'', saver);
  });
  tbody.addEventListener('click', e=>{
    const tr = e.target.closest('tr'); if(!tr) return;
    const id = tr.getAttribute('data-id');
    const obj = DB.products.find(x=>x.id===id);
    if(e.target.hasAttribute('data-edit')){
      document.getElementById('prodFormTitle').textContent='Redigera produkt';
      ['p_sku','p_name','p_price','p_stock'].forEach(idf=>{
        const map = {p_sku:'sku',p_name:'name',p_price:'price',p_stock:'stock'};
        document.getElementById(idf).value = obj[map[idf]] ?? '';
      });
      document.getElementById('prodFormCard').style.display='block';
      document.getElementById('saveProd').onclick = ()=>{
        obj.sku = document.getElementById('p_sku').value.trim();
        obj.name = document.getElementById('p_name').value.trim();
        obj.price = parseFloat(document.getElementById('p_price').value||'0');
        obj.stock = parseInt(document.getElementById('p_stock').value||'0',10);
        document.getElementById('prodFormCard').style.display='none'; renderRows(); toast('Produkt uppdaterad','ok');
      };
    }
    if(e.target.hasAttribute('data-del')){
      if(confirm('Ta bort produkt?')){
        const i = DB.products.findIndex(x=>x.id===id);
        const removed = DB.products.splice(i,1)[0];
        toast('Borttagen.','warn','Ångra', ()=>{ DB.products.push(removed); inventoryView(document.getElementById('app')); });
        renderRows();
      }
    }
  });
  document.getElementById('addProd').onclick = ()=>{
    ['p_sku','p_name','p_price','p_stock'].forEach(idf=>document.getElementById(idf).value='');
    document.getElementById('prodFormCard').style.display='block';
    document.getElementById('saveProd').onclick = ()=>{
      const sku = document.getElementById('p_sku').value.trim();
      const name = document.getElementById('p_name').value.trim();
      let price = parseFloat(document.getElementById('p_price').value||'0');
      let stock = parseInt(document.getElementById('p_stock').value||'0',10);
      if(!sku || !name){ toast('SKU och namn krävs','bad'); return; }
      if(Number.isNaN(price)||price<0){ toast('Ogiltigt pris','warn'); return; }
      if(Number.isNaN(stock)||stock<0){ toast('Ogiltigt lager','warn'); return; }
      DB.products.push({ id:uuidv4(), sku,name,price,stock });
      document.getElementById('prodFormCard').style.display='none'; renderRows(); toast('Produkt skapad','ok');
    };
  };
}

function ordersView(el){
  el.innerHTML = `
    <h1>Order & Faktura</h1>
    <div class="card">
      <div class="actions"><button class="btn" id="newOrder">Skapa order</button></div>
      <table class="table" id="orderTable" style="margin-top:10px">
        <thead><tr><th data-k="no">Ordernr</th><th data-k="customer">Kund</th><th data-k="status">Status</th><th data-k="total">Total</th><th data-k="due">Betalvillkor</th></tr></thead>
        <tbody id="orderRows">${DB.orders.map(o=>`<tr><td>${o.no}</td><td>${o.customer}</td><td>${o.status}</td><td>${fmtSEK(o.total)}</td><td>${o.due}</td></tr>`).join('')}</tbody>
      </table>
    </div>
    <div class="card" id="orderFormCard" style="display:none">
      <h3>Ny order</h3>
      <div class="form" id="orderForm">
        <div><label>Kund</label><select id="o_customer">${DB.customers.map(c=>`<option>${c.name}</option>`).join('')}</select></div>
        <div><label>Betalvillkor</label><select id="o_due"><option>14 dagar</option><option>30 dagar</option><option>60 dagar</option></select></div>
        <div class="full"><label>Rader</label><div id="lines"></div></div>
        <div class="actions"><button class="btn ghost" id="addLine">+ Lägg rad</button></div>
      </div>
      <div class="actions"><button class="btn ok" id="saveOrder">Skapa order (mock)</button><button class="btn ghost" id="cancelOrder">Avbryt</button></div>
    </div>
  `;
  const lines = document.getElementById('lines');
  const addLine = ()=>{
    const row = document.createElement('div');
    row.className = 'form'; row.style.gridTemplateColumns='2fr 1fr 1fr';
    row.innerHTML = `
      <div><select class="ln_prod">${DB.products.map(p=>`<option value="${p.sku}" data-price="${p.price}">${p.sku} — ${p.name}</option>`).join('')}</select></div>
      <div><input class="ln_qty" type="number" value="1" min="1"></div>
      <div><input class="ln_total" disabled placeholder="Rad-summa"></div>
    `;
    lines.appendChild(row); updateRowTotal(row);
    row.querySelector('.ln_prod').addEventListener('change', ()=>updateRowTotal(row));
    row.querySelector('.ln_qty').addEventListener('input', ()=>updateRowTotal(row));
  };
  function updateRowTotal(row){
    const sel = row.querySelector('.ln_prod');
    const qty = parseInt(row.querySelector('.ln_qty').value||'1',10);
    const price = parseFloat(sel.selectedOptions[0].getAttribute('data-price'));
    row.querySelector('.ln_total').value = fmtSEK(price*qty);
  }
  document.getElementById('newOrder').onclick = ()=>{ document.getElementById('orderFormCard').style.display='block'; if(!lines.children.length) addLine(); };
  document.getElementById('addLine').onclick = (e)=>{ e.preventDefault(); addLine(); };
  document.getElementById('cancelOrder').onclick = ()=> document.getElementById('orderFormCard').style.display='none';
  document.getElementById('saveOrder').onclick = ()=>{
    let total = 0;
    Array.from(lines.children).forEach(row=>{
      const sel = row.querySelector('.ln_prod');
      const qty = parseInt(row.querySelector('.ln_qty').value||'1',10);
      const price = parseFloat(sel.selectedOptions[0].getAttribute('data-price'));
      total += price*qty;
    });
    const cust = document.getElementById('o_customer').value;
    DB.orders.push({ id:uuidv4(), no:'O-'+(230016+DB.orders.length), customer:cust, status:'Skapad', total, due:document.getElementById('o_due').value });
    document.getElementById('orderRows').innerHTML = DB.orders.map(o=>`<tr><td>${o.no}</td><td>${o.customer}</td><td>${o.status}</td><td>${fmtSEK(o.total)}</td><td>${o.due}</td></tr>`).join('');
    document.getElementById('orderFormCard').style.display='none';
    notis('Order skapad — PDF‑faktura mock genererad');
  };
  const head = document.querySelector('#orderTable thead');
  head.addEventListener('click', (e)=>{
    const th = e.target.closest('th'); if(!th) return;
    const key = th.getAttribute('data-k'); if(!key) return;
    const dir = th.dataset.dir === 'asc' ? 'desc' : 'asc';
    head.querySelectorAll('th').forEach(x=>x.removeAttribute('data-dir'));
    th.dataset.dir = dir;
    const m = dir==='asc'? 1 : -1;
    DB.orders.sort((a,b)=> (a[key] > b[key] ? m : a[key] < b[key] ? -m : 0));
    ordersView(document.getElementById('app'));
  });
}

function employeesView(el){
  const rows = DB.employees;
  el.innerHTML = `
    <h1>Anställda</h1>
    <div class="card">
      <div class="actions"><button class="btn" id="addEmp">Lägg till anställd</button></div>
      <table class="table" id="empTable" style="margin-top:10px">
        <thead><tr><th data-k="code">ID</th><th data-k="name">Namn</th><th data-k="role">Roll</th><th data-k="email">Email</th><th></th></tr></thead>
        <tbody id="empRows"></tbody>
      </table>
    </div>
    <div class="card" id="empFormCard" style="display:none">
      <h3 id="empFormTitle">Ny anställd</h3>
      <div class="form">
        <div><label>Namn</label><input id="e_name" required></div>
        <div><label>Roll</label><input id="e_role" required></div>
        <div class="full"><label>Email</label><input id="e_email" type="email" required></div>
      </div>
      <div class="actions"><button class="btn ok" id="saveEmp">Spara</button><button class="btn ghost" id="cancelEmp">Avbryt</button></div>
    </div>
  `;
  const tbody = document.getElementById('empRows');
  let editId=null;
  function renderRows(){ tbody.innerHTML = rows.map(r=>`
    <tr data-id="${r.id}">
      <td>${r.code}</td><td class="cell-edit" data-key="name">${r.name}</td><td class="cell-edit" data-key="role">${r.role}</td><td class="cell-edit" data-key="email">${r.email}</td>
      <td class="row-actions"><button class="btn ghost" data-edit>Redigera</button><button class="btn bad" data-del>Ta bort</button></td>
    </tr>`).join(''); }
  renderRows();
  const head = document.querySelector('#empTable thead');
  head.addEventListener('click', (e)=>{
    const th = e.target.closest('th'); if(!th) return;
    const key = th.getAttribute('data-k'); if(!key) return;
    const dir = th.dataset.dir === 'asc' ? 'desc' : 'asc';
    head.querySelectorAll('th').forEach(x=>x.removeAttribute('data-dir'));
    th.dataset.dir = dir;
    const m = dir==='asc'? 1 : -1;
    rows.sort((a,b)=> (a[key] > b[key] ? m : a[key] < b[key] ? -m : 0));
    renderRows();
  });
  tbody.addEventListener('dblclick', e=>{
    const td = e.target.closest('.cell-edit'); if(!td) return;
    const tr = td.closest('tr'); const id = tr.getAttribute('data-id');
    const key = td.getAttribute('data-key'); const obj = rows.find(x=>x.id===id);
    inlineEdit(td, obj[key]||'', (v)=>{ obj[key]=v; toast('Uppdaterat','ok'); });
  });
  tbody.addEventListener('click', e=>{
    const tr = e.target.closest('tr'); if(!tr) return;
    const id = tr.getAttribute('data-id');
    const obj = rows.find(x=>x.id===id);
    if(e.target.hasAttribute('data-edit')){
      editId=id;
      document.getElementById('empFormTitle').textContent='Redigera anställd';
      ['e_name','e_role','e_email'].forEach(idf=>{
        const map = {e_name:'name',e_role:'role',e_email:'email'};
        document.getElementById(idf).value = obj[map[idf]]||'';
      });
      document.getElementById('empFormCard').style.display='block';
    }
    if(e.target.hasAttribute('data-del')){
      if(confirm('Ta bort anställd?')){
        const i = rows.findIndex(x=>x.id===id); 
        const removed = rows.splice(i,1)[0];
        toast('Borttagen.','warn','Ångra', ()=>{ rows.push(removed); employeesView(document.getElementById('app')); });
        renderRows();
      }
    }
  });
  document.getElementById('addEmp').onclick = ()=>{
    editId=null; document.getElementById('empFormTitle').textContent='Ny anställd';
    ['e_name','e_role','e_email'].forEach(idf=>document.getElementById(idf).value='');
    document.getElementById('empFormCard').style.display='block';
  };
  document.getElementById('cancelEmp').onclick = ()=> document.getElementById('empFormCard').style.display='none';
  document.getElementById('saveEmp').onclick = ()=>{
    const name = document.getElementById('e_name').value.trim();
    const role = document.getElementById('e_role').value.trim();
    const email = document.getElementById('e_email').value.trim();
    if(!name||!role||!email){ toast('Fyll i alla fält','bad'); return; }
    const payload = { name, role, email };
    if(!editId){
      rows.push({ id:uuidv4(), code:'E-'+String(rows.length+1).padStart(2,'0'), ...payload });
      toast('Anställd skapad','ok');
    } else {
      const i = rows.findIndex(x=>x.id===editId); rows[i] = { ...rows[i], ...payload }; toast('Anställd uppdaterad','ok');
    }
    document.getElementById('empFormCard').style.display='none'; renderRows();
  };
}

function filesView(el){
  el.innerHTML = `
    <h1>Filer & Kvitton</h1>
    <div class="card">
      <div class="actions"><input type="file" id="fileUp" multiple><button class="btn" id="btnUpload">Ladda upp</button></div>
      <table class="table" style="margin-top:10px">
        <thead><tr><th>Filnamn</th><th>Typ</th><th>Anteckning</th></tr></thead>
        <tbody id="fileRows">${DB.files.map(f=>`<tr><td>${f.name}</td><td>${f.type}</td><td>${f.note||''}</td></tr>`).join('')}</tbody>
      </table>
    </div>
  `;
  document.getElementById('btnUpload').onclick = ()=>{
    const inp = document.getElementById('fileUp');
    const list = document.getElementById('fileRows');
    Array.from(inp.files||[]).forEach(f=> DB.files.push({name:f.name, type:f.type, note:''}) );
    list.innerHTML = DB.files.map(f=>`<tr><td>${f.name}</td><td>${f.type}</td><td>${f.note||''}</td></tr>`).join('');
    notis('Filer uppladdade (mock)');
  };
}

async function aiMapView(el){
  el.innerHTML = `<h1>AI‑Karta</h1><div id="map" style="height:300px;border:1px solid #e5e7eb;border-radius:12px"></div>`;
  try{
    if(!('L' in window)){
      await Promise.all([
        new Promise(res=>{ const l = document.createElement('link'); l.rel='stylesheet'; l.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; l.onload=res; document.head.appendChild(l); }),
        new Promise(res=>{ const s = document.createElement('script'); s.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; s.onload=res; document.head.appendChild(s); })
      ]);
    }
    const map = L.map('map').setView([59.334591,18.063240], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OSM'}).addTo(map);
    [[59.334591,18.063240,'Stockholm — hög potential'],[57.70887,11.97456,'Göteborg — stigande'],[55.60498,13.00382,'Malmö — stabilt']]
      .forEach(p=> L.marker([p[0],p[1]]).addTo(map).bindPopup(p[2]));
    setTimeout(()=>map.invalidateSize(), 60);
  }catch(e){
    el.innerHTML += `<div class="card empty">Kartan kunde inte laddas.</div>`;
  }
}

function automationView(el){
  el.innerHTML = `<h1>Automation</h1><div class="card"><p class="muted">Trigger → Villkor → Åtgärd (mock). UI‑stub för flödesbyggare.</p></div>`;
}

function chatView(el){
  el.innerHTML = `
    <h1>Chatt</h1>
    <div class="card">
      <div class="messages" id="chatBox"></div>
      <div class="input-row"><input id="chatInput" placeholder="Skriv och tryck Enter…"></div>
    </div>
  `;
  const box = document.getElementById('chatBox');
  const inp = document.getElementById('chatInput');
  function add(sender, msg){
    const t = new Date().toLocaleTimeString();
    const div = document.createElement('div'); div.textContent = `${t} ${sender}: ${msg}`; box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }
  inp.addEventListener('keydown', (e)=>{
    if(e.key==='Enter'){ const v = inp.value.trim(); if(!v) return; add('Du', v); inp.value=''; }
  });
}

function settingsView(el){
  el.innerHTML = `
    <h1>Inställningar</h1>
    <div class="card">
      <div class="form">
        <div><label>Tema</label><select><option>Light</option></select></div>
        <div><label>Språk</label><select><option>Svenska</option><option>English</option></select></div>
        <div class="full"><label>API‑nycklar</label><input placeholder="Frakt, finans, meddelanden (UI‑stub)"></div>
      </div>
    </div>
  `;
}

function initDock(){
  const n = document.getElementById('noticeList');
  ['v8.9 laddad','AI‑coach uppgraderad','Undo + filterchips aktiva'].forEach(x=>{
    const li = document.createElement('li'); li.textContent = x; n.appendChild(li);
  });
  const input = document.getElementById('aiInput');
  const sendBtn = document.getElementById('aiSend');
  const msgs = document.getElementById('aiMsgs');
  function aiReply(q){
    const low = DB.products.filter(p=>p.stock<10);
    const c = DB.customers.length, o = DB.orders.length;
    let tips = [];
    if(low.length) tips.push(`lågt lager på ${low.map(p=>p.sku).join(', ')}`);
    if(o>0) tips.push(`följ upp ${o} pågående order`);
    const stok = DB.customers.filter(x=>x.city==='Stockholm').length;
    if(stok>1) tips.push(`planera besök i Stockholm (kundtäthet ${stok})`);
    const base = `AI: Du har ${c} kunder, ${o} order.`;
    const t = tips.length? ` Rek: ${tips.join('; ')}.` : ' Allt ser stabilt ut.';
    if(q && /budget|prognos|forecast/i.test(q)) return base + ' Prognos: +8–12% kommande 30 dagar baserat på trend (mock).';
    if(q && /lager|stock/i.test(q)) return base + ` Lagersaldo: ${low.length? 'åtgärda låglager idag' : 'inga kritiska nivåer'}.`;
    if(q && /kund|sales|sälj/i.test(q)) return base + ` Tips: ring topp 5 kunder i veckan för merförsäljning (mock).`;
    return base + t;
  }
  function send(){
    const v = input.value.trim();
    if(!v) return;
    const me = document.createElement('div'); me.textContent = 'Du: '+v; msgs.appendChild(me);
    input.value='';
    setTimeout(()=>{
      const ai = document.createElement('div'); ai.textContent = aiReply(v); msgs.appendChild(ai);
      msgs.scrollTop = msgs.scrollHeight;
    }, 320);
  }
  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ e.preventDefault(); send(); } });
}
