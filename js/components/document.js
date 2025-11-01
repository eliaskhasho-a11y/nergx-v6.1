
MX.register('document', el => {
  el.innerHTML = `
    <div class="header">
      <div class="flex"><div style="font-weight:700">Dokumentflöde</div><span class="pill">${MX.documents.length} dokument</span></div>
      <div class="flex"><button id="newQ">+ Offert</button><button id="newO">+ Order</button><button id="newI">+ Faktura</button></div>
    </div>
    <div class="card">
      <table class="table">
        <thead><tr><th>ID</th><th>Typ</th><th>Kund</th><th>Belopp</th><th>Status</th><th></th></tr></thead>
        <tbody id="tb"></tbody>
      </table>
    </div>
  `;
  const tb = el.querySelector('#tb');
  function row(d,i){ return `<tr>
    <td>${d.id}</td><td>${d.type}</td><td>${d.customer||'-'}</td><td>${(d.total||0).toLocaleString('sv-SE')} kr</td><td>${d.status}</td>
    <td>${d.type!=='Faktura'?`<button data-i="${i}" class="fwd">Stega vidare</button>`:''} <button data-i="${i}" class="pdf">PDF</button> <button data-i="${i}" class="del">Ta bort</button></td></tr>`; }
  function render(){ tb.innerHTML = MX.documents.map(row).join('') || '<tr><td colspan="6" class="small">Inga dokument.</td></tr>'; }
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
});
