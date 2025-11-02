
App.routes['crm'] = (el)=>{
  el.innerHTML = `
    <div class="panel" style="padding:16px">
      <div class="flex">
        <div class="col">
          <div class="small" style="font-weight:600;margin-bottom:8px">Kunder</div>
          <input class="input" placeholder="Sök kund…">
          <div id="crmList" class="small" style="margin-top:10px"></div>
        </div>
        <div class="col">
          <div class="small" style="font-weight:600;margin-bottom:8px">Kundkort</div>
          <div id="crmCard" class="panel" style="padding:12px">
            <div class="small">Välj kund för att se detaljer.</div>
          </div>
        </div>
      </div>
    </div>`;

  const data = [
    {id:1,name:'Stock Wireless AB',notes:'Best NR: 10300-10306',value: 'B2B – stor kund'},
    {id:2,name:'Elon City',notes:'Brett sortiment',value:'B2C Retail'}
  ];
  const list = document.getElementById('crmList');
  list.innerHTML = data.map(k=>`<div style='padding:8px 0;border-bottom:1px solid #eee;cursor:pointer' data-id='${k.id}'>${k.name}<div class='small'>${k.value}</div></div>`).join('');

  list.addEventListener('click', e=>{
    const row = e.target.closest('[data-id]'); if(!row) return;
    const k = data.find(x=>x.id==row.dataset.id);
    const card = document.getElementById('crmCard');
    card.innerHTML = `
      <div style="font-weight:600">${k.name}</div>
      <div class="small">${k.notes}</div>
      <hr class="sep">
      <div class="small">AI‑svar (mock): ${k.name} visar stark omsättningstrend Q4. Förslag: öka kampanjtryck på kablar + bil‑laddare.</div>`;
  });
};
