
MX.register('dashboard', el => {
  el.innerHTML = `
    <div class="header">
      <div class="flex">
        <div style="font-weight:700">Översikt</div>
        <span class="pill">Roll: ${MX.role}</span>
      </div>
      <div class="small">Global sök: <kbd>⌘/Ctrl</kbd> + <kbd>K</kbd></div>
    </div>
    <div class="cards">
      <div class="card"><div class="small">Omsättning idag</div><div class="kpi">${MX.kpi.revenue.toLocaleString('sv-SE')} kr</div><div class="small">+12% mot igår</div></div>
      <div class="card"><div class="small">Order idag</div><div class="kpi">${MX.kpi.orders}</div><div class="small">3 B2B</div></div>
      <div class="card"><div class="small">Bruttomarginal</div><div class="kpi">${Math.round(MX.kpi.gm*100)} %</div><div class="small">Stabil</div></div>
    </div>
    <div class="row">
      <div class="card">
        <div class="small">Notiscenter</div>
        <div class="notice" id="noticeBox"></div>
        <div class="flex" style="margin-top:8px">
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
  // Notiscenter
  const nb = el.querySelector('#noticeBox');
  function renderNotices(){ nb.innerHTML = MX.notices.slice(-80).map(n=>`<div class="small">[${n.level}] ${n.msg}</div>`).join(''); }
  el.querySelector('#addInfo').onclick = ()=>{ MX.notices.push({level:'INFO', msg:'Order #'+(1000+Math.floor(Math.random()*9000))+' bokad'}); renderNotices(); };
  el.querySelector('#addWarn').onclick = ()=>{ MX.notices.push({level:'WARN', msg:'Låg lager: CAR-CHG-60W'}); renderNotices(); };
  el.querySelector('#clear').onclick = ()=>{ MX.notices = []; renderNotices(); };
  renderNotices();

  // AI Coach mock
  const input = el.querySelector('#coachInput'); const log = el.querySelector('#coachLog');
  function send(){
    const v = input.value.trim(); if(!v) return;
    MX.aiLog.push("Du: "+v);
    MX.aiLog.push("AI: Rek – kontakta förfallna kunder, öka kampanj i Syd, justera prislista B2B-låg.");
    input.value=''; log.innerHTML = MX.aiLog.slice(-10).map(x=>`<div class="small">${x}</div>`).join('');
    MX.pushAudit({type:'ai.query', actor: MX.role, detail: v});
  }
  input.addEventListener('keydown', e=>{ if(e.key==='Enter'){ e.preventDefault(); send(); }});
});
