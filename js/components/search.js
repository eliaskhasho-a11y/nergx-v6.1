
(function(){
  const input = document.getElementById('globalSearch');
  const btn = document.getElementById('searchBtn');
  function run(){
    const q = (input.value||'').toLowerCase().trim(); if(!q) return alert('Skriv något att söka på.');
    const inCustomers = MX.customers.filter(c => JSON.stringify(c).toLowerCase().includes(q)).map(c=>'[Kund] '+c.name);
    const inDocs = MX.documents.filter(d => JSON.stringify(d).toLowerCase().includes(q)).map(d=>'[Dokument] '+d.id+' '+d.type);
    const inBiz = MX.businessPages.filter(b => JSON.stringify(b).toLowerCase().includes(q)).map(b=>'[Affärssida] '+b.title);
    const inAudit = MX.audit.filter(a => JSON.stringify(a).toLowerCase().includes(q)).map(a=>'[Audit] '+a.type);
    const result = [...inCustomers, ...inDocs, ...inBiz, ...inAudit].slice(0,50).join('\n');
    alert(result || 'Inga träffar.');
  }
  btn.addEventListener('click', run);
  input.addEventListener('keydown', e=>{
    if((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); input.focus(); }
    if(e.key==='Enter'){ e.preventDefault(); run(); }
  });
})();
