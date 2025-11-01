
MX.register('crm', el => {
  el.innerHTML = `
    <div class="header">
      <div class="flex"><div style="font-weight:700">Kunder / CRM</div><span class="pill">${MX.customers.length} kunder</span></div>
      <div class="flex"><button id="new">Ny kund</button><button id="exp">Export</button><button id="imp">Import</button></div>
    </div>
    <div class="card">
      <table class="table"><thead><tr><th>Namn</th><th>Org.nr</th><th>Kontakt</th><th>E-post</th><th>Tel</th><th>Taggar</th><th></th></tr></thead>
      <tbody id="tb"></tbody></table>
    </div>
  `;
  const tb=el.querySelector('#tb');
  function tr(c,i){ return `<tr>
    <td contenteditable data-f="name">${c.name||''}</td>
    <td contenteditable data-f="org">${c.org||''}</td>
    <td contenteditable data-f="person">${c.person||''}</td>
    <td contenteditable data-f="mail">${c.mail||''}</td>
    <td contenteditable data-f="tel">${c.tel||''}</td>
    <td contenteditable data-f="tags">${c.tags||''}</td>
    <td><button data-i="${i}" class="del">Ta bort</button></td>
  </tr>`;}
  function render(){ tb.innerHTML = MX.customers.map(tr).join('') || '<tr><td colspan="7" class="small">Inga kunder.</td></tr>'; }
  render();
  tb.addEventListener('input', e=>{
    const tr = e.target.closest('tr'); const i=[...tb.children].indexOf(tr); const f=e.target.dataset.f;
    MX.customers[i][f]=e.target.textContent; MX.save();
  });
  tb.addEventListener('click', e=>{ if(e.target.classList.contains('del')){ MX.customers.splice(+e.target.dataset.i,1); MX.save(); render(); MX.pushAudit({type:'crm.delete', actor:MX.role}); }});
  el.querySelector('#new').onclick = ()=>{ MX.customers.push({name:'Ny kund'}); MX.save(); render(); MX.pushAudit({type:'crm.new', actor:MX.role}); };
  el.querySelector('#exp').onclick = ()=>{ const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([JSON.stringify(MX.customers,null,2)],{type:'application/json'})); a.download='customers.json'; a.click(); };
  el.querySelector('#imp').onclick = ()=>{ const i=document.createElement('input'); i.type='file'; i.accept='.json'; i.onchange=()=>{ const f=i.files[0]; if(!f)return; const fr=new FileReader(); fr.onload=()=>{ try{ MX.customers=JSON.parse(fr.result); MX.save(); render(); MX.pushAudit({type:'crm.import', actor:MX.role}); }catch(e){ alert('Ogiltig JSON'); } }; fr.readAsText(f); }; i.click(); };
});
