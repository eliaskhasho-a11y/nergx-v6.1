
import { SoundFX } from './soundfx.js';

const MX = window.MX = {
  role: localStorage.getItem('mx_role') || 'Admin',
  lang: localStorage.getItem('mx_lang') || 'sv',
  theme: localStorage.getItem('mx_theme') || 'light',
  notices: [], aiLog: [], audit: JSON.parse(localStorage.getItem('mx_audit')||'[]'),
  kpi: { revenue: 324500, orders: 71, gm: 0.62 },
  customers: [], documents: [],
  save(){ localStorage.setItem('mx_role', this.role); localStorage.setItem('mx_lang', this.lang); localStorage.setItem('mx_theme', this.theme); localStorage.setItem('mx_audit', JSON.stringify(this.audit.slice(0,500))); },
  pushAudit(evt){ this.audit.unshift({ts:Date.now(), ...evt}); this.save(); }
};

async function mountLogo(){
  try{ const host = document.getElementById('logoHost'); const res = await fetch('./assets/logo.svg'); const svg = await res.text(); host.innerHTML = svg; }catch{}
}

const routesByRole = {
  Admin     : ['dashboard','crm','economy','document','workflow','map','audit','settings'],
  Ekonomi   : ['dashboard','economy','document','audit','settings'],
  Sälj      : ['dashboard','crm','document','map','settings'],
  Lager     : ['dashboard','document','map','settings'],
  Kundtjänst: ['dashboard','crm','settings']
};
const labels = { dashboard:'Översikt', crm:'Kunder / CRM', economy:'Ekonomi / Budget', document:'Dokument', workflow:'Automation', map:'AI-Karta', audit:'Audit-logg', settings:'Inställningar' };

function setTheme(t){ MX.theme=t; localStorage.setItem('mx_theme', t); document.getElementById('appRoot').setAttribute('data-theme', t); }

function buildNav(){
  const nav = document.getElementById('nav');
  const allowed = routesByRole[MX.role] || [];
  nav.innerHTML = allowed.map(r => `<a href="#/${r}" data-route="${r}" data-nav>${labels[r]}</a>`).join('');
  const a = location.hash.replace('#/','') || 'dashboard';
  [...nav.querySelectorAll('a')].forEach(x => x.classList.toggle('active', x.dataset.route===a));
  nav.querySelectorAll('[data-nav]').forEach(el=> el.addEventListener('click', ()=> SoundFX.navTap(), {passive:true}));
}

const Views = {
  dashboard(el){
    el.innerHTML = `
      <div class="header">
        <div><b>Översikt</b> <span class="badge">Roll: ${MX.role}</span></div>
        <div class="small">⌘/Ctrl+K för global sök</div>
      </div>
      <div class="cards">
        <div class="card"><div class="small">Omsättning idag</div><div class="kpi">${MX.kpi.revenue.toLocaleString('sv-SE')} kr</div><div class="small">+12% mot igår</div></div>
        <div class="card"><div class="small">Order idag</div><div class="kpi">${MX.kpi.orders}</div><div class="small">3 B2B</div></div>
        <div class="card"><div class="small">Bruttomarginal</div><div class="kpi">${Math.round(MX.kpi.gm*100)} %</div><div class="small">Stabil</div></div>
      </div>
      <div class="row" style="margin-top:8px">
        <div class="card">
          <div class="small">Notiscenter</div>
          <div class="notice" id="noticeBox"></div>
          <div class="kit" style="margin-top:8px">
            <button id="addInfo" class="btn">+ Info</button>
            <button id="addWarn" class="btn">+ Varning</button>
            <button id="clear" class="btn">Rensa</button>
          </div>
        </div>
        <div class="card">
          <div class="small">AI Coach (Enter för att skicka)</div>
          <div class="kit"><input id="coachInput" placeholder="Skriv t.ex. 'Vilka kunder riskerar sen betalning?'" style="flex:1">
          <button id="coachSend" class="btn primary" data-coach-send>Skicka</button></div>
          <div class="notice" id="coachLog"></div>
        </div>
      </div>
      <div class="row" style="margin-top:8px">
        <div class="card">
          <div class="small">🎧 Ljud & AI-feedback</div>
          <div class="kit">
            <button id="testSound" class="btn">🔊 Testa ljud</button>
            <button id="resetSound" class="btn">Återställ ljudprofil</button>
            <span class="small right" id="soundState"></span>
          </div>
          <div class="alert small" style="margin-top:8px">AI säger: “Välkommen tillbaka! Jag sammanfattar dagens läge när första datan kommer in.”</div>
        </div>
        <div class="card">
          <div class="small">Snabbgenvägar</div>
          <div class="kit">
            <a class="btn" href="#/document">+ Order</a>
            <a class="btn" href="#/crm">+ Ny kund</a>
            <a class="btn" href="#/workflow">Automation</a>
          </div>
        </div>
      </div>
    `;
    // Notiser
    const nb = el.querySelector('#noticeBox');
    const renderNotices = ()=> nb.innerHTML = MX.notices.slice(-80).map(n=>`<div class="small">[${n.level}] ${n.msg}</div>`).join('');
    el.querySelector('#addInfo').onclick = ()=>{ MX.notices.push({level:'INFO', msg:'Order #'+(1000+Math.floor(Math.random()*9000))+' bokad'}); renderNotices(); };
    el.querySelector('#addWarn').onclick = ()=>{ MX.notices.push({level:'WARN', msg:'Låg lager: CAR-CHG-60W'}); renderNotices(); };
    el.querySelector('#clear').onclick  = ()=>{ MX.notices=[]; renderNotices(); };
    renderNotices();

    // AI Coach mock
    const input = el.querySelector('#coachInput'); const log = el.querySelector('#coachLog');
    const send = ()=>{
      const v = input.value.trim(); if(!v) return;
      MX.aiLog.push("Du: "+v);
      try{
        const data = { reply: "AI: Rek – kontakta förfallna kunder, öka kampanj i Syd, justera prislista B2B-låg." };
        MX.aiLog.push(data.reply);
        SoundFX.success();
      }catch(e){
        MX.aiLog.push("AI: (mock) – nätverk fel, visar standardrekommendation.");
        SoundFX.error();
      }
      input.value=''; log.innerHTML = MX.aiLog.slice(-12).map(x=>`<div class="small">${x}</div>`).join('');
      MX.pushAudit({type:'ai.query', actor: MX.role, detail: v});
    };
    input.addEventListener('keydown', e=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); send(); }});
    el.querySelector('#coachSend').addEventListener('click', send);

    // Sound test card
    const testBtn = el.querySelector('#testSound');
    const resetBtn = el.querySelector('#resetSound');
    const stateOut = el.querySelector('#soundState');
    const sync = ()=>{ const s = SoundFX.state(); stateOut.textContent = (s.enabled?'På ':'Av ')+'• '+Math.round(s.volume*100)+'%'; };
    if(testBtn){ testBtn.addEventListener('click', ()=>{ SoundFX.success(); setTimeout(()=>SoundFX.paneOpen(), 280); setTimeout(()=>SoundFX.navTap(), 560); }); }
    if(resetBtn){ resetBtn.addEventListener('click', ()=>{ SoundFX.setEnabled(true); SoundFX.setVolume(0.15); sync(); }); }
    sync();
  },

  crm(el){
    const rows = MX.customers.map((c,i)=> `<tr>
      <td contenteditable data-i="${i}" data-f="name">${c.name||''}</td>
      <td contenteditable data-i="${i}" data-f="org">${c.org||''}</td>
      <td contenteditable data-i="${i}" data-f="person">${c.person||''}</td>
      <td contenteditable data-i="${i}" data-f="mail">${c.mail||''}</td>
      <td contenteditable data-i="${i}" data-f="tel">${c.tel||''}</td>
      <td contenteditable data-i="${i}" data-f="tags">${c.tags||''}</td>
    </tr>`).join('');
    el.innerHTML = `
      <div class="header">
        <div><b>Kunder / CRM</b> <span class="badge">${MX.customers.length} kunder</span></div>
        <div class="kit"><button id="new" class="btn">Ny kund</button> <button id="exp" class="btn">Export</button> <button id="imp" class="btn">Import</button></div>
      </div>
      <div class="card">
        <table class="table"><thead><tr><th>Namn</th><th>Org.nr</th><th>Kontakt</th><th>E-post</th><th>Tel</th><th>Taggar</th></tr></thead>
        <tbody id="tb">${rows || '<tr><td colspan="6" class="small">Inga kunder.</td></tr>'}</tbody></table>
      </div>
    `;
    const tb = el.querySelector('#tb');
    tb.addEventListener('input', e=>{
      const i = +e.target.dataset.i; const f = e.target.dataset.f; MX.customers[i][f] = e.target.textContent; MX.save();
    });
    el.querySelector('#new').onclick = ()=>{ MX.customers.push({name:'Ny kund'}); route(); };
    el.querySelector('#exp').onclick = ()=>{ const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([JSON.stringify(MX.customers,null,2)],{type:'application/json'})); a.download='customers.json'; a.click(); };
    el.querySelector('#imp').onclick = ()=>{ const i=document.createElement('input'); i.type='file'; i.accept='.json'; i.onchange=()=>{ const f=i.files[0]; if(!f)return; const fr=new FileReader(); fr.onload=()=>{ try{ MX.customers=JSON.parse(fr.result); MX.save(); route(); }catch(e){ alert('Ogiltig JSON'); } }; fr.readAsText(f); }; i.click(); };
  },

  economy(el){
    el.innerHTML = `
      <div class="header"><b>Ekonomi / Budget</b></div>
      <div class="row" style="margin-top:8px">
        <div class="card">
          <div class="small">Budget (månad)</div><input id="b" type="number" value="320000" style="width:200px"/>
          <div class="small">Kostnader (månad)</div><input id="c" type="number" value="110000" style="width:200px"/>
          <div class="small">Omsättning hittills</div><input id="r" type="number" value="${MX.kpi.revenue}" style="width:200px"/>
          <div style="margin-top:10px"><button id="calc" class="btn">Beräkna prognos</button></div>
        </div>
        <div class="card"><div class="small">Prognos</div><div id="o" class="kpi">–</div></div>
      </div>
    `;
    const b=el.querySelector('#b'), c=el.querySelector('#c'), r=el.querySelector('#r'), o=el.querySelector('#o');
    const calc=()=>{ const profit=(+r.value)-(+c.value); const pct=Math.round(Math.min(1,Math.max(0,profit/(+b.value)))*100); o.textContent=profit.toLocaleString('sv-SE')+' kr | '+pct+' % mot budget'; };
    calc(); el.querySelector('#calc').onclick = calc;
  },

  document(el){
    const rows = MX.documents.map(d=>`<tr>
      <td>${d.id}</td><td>${d.type}</td><td>${d.customer||'-'}</td><td>${(d.total||0).toLocaleString('sv-SE')} kr</td><td>${d.status}</td>
    </tr>`).join('');
    el.innerHTML = `
      <div class="header">
        <div><b>Dokument</b> <span class="badge">${MX.documents.length} st</span></div>
        <div class="kit"><button id="newQ" class="btn">+ Offert</button><button id="newO" class="btn">+ Order</button><button id="newI" class="btn">+ Faktura</button></div>
      </div>
      <div class="card"><table class="table"><thead><tr><th>ID</th><th>Typ</th><th>Kund</th><th>Belopp</th><th>Status</th></tr></thead><tbody id="tb">${rows||'<tr><td colspan=5 class=small>Tomt.</td></tr>'}</tbody></table></div>
    `;
    function create(type){
      const c = MX.customers[0]?.name || 'Okänd Kund';
      const id = type[0]+ '-' + (10000 + Math.floor(Math.random()*90000));
      MX.documents.unshift({ id, type, customer:c, total: Math.round(25000 + Math.random()*90000), status: type==='Faktura'?'Obetald':'Utkast', ts:Date.now() });
      MX.pushAudit({type:'doc.new', actor:MX.role, detail:id}); route(); SoundFX.success();
    }
    el.querySelector('#newQ').onclick = ()=> create('Offert');
    el.querySelector('#newO').onclick = ()=> create('Order');
    el.querySelector('#newI').onclick = ()=> create('Faktura');
  },

  workflow(el){ el.innerHTML = `<div class="header"><b>Automation</b> <span class="small">Skissa flöden (stub)</span></div><div class="card"><div class="alert small">Drag-n-drop editor kommer i 7.6</div></div>`; },
  map(el){ el.innerHTML = `<div class="header"><b>AI-Karta</b></div><div class="card"><div class="alert small">Kartvy (stub) – kommer i 7.6</div></div>`; },
  audit(el){
    el.innerHTML = `<div class="header"><b>Audit-logg</b> <span class="badge">${MX.audit.length} händelser</span></div><div class="card"><div id="list" class="notice" style="height:240px"></div></div>`;
    const list=el.querySelector('#list');
    list.innerHTML = MX.audit.map(a=>`<div class="small">${new Date(a.ts).toLocaleString()} — <b>${a.type}</b> — ${a.actor||'-'} — ${a.detail||''}</div>`).join('') || '<div class="small">Tom logg.</div>';
  },
  settings(el){
    el.innerHTML = `
      <div class="header"><b>Inställningar</b></div><hr/>
      <div class="grid">
        <label class="small">Roll</label>
        <select id="role"><option>Admin</option><option>Ekonomi</option><option>Sälj</option><option>Lager</option><option>Kundtjänst</option></select>
        <label class="small">Tema</label>
        <select id="theme"><option value="light">Ljust</option><option value="dark">Mörkt</option></select>
        <label class="small">Språk</label>
        <select id="lang"><option value="sv">Svenska</option><option value="en">English</option></select>
      </div>
      <section class="card" style="margin-top:10px">
        <header><b>Ljud</b></header>
        <div class="kit" style="margin-top:8px">
          <label><input type="checkbox" id="soundEnabled"> Aktivera UI-ljud</label>
          <label>Volym <input id="soundVolume" type="range" min="0" max="1" step="0.01" style="vertical-align:middle"> <span id="soundVolumeVal"></span></label>
          <button id="testSound" class="btn">🔊 Testa ljud</button>
        </div>
      </section>
    `;
    const r=el.querySelector('#role'), l=el.querySelector('#lang'), t=el.querySelector('#theme');
    r.value = MX.role; l.value = MX.lang; t.value = MX.theme;
    r.onchange = ()=>{ MX.role=r.value; MX.save(); init(); };
    l.onchange = ()=>{ MX.lang=l.value; MX.save(); alert('Språk sparat (stub)'); };
    t.onchange = ()=>{ setTheme(t.value); };

    const ch=el.querySelector('#soundEnabled'), vol=el.querySelector('#soundVolume'), out=el.querySelector('#soundVolumeVal');
    const s=SoundFX.state(); ch.checked=s.enabled; vol.value=s.volume; out.textContent=Math.round(s.volume*100)+'%';
    ch.addEventListener('change', e=> SoundFX.setEnabled(e.target.checked));
    vol.addEventListener('input', e=>{ SoundFX.setVolume(parseFloat(e.target.value)); out.textContent=Math.round(e.target.value*100)+'%'; });
    el.querySelector('#testSound').addEventListener('click', ()=>{ SoundFX.success(); setTimeout(()=>SoundFX.paneOpen(), 280); setTimeout(()=>SoundFX.navTap(), 560); });
  }
};

function route(){
  const r = (location.hash.replace('#/','') || 'dashboard').split('?')[0];
  const allowed = routesByRole[MX.role] || [];
  const target = allowed.includes(r)? r : 'dashboard';
  const main = document.getElementById('main');
  main.innerHTML = '';
  Views[target](main);
  buildNav();
}

function globalSearch(){
  const q = (document.getElementById('globalSearch').value||'').toLowerCase().trim(); if(!q) return alert('Skriv något att söka på.');
  const inCustomers = MX.customers.filter(c => JSON.stringify(c).toLowerCase().includes(q)).map(c=>'[Kund] '+c.name);
  const inDocs = MX.documents.filter(d => JSON.stringify(d).toLowerCase().includes(q)).map(d=>'[Dokument] '+d.id+' '+d.type);
  const inAudit = MX.audit.filter(a => JSON.stringify(a).toLowerCase().includes(q)).map(a=>'[Audit] '+a.type);
  alert(([...inCustomers, ...inDocs, ...inAudit].slice(0,50).join('\n')) || 'Inga träffar.');
}

async function loadDemo(){
  try{
    const [c,d] = await Promise.all([
      fetch('./assets/demo/customers.json').then(r=>r.json()),
      fetch('./assets/demo/orders.json').then(r=>r.json())
    ]);
    MX.customers = c; MX.documents = d;
  }catch(e){ console.warn('Demo-data kunde inte laddas', e); }
}

function init(){
  document.getElementById('roleSel').value = MX.role;
  document.getElementById('langSel').value = MX.lang;
  document.getElementById('themeSel').value = MX.theme;
  setTheme(MX.theme);

  document.getElementById('roleSel').onchange = e=>{ MX.role=e.target.value; MX.save(); init(); };
  document.getElementById('langSel').onchange = e=>{ MX.lang=e.target.value; MX.save(); };
  document.getElementById('themeSel').onchange = e=> setTheme(e.target.value);

  document.getElementById('searchBtn').onclick = globalSearch;
  document.getElementById('globalSearch').addEventListener('keydown', e=>{
    if((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); e.target.focus(); }
    if(e.key==='Enter'){ e.preventDefault(); globalSearch(); }
  });

  route();
}

window.addEventListener('hashchange', route);
window.addEventListener('load', async () => {
  SoundFX.init();
  await mountLogo();
  await loadDemo();
  init();
});
