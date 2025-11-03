/* ========= MergX v8.22 CORE – app.js =========
   - Routing & rendering
   - KPI-kort + expand (AI mock)
   - AI-chatt (mock, enter=skicka)
   - Kunder/Inventarie/Anställda/Order/Filer/Map/Settings
   - Modal overlay (klick utanför för stäng)
   - Global sök (mock)
   - Tema & språk i localStorage
*/
(() => {
  const S = {
    state: {
      data: null,
      view: 'dashboard',
      theme: (localStorage.getItem('theme') || 'dark'),
      lang: (localStorage.getItem('lang') || 'sv'),
      chat: [
        { who:'ai', text:'Hej! Jag är din MergX-coach. Vad vill du göra idag?' }
      ],
    },
    els: {}
  };

  // ---------- Boot ----------
  document.addEventListener('DOMContentLoaded', async () => {
    S.els.view = document.getElementById('view');
    S.els.nav = document.getElementById('nav');
    S.els.themeToggle = document.getElementById('themeToggle');
    S.els.langSelect = document.getElementById('langSelect');
    S.els.globalSearch = document.getElementById('globalSearch');
    S.els.askAiGlobal = document.getElementById('askAiGlobal');
    S.els.modalOverlay = document.getElementById('modalOverlay');
    S.els.modalClose = document.getElementById('modalClose');
    S.els.modalTitle = document.getElementById('modalTitle');
    S.els.modalBody = document.getElementById('modalBody');

    // Apply persisted theme/lang
    document.body.classList.toggle('light', S.state.theme === 'light');
    document.body.classList.toggle('dark', S.state.theme === 'dark');
    S.els.langSelect.value = S.state.lang;

    // Load mock data
    try {
      const res = await fetch('/data/mock.json', { cache: 'no-store' });
      S.state.data = await res.json();
    } catch (e) {
      // Fallback minimal data if fetch fails
      S.state.data = {
        kpi: { revenueToday: 125000, ordersToday: 34, costToday: 41000, margin: 0.41 },
        customers: [
          { id:'C-1001', company:'Acme AB', orgnr:'556677-8899', contact:'Lisa Berg', email:'lisa@acme.se', phone:'+46 70 123 45 67' },
          { id:'C-1002', company:'Elon Kista', orgnr:'559900-1122', contact:'Marcus Nilsson', email:'kista@elon.se', phone:'+46 8 555 88 00' }
        ],
        inventory: [
          { sku:'USB-C-60W-1M', name:'A-Stick USB-C till USB-C 60W 1m', type:'Kabel', price:129, stock:14, status:'LOW' },
          { sku:'USB-C-LTG-27W-1M', name:'A-Stick USB-C till Lightning 27W 1m', type:'Kabel', price:149, stock:120, status:'OK' }
        ],
        employees: [
          { id:'E-01', name:'Anna Karlsson', role:'Sälj', email:'anna@mergx.app', phone:'+46 70 000 00 01', form:'Heltid' }
        ],
        orders: [
          { id:'O-501', customerId:'C-1001', sum: 18990, status:'Skickad', createdAt:'2025-11-03 09:32', terms:'30 dagar', pdfUrl:'#' }
        ],
        files: [],
        map: [
          { name:'Elon Kista', lat:59.403, lng:17.943, note:'Potentiell order om 20 dagar' },
          { name:'Mekonomen Solna', lat:59.365, lng:18.004, note:'Befintlig kund - kampanj' }
        ]
      };
    }

    // Nav handling
    S.els.nav.addEventListener('click', (e) => {
      const li = e.target.closest('li[data-view]');
      if (!li) return;
      document.querySelectorAll('#nav li').forEach(x => x.classList.remove('active'));
      li.classList.add('active');
      S.state.view = li.dataset.view;
      render();
    });

    // Theme & language
    S.els.themeToggle.addEventListener('click', () => {
      const now = document.body.classList.contains('dark') ? 'light' : 'dark';
      document.body.classList.toggle('dark', now==='dark');
      document.body.classList.toggle('light', now==='light');
      S.state.theme = now;
      localStorage.setItem('theme', now);
    });
    S.els.langSelect.addEventListener('change', (e) => {
      S.state.lang = e.target.value;
      localStorage.setItem('lang', S.state.lang);
    });

    // Global search (mock filter alert)
    S.els.globalSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = e.target.value.trim().toLowerCase();
        if (!q) return;
        alert(`(Mock) Sökning efter: “${q}” \n— implementeras med riktig filter i 8.23.`);
      }
    });

    // Global Ask AI (mock)
    S.els.askAiGlobal.addEventListener('click', () => {
      openModal('AI-Analys', `<div class="msg ai">Jag ser att omsättningen ökar +6% vecka över vecka. Rekommendation: fokusera på Stockholm & “A-Stick USB-C 60W”.</div>`);
    });

    // Modal close logic
    S.els.modalClose.addEventListener('click', closeModal);
    S.els.modalOverlay.addEventListener('click', (e) => {
      if (e.target === S.els.modalOverlay) closeModal();
    });

    // Initial render
    render();
  });

  // ---------- Render ----------
  function render(){
    switch (S.state.view) {
      case 'dashboard': return renderDashboard();
      case 'customers': return renderCustomers();
      case 'inventory': return renderInventory();
      case 'employees': return renderEmployees();
      case 'orders': return renderOrders();
      case 'files': return renderFiles();
      case 'map': return renderMap();
      case 'settings': return renderSettings();
      default: return renderDashboard();
    }
  }

  // ---------- Dashboard ----------
  function renderDashboard(){
    const k = S.state.data.kpi || { revenueToday:0, ordersToday:0, costToday:0, margin:0 };
    S.els.view.innerHTML = `
      <section class="section">
        <h2>Översikt</h2>
        <div class="kpi-grid">
          ${kpiCard('Omsättning idag', k.revenueToday, '+6.2%', true, 'kpi_revenue')}
          ${kpiCard('Order idag', k.ordersToday, '+2', true, 'kpi_orders')}
          ${kpiCard('Kostnader idag', k.costToday, '-1.1%', false, 'kpi_cost')}
          ${kpiCard('Bruttomarginal', (k.margin*100).toFixed(1) + '%', '+0.3pp', true, 'kpi_margin')}
        </div>
      </section>

      <section class="section cols-2">
        <div class="chart" id="economyChart">Ekonomi – kombostaplar (mock)</div>
        <div class="chat section">
          <h2>AI-coach</h2>
          <div id="chatLog" class="chat-log">${S.state.chat.map(renderMsg).join('')}</div>
          <div class="chat-input">
            <input id="chatInput" placeholder="Skriv ett meddelande… (Enter skickar)" />
            <button id="chatAttach" class="icon-btn" title="Bifoga">📎</button>
            <button id="chatVoice" class="icon-btn" title="Spela in röst">🎙️</button>
            <button id="chatSend" class="btn-primary">Skicka</button>
          </div>
        </div>
        <div class="full section">
          <h2>AI-karta (mini)</h2>
          <div class="map" id="mapMini">Karta (mock) – platser nära dig</div>
        </div>
      </section>
    `;

    // KPI expand events
    ['kpi_revenue','kpi_orders','kpi_cost','kpi_margin'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('click', () => openKpiModal(id));
    });

    // AI chat events
    const input = document.getElementById('chatInput');
    const send = document.getElementById('chatSend');
    input.addEventListener('keydown', (e)=>{
      if (e.key === 'Enter') send.click();
    });
    send.addEventListener('click', ()=>{
      const txt = input.value.trim();
      if (!txt) return;
      S.state.chat.push({ who:'me', text: txt });
      redrawChat();
      input.value = '';
      // AI mock reply
      setTimeout(()=>{
        S.state.chat.push({ who:'ai', text: aiReplyMock(txt) });
        redrawChat();
      }, 400);
    });

    // Economy chart mock (simple bars)
    drawEconomyChart('economyChart');

    // Map mock list
    const mapEl = document.getElementById('mapMini');
    if (mapEl){
      mapEl.innerHTML = `<div>
        <div style="margin-bottom:8px;color:#9bb2ca">Platser:</div>
        <ul style="margin:0;padding-left:18px">
          ${S.state.data.map.map(p => `<li>${p.name} — <em>${p.note}</em></li>`).join('')}
        </ul>
        <div style="margin-top:10px">
          <button class="btn-primary" id="mapSuggest">AI-förslag</button>
        </div>
      </div>`;
      document.getElementById('mapSuggest')?.addEventListener('click', ()=>{
        openModal('AI-ruttförslag', `
          <div class="msg ai">Föreslår: Start → Elon Kista → Mekonomen Solna. Total restid ~36 min. Lägg in notis: “Elon Kista – följ upp om 20 dagar”.</div>
        `);
      });
    }
  }

  function kpiCard(label, value, deltaStr, positive, id){
    const deltaClass = positive ? 'up' : 'down';
    const pct = Math.min(100, Math.abs(parseFloat(deltaStr)) || 40);
    return `
      <div class="kpi" id="${id}">
        <h3>${label}</h3>
        <div class="value">${value}</div>
        <div class="delta ${deltaClass}">${deltaStr}</div>
        <div class="progress"><span style="width:${pct}%"></span></div>
      </div>
    `;
  }

  function openKpiModal(id){
    let title = 'Detaljer';
    let body = '';
    if (id==='kpi_revenue') title='Omsättning – Detaljer';
    if (id==='kpi_orders') title='Order – Detaljer';
    if (id==='kpi_cost') title='Kostnader – Detaljer';
    if (id==='kpi_margin') title='Bruttomarginal – Detaljer';

    body = `
      <div style="display:grid; gap:14px">
        <div class="chart">Detaljerad graf (mock)</div>
        <table class="table">
          <thead><tr><th>Period</th><th>Värde</th></tr></thead>
          <tbody>
            <tr><td>Idag</td><td>—</td></tr>
            <tr><td>7 dagar</td><td>—</td></tr>
            <tr><td>30 dagar</td><td>—</td></tr>
          </tbody>
        </table>
        <div class="msg ai">AI-analys: Positiv trend drivet av USB-C 60W i Stockholm. Rekommenderar kundbesök hos Elon Kista.</div>
      </div>
    `;
    openModal(title, body);
  }

  function drawEconomyChart(id){
    const el = document.getElementById(id);
    if (!el) return;
    // Rendera enkel ASCII-lik “graf” för CORE
    el.textContent = '';
    const wrap = document.createElement('div');
    wrap.style.width='100%'; wrap.style.height='100%'; wrap.style.display='grid';
    wrap.style.alignItems='center'; wrap.style.justifyItems='center';
    wrap.innerHTML = `
      <div style="text-align:center;color:#9bb2ca">
        <div style="font-weight:700;margin-bottom:6px">Ekonomi (mock)</div>
        <div>Staplar: Omsättning/Kostnader • Linje: Bruttomarginal</div>
      </div>`;
    el.appendChild(wrap);
  }

  function renderMsg(m){
    return `<div class="msg ${m.who==='ai'?'ai':'me'}">${escapeHtml(m.text)}</div>`;
  }

  function redrawChat(){
    const log = document.getElementById('chatLog');
    log.innerHTML = S.state.chat.map(renderMsg).join('');
    log.scrollTop = log.scrollHeight;
  }

  function aiReplyMock(txt){
    const t = txt.toLowerCase();
    if (t.includes('budget')) return 'Föreslår budget 45k/vecka för Paid Social; störst ROI tis–tor kl 11–13.';
    if (t.includes('order')) return 'Nya order från Acme AB väntar fakturering. Vill du skapa PDF?';
    if (t.includes('karta')) return '2 butiker nära dig: Elon Kista (chans: hög), Mekonomen Solna (medel).';
    return 'Noterat. Jag följer upp i bakgrunden och ger förslag i din översikt.';
  }

  // ---------- Customers ----------
  function renderCustomers(){
    const rows = S.state.data.customers.map(c => `
      <tr>
        <td>${c.id}</td>
        <td>${c.company}</td>
        <td>${c.orgnr}</td>
        <td>${c.contact}</td>
        <td>${c.email}</td>
        <td>
          <button class="btn" data-act="view" data-id="${c.id}">Visa</button>
          <button class="btn" data-act="edit" data-id="${c.id}">Redigera</button>
        </td>
      </tr>`).join('');
    S.els.view.innerHTML = `
      <section class="section">
        <h2>Kunder</h2>
        <div style="margin-bottom:12px"><button id="addCustomer" class="btn">Lägg till kund</button></div>
        <table class="table">
          <thead><tr><th>ID</th><th>Företag</th><th>Org.nr</th><th>Kontakt</th><th>E-post</th><th>Åtgärd</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </section>
    `;
    S.els.view.querySelector('#addCustomer').addEventListener('click', () => {
      openModal('Ny kund', formCustomer());
    });
    S.els.view.querySelectorAll('button[data-act]').forEach(b=>{
      b.addEventListener('click', ()=>{
        const id = b.dataset.id, act = b.dataset.act;
        const c = S.state.data.customers.find(x=>x.id===id);
        if (!c) return;
        if (act==='view') openModal(`Kund: ${c.company}`, customerCard(c));
        if (act==='edit') openModal(`Redigera: ${c.company}`, formCustomer(c));
      });
    });
  }
  function customerCard(c){
    return `
      <div class="section" style="background:transparent;border:0;box-shadow:none;padding:0">
        <table class="table">
          <tbody>
            <tr><th style="width:160px">Företag</th><td>${c.company}</td></tr>
            <tr><th>Org.nr</th><td>${c.orgnr}</td></tr>
            <tr><th>Kontakt</th><td>${c.contact}</td></tr>
            <tr><th>E-post</th><td>${c.email}</td></tr>
            <tr><th>Telefon</th><td>${c.phone||'-'}</td></tr>
          </tbody>
        </table>
        <div class="msg ai" style="margin-top:10px">AI: Sammanfattning kommer här (mock).</div>
      </div>`;
  }
  function formCustomer(c={}){
    return `
      <form id="customerForm" class="section">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <label>Företag<input name="company" value="${esc(c.company)}"/></label>
          <label>Org.nr<input name="orgnr" value="${esc(c.orgnr)}"/></label>
          <label>Kontakt<input name="contact" value="${esc(c.contact)}"/></label>
          <label>E-post<input name="email" value="${esc(c.email)}"/></label>
          <label>Telefon<input name="phone" value="${esc(c.phone||'')}"/></label>
        </div>
        <div style="margin-top:12px">
          <button class="btn-primary" type="submit">Spara</button>
        </div>
      </form>
      <script>
        document.getElementById('customerForm').addEventListener('submit', (e)=>{
          e.preventDefault(); alert('(Mock) Kund sparad.');
        });
      </script>
    `;
  }

  // ---------- Inventory ----------
  function renderInventory(){
    const rows = S.state.data.inventory.map(p => `
      <tr>
        <td>${p.sku}</td>
        <td>${p.name}</td>
        <td>${p.type}</td>
        <td>${p.price} kr</td>
        <td>${p.stock}</td>
        <td>${p.status==='LOW' ? '<span class="badge low">Låg nivå</span>' : '<span class="badge ok">OK</span>'}</td>
        <td><button class="btn" data-sku="${p.sku}" data-act="view">Visa</button> <button class="btn" data-sku="${p.sku}" data-act="edit">Redigera</button></td>
      </tr>`).join('');
    S.els.view.innerHTML = `
      <section class="section">
        <h2>Inventarie</h2>
        <div style="margin-bottom:12px"><button id="addProd" class="btn">Lägg till produkt</button></div>
        <table class="table">
          <thead><tr><th>Art.nr</th><th>Namn</th><th>Typ</th><th>Pris</th><th>Saldo</th><th>Status</th><th>Åtgärd</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </section>
    `;
    S.els.view.querySelector('#addProd').addEventListener('click', ()=> openModal('Ny produkt', formProduct()));
    S.els.view.querySelectorAll('button[data-act]').forEach(b=>{
      b.addEventListener('click', ()=>{
        const sku = b.dataset.sku, act = b.dataset.act;
        const p = S.state.data.inventory.find(x=>x.sku===sku);
        if (!p) return;
        if (act==='view') openModal(p.name, productCard(p));
        if (act==='edit') openModal('Redigera produkt', formProduct(p));
      });
    });
  }
  function productCard(p){
    return `
      <div style="display:grid;gap:12px">
        <table class="table">
          <tbody>
           <tr><th style="width:160px">Art.nr</th><td>${p.sku}</td></tr>
           <tr><th>Namn</th><td>${p.name}</td></tr>
           <tr><th>Typ</th><td>${p.type}</td></tr>
           <tr><th>Pris</th><td>${p.price} kr</td></tr>
           <tr><th>Saldo</th><td>${p.stock}</td></tr>
           <tr><th>Status</th><td>${p.status}</td></tr>
          </tbody>
        </table>
        <div class="section" style="background:transparent;border:0;box-shadow:none;padding:0">
          <h3>Top-tabell</h3>
          <table class="table">
            <thead><tr><th>Artikelnummer</th><th>Namn</th><th>Typ</th><th>Antal</th><th>Övrigt</th></tr></thead>
            <tbody><tr><td>${p.sku}</td><td>${p.name}</td><td>${p.type}</td><td>${p.stock}</td><td>-</td></tr></tbody>
          </table>
        </div>
      </div>`;
  }
  function formProduct(p={}){
    return `
      <form id="prodForm" class="section">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
          <label>Art.nr<input name="sku" value="${esc(p.sku)}"/></label>
          <label>Namn<input name="name" value="${esc(p.name)}"/></label>
          <label>Typ<input name="type" value="${esc(p.type)}"/></label>
          <label>Pris<input name="price" type="number" value="${esc(p.price)}"/></label>
          <label>Saldo<input name="stock" type="number" value="${esc(p.stock)}"/></label>
          <label>Status<select name="status"><option ${p.status==='OK'?'selected':''}>OK</option><option ${p.status==='LOW'?'selected':''}>LOW</option></select></label>
        </div>
        <div style="margin-top:12px"><button class="btn-primary">Spara</button></div>
      </form>
      <script>document.getElementById('prodForm').addEventListener('submit',e=>{e.preventDefault();alert('(Mock) Produkt sparad.');});</script>
    `;
  }

  // ---------- Employees ----------
  function renderEmployees(){
    const rows = S.state.data.employees.map(u=>`
      <tr>
        <td>${u.id}</td><td>${u.name}</td><td>${u.role}</td><td>${u.email}</td><td>${u.phone}</td><td>${u.form}</td>
        <td><button class="btn" data-id="${u.id}" data-act="view">Visa</button> <button class="btn" data-id="${u.id}" data-act="edit">Redigera</button></td>
      </tr>`).join('');
    S.els.view.innerHTML = `
      <section class="section">
        <h2>Anställda</h2>
        <div style="margin-bottom:12px"><button id="addEmp" class="btn">Lägg till anställd</button></div>
        <table class="table">
          <thead><tr><th>ID</th><th>Namn</th><th>Roll</th><th>E-post</th><th>Telefon</th><th>Form</th><th>Åtgärd</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </section>
    `;
    S.els.view.querySelector('#addEmp').addEventListener('click', ()=> openModal('Ny anställd', formEmployee()));
    S.els.view.querySelectorAll('button[data-act]').forEach(b=>{
      b.addEventListener('click', ()=>{
        const id = b.dataset.id, act = b.dataset.act;
        const u = S.state.data.employees.find(x=>x.id===id);
        if (!u) return;
        if (act==='view') openModal(`Anställd: ${u.name}`, employeeCard(u));
        if (act==='edit') openModal('Redigera anställd', formEmployee(u));
      });
    });
  }
  function employeeCard(u){
    return `
      <table class="table">
        <tbody>
          <tr><th style="width:160px">Namn</th><td>${u.name}</td></tr>
          <tr><th>Roll</th><td>${u.role}</td></tr>
          <tr><th>E-post</th><td>${u.email}</td></tr>
          <tr><th>Telefon</th><td>${u.phone}</td></tr>
          <tr><th>Form</th><td>${u.form}</td></tr>
        </tbody>
      </table>`;
  }
  function formEmployee(u={}){
    return `
      <form id="empForm" class="section">
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px">
          <label>Namn<input name="name" value="${esc(u.name)}"/></label>
          <label>Roll<input name="role" value="${esc(u.role)}"/></label>
          <label>E-post<input name="email" value="${esc(u.email)}"/></label>
          <label>Telefon<input name="phone" value="${esc(u.phone)}"/></label>
          <label>Form<select name="form"><option ${u.form==='Heltid'?'selected':''}>Heltid</option><option ${u.form==='Prov'?'selected':''}>Prov</option></select></label>
        </div>
        <div style="margin-top:12px"><button class="btn-primary">Spara</button></div>
      </form>
      <script>document.getElementById('empForm').addEventListener('submit',e=>{e.preventDefault();alert('(Mock) Anställd sparad.');});</script>
    `;
  }

  // ---------- Orders ----------
  function renderOrders(){
    const rows = S.state.data.orders.map(o=>{
      const cust = S.state.data.customers.find(c=>c.id===o.customerId);
      return `
        <tr>
          <td>${o.id}</td>
          <td>${cust ? cust.company : o.customerId}</td>
          <td>${o.sum} kr</td>
          <td>${o.status}</td>
          <td>${o.createdAt}</td>
          <td>${o.terms}</td>
          <td>
            <button class="btn" data-id="${o.id}" data-act="preview" title="Förhandsgranska">👁️</button>
            <button class="btn" data-id="${o.id}" data-act="download" title="Ladda ned PDF">⬇️</button>
          </td>
        </tr>`;
    }).join('');
    S.els.view.innerHTML = `
      <section class="section">
        <h2>Order & Fakturor</h2>
        <div style="margin-bottom:12px"><button id="addOrder" class="btn">Skapa order</button></div>
        <table class="table">
          <thead><tr><th>#</th><th>Kund</th><th>Summa</th><th>Status</th><th>Tid</th><th>Betalvillkor</th><th>PDF</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </section>
    `;
    S.els.view.querySelector('#addOrder').addEventListener('click', ()=> openModal('Ny order', '<div>(Mock) Orderflöde kommer i 8.23</div>'));
    S.els.view.querySelectorAll('button[data-act]').forEach(b=>{
      b.addEventListener('click', ()=>{
        const id = b.dataset.id, act = b.dataset.act;
        const o = S.state.data.orders.find(x=>x.id===id);
        if (!o) return;
        if (act==='preview'){
          openModal(`Faktura: ${o.id}`, `<div class="section">PDF-förhandsgranskning (mock)</div>`);
        } else if (act==='download'){
          alert('(Mock) Skapar PDF och laddar ned. (jsPDF i 8.23)');
        }
      });
    });
  }

  // ---------- Files & Receipts ----------
  function renderFiles(){
    S.els.view.innerHTML = `
      <section class="section">
        <h2>Filer & Kvitton</h2>
        <div style="display:flex;gap:10px;margin-bottom:12px">
          <button class="btn" id="uploadFile">Ladda upp</button>
          <button class="btn" id="newFolder">Ny mapp</button>
        </div>
        <div class="section" style="background:transparent;border:0;box-shadow:none;padding:0">
          <div class="chart">Filbläddrare (mock) – mappar/lista kommer i 8.23</div>
        </div>
        <div class="msg ai" style="margin-top:10px">AI/OCR: När du laddar upp kvitton kommer jag att extrahera belopp, datum och föreslå bokföringskonto.</div>
      </section>
    `;
    document.getElementById('uploadFile').addEventListener('click', ()=> alert('(Mock) Öppnar filväljare…'));
    document.getElementById('newFolder').addEventListener('click', ()=> alert('(Mock) Skapar mapp…'));
  }

  // ---------- Map (mock) ----------
  function renderMap(){
    const list = S.state.data.map.map(p=>`<li>${p.name} — <em>${p.note}</em></li>`).join('');
    S.els.view.innerHTML = `
      <section class="section">
        <h2>AI-Karta</h2>
        <div class="map">Karta (mock). Integreras med Google Places/Directions i 8.23.</div>
        <div style="margin-top:12px">
          <ul style="margin:0;padding-left:18px">${list}</ul>
        </div>
        <div style="margin-top:12px"><button id="addNote" class="btn">Lägg notis på plats</button></div>
      </section>
    `;
    document.getElementById('addNote').addEventListener('click', ()=> openModal('Ny notis', '<div>(Mock) Lägg notis till plats.</div>'));
  }

  // ---------- Settings ----------
  function renderSettings(){
    S.els.view.innerHTML = `
      <section class="section">
        <h2>Inställningar</h2>
        <form id="settingsForm" class="section" style="background:transparent;border:0;box-shadow:none;padding:0">
          <h3>Företagsuppgifter</h3>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px">
            <label>Företagsnamn<input name="company" placeholder="Ditt AB"/></label>
            <label>Org.nr<input name="orgnr" placeholder="556xxx-xxxx"/></label>
            <label>Adress<input name="address" placeholder="Gata 1, Stad"/></label>
            <label>E-post ekonomi<input name="email" placeholder="economy@company.se"/></label>
          </div>

          <h3 style="margin-top:18px">Integrationer (placeholders)</h3>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px">
            <label>Fraktjakt API-nyckel<input name="fraktjakt"/></label>
            <label>Finansbolag API-nyckel<input name="finans"/></label>
            <label>AI-nyckel (valfri)<input name="ai"/></label>
            <label>WhatsApp/SMS gateway<input name="msg"/></label>
          </div>

          <h3 style="margin-top:18px">App</h3>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px">
            <label>Tema
              <select name="theme">
                <option value="dark" ${S.state.theme==='dark'?'selected':''}>Mörk</option>
                <option value="light" ${S.state.theme==='light'?'selected':''}>Ljus</option>
              </select>
            </label>
            <label>Språk
              <select name="lang">
                <option value="sv" ${S.state.lang==='sv'?'selected':''}>Svenska</option>
                <option value="en" ${S.state.lang==='en'?'selected':''}>English</option>
              </select>
            </label>
          </div>

          <div style="margin-top:12px"><button class="btn-primary">Spara</button></div>
        </form>
      </section>
    `;
    document.getElementById('settingsForm').addEventListener('submit', (e)=>{
      e.preventDefault();
      const f = new FormData(e.target);
      const theme = f.get('theme'); const lang = f.get('lang');
      if (theme && theme!==S.state.theme){
        S.state.theme = theme; localStorage.setItem('theme', theme);
        document.body.classList.toggle('dark', theme==='dark');
        document.body.classList.toggle('light', theme==='light');
      }
      if (lang && lang!==S.state.lang){
        S.state.lang = lang; localStorage.setItem('lang', lang);
      }
      alert('(Mock) Inställningar sparade.');
    });
  }

  // ---------- Modal helpers ----------
  function openModal(title, html){
    S.els.modalTitle.textContent = title;
    S.els.modalBody.innerHTML = html;
    S.els.modalOverlay.classList.remove('hidden');
  }
  function closeModal(){
    S.els.modalOverlay.classList.add('hidden');
    S.els.modalBody.innerHTML = '';
  }

  // ---------- Utils ----------
  function escapeHtml(s){ return (s||'').replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }
  function esc(v){ return v==null?'':String(v).replace(/"/g,'&quot;'); }
})();
