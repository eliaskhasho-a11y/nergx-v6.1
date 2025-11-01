
import { SoundFX } from './soundfx.js';

const MX = window.MX = {
  role: localStorage.getItem('mx_role') || 'Admin',
  lang: localStorage.getItem('mx_lang') || 'sv',
  theme: 'light',
  notices: [], aiLog: [], audit: [],
  kpi: { todayRevenue: 324500, todayOrders: 71, gmPct: 62, mtdRevenue: 1214500 },
  customers: [], documents: [],
  workflows: [],
  save(){ localStorage.setItem('mx_role', this.role); localStorage.setItem('mx_lang', this.lang); localStorage.setItem('mx_audit', JSON.stringify(this.audit.slice(0,500))); },
  pushAudit(evt){ this.audit.unshift({ts:Date.now(), ...evt}); this.save(); }
};

const routesByRole = {
  Admin     : ['dashboard','crm','economy','document','automation','chat','map','audit','settings'],
  Ekonomi   : ['dashboard','economy','document','audit','settings'],
  Sälj      : ['dashboard','crm','document','map','chat','settings'],
  Lager     : ['dashboard','document','map','settings'],
  Kundtjänst: ['dashboard','crm','chat','settings']
};
const labels = { dashboard:'Översikt', crm:'Kunder / CRM', economy:'Ekonomi / Budget', document:'Dokument', automation:'Automation', chat:'Chatt', map:'AI-Karta', audit:'Audit-logg', settings:'Inställningar' };

function svgMini(values=[], color='#3b82f6'){
  const w=240,h=46,p=4; const max=Math.max(...values,1); const step=(w-2*p)/(values.length-1||1);
  const pts = values.map((v,i)=> `${p+i*step},${h-p - (h-2*p)*(v/max)}`).join(' ');
  return `<svg class="miniChart" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><polyline fill="none" stroke="${color}" stroke-width="2" points="${pts}"/></svg>`;
}

const Views = {
  dashboard(el){
    const k1=[8,9,10,9,11,12,13,12,13,14,15,14];
    const k2=[2,4,3,5,6,5,7,6,7,9,8,7];
    const k3=[50,52,51,55,54,57,58,59,60,61,62,62];

    el.innerHTML = `
      <div class="header">
        <div class="brand" style="padding:0">
          <div class="logo" id="logoHost" aria-label="MergX"></div>
          <div><b>MergX</b> <span class="small">v7.6 Online</span></div>
        </div>
        <div class="small">⌘/Ctrl+K för global sök</div>
      </div>

      <div class="cards">
        <div class="card">
          <div class="small">Omsättning idag</div>
          <div class="kpi">${MX.kpi.todayRevenue.toLocaleString('sv-SE')} kr</div>
          ${svgMini(k1,'#3b82f6')}
          <div class="small">+12% mot igår</div>
        </div>
        <div class="card">
          <div class="small">Order idag</div>
          <div class="kpi">${MX.kpi.todayOrders}</div>
          ${svgMini(k2,'#06b6d4')}
          <div class="small">3 B2B</div>
        </div>
        <div class="card">
          <div class="small">Bruttomarginal</div>
          <div class="kpi">${MX.kpi.gmPct} %</div>
          ${svgMini(k3,'#7c3aed')}
          <div class="small">Stabil</div>
        </div>
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
          <div class="small">AI Coach 2.0 (Enter skickar)</div>
          <div class="kit">
            <input id="coachInput" placeholder="Ex: 'Prognos november' eller 'Risk för sena betalningar?'" style="flex:1">
            <button id="coachSend" class="btn primary">Skicka</button>
          </div>
          <div class="notice" id="coachLog"></div>
        </div>
      </div>

      <div class="row" style="margin-top:8px">
        <div class="card">
          <div class="small">🎧 Ljud & AI-feedback</div>
          <div class="kit">
            <button id="testSound" class="btn">🔊 Testa ljud</button>
            <button id="resetSound" class="btn">Återställ ljudprofil</button>
            <span class="small" id="soundState" style="margin-left:auto"></span>
          </div>
          <div class="alert small" style="margin-top:8px">AI: “Välkommen! Jag håller koll på budget, kundflöden och lager. Säg till så skapar jag en automatisering.”</div>
        </div>
        <div class="card">
          <div class="small">Snabbgenvägar</div>
          <div class="kit">
            <a class="btn" href="#/document">+ Order</a>
            <a class="btn" href="#/crm">+ Ny kund</a>
            <a class="btn" href="#/automation">Automation</a>
          </div>
        </div>
      </div>
    `;

    (async ()=>{
      try{ const svg=await (await fetch('./assets/icons/logo_mergx.svg')).text(); document.getElementById('logoHost').innerHTML = svg; }catch{}
    })();

    // notices
    const nb = el.querySelector('#noticeBox');
    const renderNotices = ()=> nb.innerHTML = MX.notices.slice(-80).map(n=>`<div class="small">[${n.level}] ${n.msg}</div>`).join('');
    el.querySelector('#addInfo').onclick = ()=>{ MX.notices.push({level:'INFO', msg:'Order #'+(1000+Math.floor(Math.random()*9000))+' bokad'}); renderNotices(); };
    el.querySelector('#addWarn').onclick = ()=>{ MX.notices.push({level:'WARN', msg:'Låg lager: CAR-CHG-60W'}); renderNotices(); };
    el.querySelector('#clear').onclick  = ()=>{ MX.notices=[]; renderNotices(); };
    renderNotices();

    // AI coach mock
    const input = el.querySelector('#coachInput'); const log = el.querySelector('#coachLog');
    const replyFor = (q)=>{
      const s=q.toLowerCase();
      if(s.includes('prognos')) return "Prognos: +8% mot oktober, drivet av B2B i Stockholm. Rek: dubbla lager CAR-CHG-60W.";
      if(s.includes('risk') || s.includes('sen')) return "Risk: 3 kunder försenade >7 dagar. Rek: skicka påminnelse + ring toppkund.";
      if(s.includes('budget')) return "Budget: 76% uppnått. Kostnader inom plan. Rek: flytta 10k till konverterande kanal.";
      return "Förstår. Vill du att jag skapar ett automatiseringsflöde för detta?";
    };
    const send = ()=>{
      const v = input.value.trim(); if(!v) return;
      MX.aiLog.push("Du: "+v);
      MX.aiLog.push("AI: "+replyFor(v));
      input.value=''; log.innerHTML = MX.aiLog.slice(-12).map(x=>`<div class="small">${x}</div>`).join('');
      SoundFX.success(); MX.pushAudit({type:'ai.query', actor:MX.role, detail:v});
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
          <div class="small">Budget (månad)</div><input id="b" type="number" value="320000" style="width:220px"/>
          <div class="small">Kostnader (månad)</div><input id="c" type="number" value="110000" style="width:220px"/>
          <div class="small">Omsättning hittills</div><input id="r" type="number" value="${MX.kpi.mtdRevenue}" style="width:220px"/>
          <div style="margin-top:10px"><button id="calc" class="btn">Beräkna prognos</button></div>
        </div>
        <div class="card"><div class="small">Prognos</div><div id="o" class="kpi">–</div></div>
      </div>
    `;
    const b=el.querySelector('#b'), c=el.querySelector('#c'), r=el.querySelector('#r'], o=el.querySelector('#o');
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

  automation(el){
    el.innerHTML = `
      <div class="header"><b>Automation Studio</b> <span class="small">n8n-lik editor (stub)</span></div>
      <div class="card">
        <div class="small">Snabbstart</div>
        <div class="kit" style="margin:8px 0">
          <button id="flowOverdue" class="btn">Skapa: Påminnelse vid sen faktura</button>
          <button id="flowBudget" class="btn">Skapa: Budgetavvikelse > 10%</button>
          <button id="flowLead" class="btn">Skapa: Ny lead från karta → CRM</button>
        </div>
        <div class="alert small" id="flowOut">Inget flöde skapat ännu.</div>
      </div>
    `;
    const out = el.querySelector('#flowOut');
    const mk = (name, steps)=>{
      MX.workflows.unshift({ name, steps, ts: Date.now() });
      out.textContent = `Skapat flöde: ${name} (${steps.length} steg)`;
      SoundFX.success(); MX.pushAudit({type:'flow.new', actor:MX.role, detail:name});
    };
    el.querySelector('#flowOverdue').onclick = ()=> mk("Påminnelse vid sen faktura", ["Trigger: Faktura > 7d sen", "Action: Notis", "Action: Skicka e-post"]);
    el.querySelector('#flowBudget').onclick = ()=> mk("Budgetavvikelse > 10%", ["Trigger: Prognosdiff > 10%", "Action: AI-rekommendation", "Action: Notis"]);
    el.querySelector('#flowLead').onclick   = ()=> mk("Ny lead från karta → CRM", ["Trigger: Ny POI", "Action: Skapa kund i CRM", "Action: Tilldela sälj"]);
  },

  chat(el){
    el.innerHTML = `
      <div class="header"><b>Teamchatt</b> <span class="small">Enter skickar</span></div>
      <div class="card">
        <div id="chatLog" class="notice" style="height:220px"></div>
        <div class="kit" style="margin-top:8px"><input id="chatInput" placeholder="Skriv ett meddelande..." style="flex:1"><button id="chatSend" class="btn">Skicka</button></div>
      </div>
    `;
    const log = el.querySelector('#chatLog'); const list = [];
    const render = ()=> log.innerHTML = list.slice(-60).map(x=>`<div class="small">${x}</div>`).join('');
    const send = ()=>{ const v=el.querySelector('#chatInput').value.trim(); if(!v)return; list.push(MX.role+': '+v); el.querySelector('#chatInput').value=''; render(); SoundFX.navTap(); };
    el.querySelector('#chatSend').onclick=send;
    el.querySelector('#chatInput').addEventListener('keydown', e=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); send(); }});
  },

  map(el){
    el.innerHTML = `
      <div class="header"><b>AI-Karta</b> <span class="small">beta</span></div>
      <div class="card">
        <div class="alert small">Kartlayout stub – klick i kommande versioner visar sälj per region + rekommendationer.</div>
      </div>
    `;
  },

  audit(el){
    const rows = MX.audit.map(a=>`<div class="small">${new Date(a.ts).toLocaleString()} — <b>${a.type}</b> — ${a.actor||'-'} — ${a.detail||''}</div>`).join('') || '<div class="small">Tom logg.</div>';
    el.innerHTML = `<div class="header"><b>Audit-logg</b> <span class="badge">${MX.audit.length} händelser</span></div><div class="card"><div class="notice" style="height:240px">${rows}</div></div>`;
  },

  settings(el){
    el.innerHTML = `
      <div class="header"><b>Inställningar</b></div><hr/>
      <div class="grid">
        <label class="small">Roll</label>
        <select id="role"><option>Admin</option><option>Ekonomi</option><option>Sälj</option><option>Lager</option><option>Kundtjänst</option></select>
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
    const r=el.querySelector('#role'), l=el.querySelector('#lang'); r.value=MX.role; l.value=MX.lang;
    r.onchange = ()=>{ MX.role=r.value; MX.save(); init(); };
    l.onchange = ()=>{ MX.lang=l.value; MX.save(); alert('Språk sparat (stub)'); };

    const ch=el.querySelector('#soundEnabled'), vol=el.querySelector('#soundVolume'), out=el.querySelector('#soundVolumeVal'];
    const s=SoundFX.state(); ch.checked=s.enabled; vol.value=s.volume; out.textContent=Math.round(s.volume*100)+'%';
    ch.addEventListener('change', e=> SoundFX.setEnabled(e.target.checked));
    vol.addEventListener('input', e=>{ SoundFX.setVolume(parseFloat(e.target.value)); out.textContent=Math.round(e.target.value*100)+'%'; });
    el.querySelector('#testSound').addEventListener('click', ()=>{ SoundFX.success(); setTimeout(()=>SoundFX.paneOpen(), 280); setTimeout(()=>SoundFX.navTap(), 560); });
  }
};

function buildNav(){
  const nav = document.getElementById('nav');
  const allowed = routesByRole[MX.role] || [];
  nav.innerHTML = allowed.map(r => `<a href="#/${r}" data-route="${r}" data-nav>${labels[r]}</a>`).join('');
  const a = location.hash.replace('#/','') || 'dashboard';
  [...nav.querySelectorAll('a')].forEach(x => x.classList.toggle('active', x.dataset.route===a));
  nav.querySelectorAll('[data-nav]').forEach(el=> el.addEventListener('click', ()=> SoundFX.navTap(), {passive:true}));
}

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
    const [c,d,a] = await Promise.all([
      fetch('./assets/demo/customers.json').then(r=>r.json()),
      fetch('./assets/demo/documents.json').then(r=>r.json()),
      fetch('./assets/demo/audit.json').then(r=>r.json())
    ]);
    MX.customers=c; MX.documents=d; MX.audit=a;
  }catch(e){ console.warn('Demo kunde inte laddas', e); }
}

function init(){
  document.getElementById('roleSel').value = MX.role;
  document.getElementById('langSel').value = MX.lang;
  document.getElementById('roleSel').onchange = e=>{ MX.role=e.target.value; MX.save(); init(); };
  document.getElementById('langSel').onchange = e=>{ MX.lang=e.target.value; MX.save(); };
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
  await loadDemo();
  // inject logo once at load for sidebar
  try{ const svg=await (await fetch('./assets/icons/logo_mergx.svg')).text(); document.getElementById('logoHost').innerHTML = svg; }catch{}
  init();
});
