
(function(){
  const MX = window.MX = {
    role: localStorage.getItem('mx_role') || 'Admin',
    lang: localStorage.getItem('mx_lang') || 'sv',
    notices: [], aiLog: [], audit: JSON.parse(localStorage.getItem('mx_audit')||'[]'),
    kpi: { revenue: 324500, orders: 71, gm: 0.62 },
    customers: JSON.parse(localStorage.getItem('mx_customers') || '[]'),
    businessPages: JSON.parse(localStorage.getItem('mx_biz') || '[]'),
    documents: JSON.parse(localStorage.getItem('mx_docs') || '[]'),
    workflows: JSON.parse(localStorage.getItem('mx_wf') || '[]'),
    mapPoints: JSON.parse(localStorage.getItem('mx_map') || '[{"x":140,"y":140,"name":"Stock Wireless"},{"x":260,"y":190,"name":"Nordic Mobile"}]'),
    save(){
      localStorage.setItem('mx_role', this.role);
      localStorage.setItem('mx_lang', this.lang);
      localStorage.setItem('mx_audit', JSON.stringify(this.audit.slice(0,500)));
      localStorage.setItem('mx_customers', JSON.stringify(this.customers));
      localStorage.setItem('mx_biz', JSON.stringify(this.businessPages));
      localStorage.setItem('mx_docs', JSON.stringify(this.documents));
      localStorage.setItem('mx_wf', JSON.stringify(this.workflows));
      localStorage.setItem('mx_map', JSON.stringify(this.mapPoints));
    },
    pushAudit(evt){ this.audit.unshift({ts:Date.now(), ...evt}); this.save(); },
    API: {
      coach: 'https://api.mergx.ai/coach',
      notify: 'https://api.mergx.ai/notify',
      frakt: 'https://api.fraktjakt.se/order',
      whatsapp: 'https://api.mergx.ai/whatsapp'
    }
  };
  if (MX.customers.length===0){
    MX.customers = [
      {name:'Elon Ljud & Bild Västerås', org:'556677-8899', person:'Sara', mail:'sara@elon.se', tel:'070-1234567', tags:'B2B, Retail'},
      {name:'Mekonomen City', org:'112233-4455', person:'Tomas', mail:'tomas@mekonomen.se', tel:'070-7654321', tags:'B2B, Auto'}
    ];
    MX.save();
  }

  const routesByRole = {
    Admin     : ['dashboard','business','crm','economy','document','workflow','map','audit','settings'],
    Ekonomi   : ['dashboard','business','economy','document','audit','settings'],
    Sälj      : ['dashboard','business','crm','document','map','settings'],
    Lager     : ['dashboard','document','map','settings'],
    Kundtjänst: ['dashboard','business','crm','settings']
  };
  const labels = {
    dashboard:'Översikt', business:'Affärssidor', crm:'Kunder / CRM', economy:'Ekonomi / Budget',
    document:'Dokumentflöde', workflow:'Automation', map:'AI-Karta', audit:'Audit-logg', settings:'Inställningar'
  };

  function buildNav(){
    const nav = document.getElementById('nav');
    const allowed = routesByRole[MX.role] || [];
    nav.innerHTML = allowed.map(r => `<a href="#/${r}" data-route="${r}">${labels[r]}</a>`).join('');
    const a = location.hash.replace('#/','') || 'dashboard';
    [...nav.querySelectorAll('a')].forEach(x => x.classList.toggle('active', x.dataset.route===a));
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
            <div style="margin-top:8px;display:flex;gap:8px">
              <button id="addInfo">+ Info</button>
              <button id="addWarn">+ Varning</button>
              <button id="clear">Rensa</button>
            </div>
          </div>
          <div class="card">
            <div class="small">AI Coach (Enter för att skicka)</div>
            <div class="coach">
              <input id="coachInput" placeholder="Skriv t.ex. 'Vilka kunder riskerar sen betalning?'"/>
              <div class="notice" id="coachLog"></div>
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
      async function send(){
        const v = input.value.trim(); if(!v) return;
        MX.aiLog.push("Du: "+v);
        try{
          // const res = await fetch(MX.API.coach, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({message:v, role: MX.role})});
          // const data = await res.json();
          const data = { reply: "AI: Rek – kontakta förfallna kunder, öka kampanj i Syd, justera prislista B2B-låg." };
          MX.aiLog.push(data.reply);
        }catch(e){
          MX.aiLog.push("AI: (mock) – nätverk fel, visar standardrekommendation.");
        }
        input.value=''; log.innerHTML = MX.aiLog.slice(-12).map(x=>`<div class="small">${x}</div>`).join('');
        MX.pushAudit({type:'ai.query', actor: MX.role, detail: v});
      }
      input.addEventListener('keydown', e=>{ if(e.key==='Enter'){ e.preventDefault(); send(); }});
    },

    business(el){
      el.innerHTML = `
        <div class="header">
          <div><b>Affärssidor</b> <span class="badge">${MX.businessPages.length} sidor</span></div>
          <div><button id="gen">+ Generera sida från kund</button></div>
        </div>
        <div class="card">
          <table class="table"><thead><tr><th>Titel</th><th>Kund</th><th>Senast</th><th></th></tr></thead><tbody id="tb"></tbody></table>
        </div>
        <div class="card"><div class="small">Förhandsgranskning</div><div class="notice" id="preview">—</div></div>
      `;
      const tb = el.querySelector('#tb'); const pv = el.querySelector('#preview');
      const row = (d,i)=> `<tr><td>${d.title}</td><td>${d.customer||'-'}</td><td>${new Date(d.ts).toLocaleString()}</td>
        <td><button data-i="${i}" class="open">Öppna</button> <button data-i="${i}" class="del">Ta bort</button></td></tr>`;
      const render = ()=> tb.innerHTML = MX.businessPages.map(row).join('') || `<tr><td colspan="4" class="small">Inga sidor än.</td></tr>`;
      render();
      el.addEventListener('click', e=>{
        if(e.target.id==='gen'){
          const c = MX.customers[0] || {name:'Okänd'};
          const doc = { title: 'Affärssida – '+c.name, customer:c.name, ts:Date.now(),
            html:`<h3>${c.name}</h3><p class="small">Auto-sammanfattning (mock): Stabil GM, ökad omsättning, prioriterad leverans. Nästa steg: kampanj Syd.</p>
                  <ul class="small"><li>KPI: GM 62%</li><li>Order: 71 idag</li><li>Risk: Låg lager CAR-CHG-60W</li></ul>` };
          MX.businessPages.unshift(doc); MX.save(); render(); MX.pushAudit({type:'business.generated', actor:MX.role, detail:c.name});
        }
        if(e.target.classList.contains('open')){ const d = MX.businessPages[+e.target.dataset.i]; pv.innerHTML = d.html; }
        if(e.target.classList.contains('del')){ MX.businessPages.splice(+e.target.dataset.i,1); MX.save(); render(); }
      });
    },

    document(el){
      el.innerHTML = `
        <div class="header">
          <div><b>Dokumentflöde</b> <span class="badge">${MX.documents.length} dokument</span></div>
          <div><button id="newQ">+ Offert</button><button id="newO">+ Order</button><button id="newI">+ Faktura</button></div>
        </div>
        <div class="card">
          <table class="table">
            <thead><tr><th>ID</th><th>Typ</th><th>Kund</th><th>Belopp</th><th>Status</th><th></th></tr></thead>
            <tbody id="tb"></tbody>
          </table>
        </div>
      `;
      const tb = el.querySelector('#tb');
      const row = (d,i)=> `<tr>
        <td>${d.id}</td><td>${d.type}</td><td>${d.customer||'-'}</td><td>${(d.total||0).toLocaleString('sv-SE')} kr</td><td>${d.status}</td>
        <td>${d.type!=='Faktura'?`<button data-i="${i}" class="fwd">Stega vidare</button>`:''} <button data-i="${i}" class="pdf">PDF</button> <button data-i="${i}" class="del">Ta bort</button></td></tr>`;
      const render = ()=> tb.innerHTML = MX.documents.map(row).join('') || '<tr><td colspan="6" class="small">Inga dokument.</td></tr>';
      render();
      function create(type){
        const c = MX.customers[0]?.name || 'Okänd Kund';
        const id = type[0]+ '-' + (10000 + Math.floor(Math.random()*90000));
        MX.documents.unshift({ id, type, customer:c, total: Math.round(25000 + Math.random()*90000), status:'Utkast', ts:Date.now() });
        MX.save(); render(); MX.pushAudit({type:'doc.new', actor:MX.role, detail:id});
      }
      el.querySelector('#newQ').onclick = ()=> create('Offert');
      el.querySelector('#newO').onclick = ()=> create('Order');
      el.querySelector('#newI').onclick = ()=> create('Faktura');
      el.addEventListener('click', e=>{
        if(e.target.classList.contains('fwd')){
          const d = MX.documents[+e.target.dataset.i];
          if(d.type==='Offert'){ d.type='Order'; d.status='Skapad'; }
          else if(d.type==='Order'){ d.type='Faktura'; d.status='Obetald'; }
          MX.save(); render(); MX.pushAudit({type:'doc.advance', actor:MX.role, detail:d.id});
        }
        if(e.target.classList.contains('pdf')){
          const d = MX.documents[+e.target.dataset.i];
          const blob = new Blob([`Dokument ${d.id}\nTyp: ${d.type}\nKund: ${d.customer}\nBelopp: ${d.total} kr\nStatus: ${d.status}`], {type:'text/plain'});
          const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=d.id+'.txt'; a.click();
          MX.pushAudit({type:'doc.pdf', actor:MX.role, detail:d.id});
        }
        if(e.target.classList.contains('del')){
          MX.documents.splice(+e.target.dataset.i,1); MX.save(); render(); MX.pushAudit({type:'doc.del', actor:MX.role});
        }
      });
    },

    economy(el){
      el.innerHTML = `
        <div class="header"><b>Ekonomi / Budget</b></div>
        <div class="row" style="margin-top:8px">
          <div class="card">
            <div class="small">Budget (månad)</div><input id="b" type="number" value="320000" style="width:200px"/>
            <div class="small">Kostnader (månad)</div><input id="c" type="number" value="110000" style="width:200px"/>
            <div class="small">Omsättning hittills</div><input id="r" type="number" value="${MX.kpi.revenue}" style="width:200px"/>
            <div style="margin-top:10px"><button id="calc">Beräkna prognos</button></div>
          </div>
          <div class="card"><div class="small">Prognos</div><div id="o" class="kpi">–</div></div>
        </div>
      `;
      const b=el.querySelector('#b'), c=el.querySelector('#c'), r=el.querySelector('#r'), o=el.querySelector('#o');
      function calc(){ const profit=(+r.value)-(+c.value); const pct=Math.round(Math.min(1,Math.max(0,profit/(+b.value)))*100); o.textContent=profit.toLocaleString('sv-SE')+' kr | '+pct+' % mot budget'; }
      calc(); el.querySelector('#calc').onclick = calc;
    },

    crm(el){
      el.innerHTML = `
        <div class="header">
          <div><b>Kunder / CRM</b> <span class="badge">${MX.customers.length} kunder</span></div>
          <div><button id="new">Ny kund</button> <button id="exp">Export</button> <button id="imp">Import</button></div>
        </div>
        <div class="card">
          <table class="table"><thead><tr><th>Namn</th><th>Org.nr</th><th>Kontakt</th><th>E-post</th><th>Tel</th><th>Taggar</th><th></th></tr></thead>
          <tbody id="tb"></tbody></table>
        </div>
      `;
      const tb = el.querySelector('#tb');
      const row = (c,i)=> `<tr>
        <td contenteditable data-f="name">${c.name||''}</td>
        <td contenteditable data-f="org">${c.org||''}</td>
        <td contenteditable data-f="person">${c.person||''}</td>
        <td contenteditable data-f="mail">${c.mail||''}</td>
        <td contenteditable data-f="tel">${c.tel||''}</td>
        <td contenteditable data-f="tags">${c.tags||''}</td>
        <td><button data-i="${i}" class="del">Ta bort</button></td></tr>`;
      const render = ()=> tb.innerHTML = MX.customers.map(row).join('') || '<tr><td colspan="7" class="small">Inga kunder.</td></tr>';
      render();
      tb.addEventListener('input', e=>{
        const tr = e.target.closest('tr'); const i=[...tb.children].indexOf(tr); const f=e.target.dataset.f;
        MX.customers[i][f]=e.target.textContent; MX.save();
      });
      tb.addEventListener('click', e=>{ if(e.target.classList.contains('del')){ MX.customers.splice(+e.target.dataset.i,1); MX.save(); render(); MX.pushAudit({type:'crm.delete', actor:MX.role}); }});
      el.querySelector('#new').onclick = ()=>{ MX.customers.push({name:'Ny kund'}); MX.save(); render(); MX.pushAudit({type:'crm.new', actor:MX.role}); };
      el.querySelector('#exp').onclick = ()=>{ const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([JSON.stringify(MX.customers,null,2)],{type:'application/json'})); a.download='customers.json'; a.click(); };
      el.querySelector('#imp').onclick = ()=>{ const i=document.createElement('input'); i.type='file'; i.accept='.json'; i.onchange=()=>{ const f=i.files[0]; if(!f)return; const fr=new FileReader(); fr.onload=()=>{ try{ MX.customers=JSON.parse(fr.result); MX.save(); render(); MX.pushAudit({type:'crm.import', actor:MX.role}); }catch(e){ alert('Ogiltig JSON'); } }; fr.readAsText(f); }; i.click(); };
    },

    workflow(el){
      el.innerHTML = `
        <div class="header"><b>Automation</b> <span class="small">Skissa flöden (drag & drop)</span></div>
        <div class="card"><div id="wf" class="workflow"></div></div>
        <div class="footer"><div></div><div><button id="addT">+ Trigger</button> <button id="addA">+ Action</button> <button id="save">Spara</button> <button id="load">Läs in</button></div></div>
      `;
      const wf=el.querySelector('#wf');
      function node(title,x,y){ const n=document.createElement('div'); n.className='node'; n.style.left=x+'px'; n.style.top=y+'px'; n.innerHTML='<div class="small">'+title+'</div><input placeholder="param…" style="width:100%;margin-top:6px"/>'; 
        let drag=false,dx=0,dy=0; n.addEventListener('pointerdown',e=>{drag=true;n.setPointerCapture(e.pointerId);dx=e.offsetX;dy=e.offsetY});
        n.addEventListener('pointermove',e=>{ if(drag){ n.style.left=(e.offsetX-dx)+'px'; n.style.top=(e.offsetY-dy)+'px'; }});
        n.addEventListener('pointerup',()=>drag=false); wf.appendChild(n); return n; }
      function serialize(){ return {nodes:[...wf.querySelectorAll('.node')].map(n=>({title:n.querySelector('.small').textContent,x:+n.style.left.replace('px',''),y:+n.style.top.replace('px',''),param:n.querySelector('input').value}))}; }
      function restore(d){ wf.innerHTML=''; (d.nodes||[]).forEach(n=>{ const nn=node(n.title,n.x,n.y); nn.querySelector('input').value=n.param||''; }); }
      el.querySelector('#addT').onclick = ()=> node('Trigger: Ny order',40+Math.random()*120,40+Math.random()*100);
      el.querySelector('#addA').onclick = ()=> node('Action: Skicka e-post',240+Math.random()*160,200+Math.random()*120);
      el.querySelector('#save').onclick = ()=>{ MX.workflows=[serialize()]; MX.save(); MX.pushAudit({type:'wf.save', actor:MX.role}); alert('Flöde sparat'); };
      el.querySelector('#load').onclick = ()=>{ const d=MX.workflows[0]; d?restore(d):alert('Inget sparat flöde'); };
      node('Trigger: Ny kund',40,60); node('Action: Skapa onboarding',280,220);
    },

    map(el){
      el.innerHTML = `
        <div class="header"><b>AI-Karta</b> <span class="small">Drar markörer, spara</span> <div></div></div>
        <div class="card"><div id="m" class="map"></div></div>
        <div class="footer"><div></div><div><button id="save">Spara</button></div></div>
      `;
      const m=el.querySelector('#m');
      function add(p){ const d=document.createElement('div'); d.className='marker'; d.title=p.name||'punkt'; d.style.left=p.x+'px'; d.style.top=p.y+'px'; m.appendChild(d);
        let drag=false,dx=0,dy=0; d.addEventListener('pointerdown',e=>{drag=true;d.setPointerCapture(e.pointerId);dx=e.offsetX;dy=e.offsetY});
        d.addEventListener('pointermove',e=>{ if(drag){ d.style.left=(e.offsetX-dx)+'px'; d.style.top=(e.offsetY-dy)+'px'; }});
        d.addEventListener('pointerup',()=>drag=false);
      }
      MX.mapPoints.forEach(add);
      el.querySelector('#save').onclick = ()=>{
        MX.mapPoints = [...m.querySelectorAll('.marker')].map(d=>({x:parseInt(d.style.left), y:parseInt(d.style.top), name:d.title}));
        MX.save(); MX.pushAudit({type:'map.save', actor:MX.role}); alert('Karta sparad.');
      };
    },

    audit(el){
      el.innerHTML = `
        <div class="header"><b>Audit-logg</b> <span class="badge">${MX.audit.length} händelser</span></div>
        <div class="card"><div id="list" class="notice" style="height:240px"></div></div>
      `;
      const list=el.querySelector('#list');
      list.innerHTML = MX.audit.map(a=>`<div class="small">${new Date(a.ts).toLocaleString()} — <b>${a.type}</b> — ${a.actor||'-'} — ${a.detail||''}</div>`).join('') || '<div class="small">Tom logg.</div>';
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
      `;
      const r=el.querySelector('#role'), l=el.querySelector('#lang');
      r.value = MX.role; l.value = MX.lang;
      r.onchange = ()=>{ MX.role=r.value; MX.save(); init(); };
      l.onchange = ()=>{ MX.lang=l.value; MX.save(); alert('Språk sparat (stub)'); };
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
    if(!location.hash) location.hash = '#/dashboard';
    route();
  }

  function globalSearch(){
    const q = (document.getElementById('globalSearch').value||'').toLowerCase().trim(); if(!q) return alert('Skriv något att söka på.');
    const inCustomers = MX.customers.filter(c => JSON.stringify(c).toLowerCase().includes(q)).map(c=>'[Kund] '+c.name);
    const inDocs = MX.documents.filter(d => JSON.stringify(d).toLowerCase().includes(q)).map(d=>'[Dokument] '+d.id+' '+d.type);
    const inBiz = MX.businessPages.filter(b => JSON.stringify(b).toLowerCase().includes(q)).map(b=>'[Affärssida] '+b.title);
    const inAudit = MX.audit.filter(a => JSON.stringify(a).toLowerCase().includes(q)).map(a=>'[Audit] '+a.type);
    const result = [...inCustomers, ...inDocs, ...inBiz, ...inAudit].slice(0,50).join('\n');
    alert(result || 'Inga träffar.');
  }

  window.addEventListener('hashchange', route);
  window.addEventListener('load', init);
})();
