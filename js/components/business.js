
MX.register('business', el => {
  el.innerHTML = `
    <div class="header">
      <div class="flex"><div style="font-weight:700">Affärssidor</div>
        <span class="pill">${MX.businessPages.length} sidor</span></div>
      <div class="flex">
        <button id="gen">+ Generera sida från kund</button>
      </div>
    </div>
    <div class="card">
      <table class="table"><thead><tr><th>Titel</th><th>Kund</th><th>Senast</th><th></th></tr></thead>
        <tbody id="tb"></tbody></table>
    </div>
    <div class="card">
      <div class="small">Förhandsgranskning</div>
      <div id="preview" class="audit">—</div>
    </div>
  `;
  const tb = el.querySelector('#tb'); const pv = el.querySelector('#preview');
  function row(d,i){ return `<tr><td>${d.title}</td><td>${d.customer||'-'}</td><td>${new Date(d.ts).toLocaleString()}</td>
    <td><button data-i="${i}" class="open">Öppna</button> <button data-i="${i}" class="del">Ta bort</button></td></tr>`; }
  function render(){ tb.innerHTML = MX.businessPages.map(row).join('') || `<tr><td colspan="4" class="small">Inga sidor än.</td></tr>`; }
  render();

  el.addEventListener('click', e=>{
    if(e.target.id==='gen'){
      const c = MX.customers[0] || {name:'Okänd'};
      const doc = {
        title: 'Affärssida – '+c.name,
        customer: c.name,
        ts: Date.now(),
        html: `<h3>${c.name}</h3><p class="small">Auto-sammanfattning (mock): Stabil GM, ökad omsättning, prioriterad leverans. Nästa steg: kampanj Syd.</p>
               <ul class="small"><li>KPI: GM 62%</li><li>Order: 71 idag</li><li>Risk: Låg lager CAR-CHG-60W</li></ul>`
      };
      MX.businessPages.unshift(doc); MX.save(); render(); MX.pushAudit({type:'business.generated', actor:MX.role, detail:c.name});
    }
    if(e.target.classList.contains('open')){
      const d = MX.businessPages[+e.target.dataset.i]; pv.innerHTML = d.html;
    }
    if(e.target.classList.contains('del')){
      MX.businessPages.splice(+e.target.dataset.i,1); MX.save(); render();
    }
  });
});
