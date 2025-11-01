
MX.register('audit', el => {
  el.innerHTML = `
    <div class="header"><div style="font-weight:700">Audit-logg</div><div class="flex"><span class="pill">${MX.audit.length} händelser</span><button id="clr">Rensa</button></div></div>
    <div class="card"><div class="audit" id="list"></div></div>
  `;
  const list = el.querySelector('#list');
  function render(){ list.innerHTML = MX.audit.map(a=>`<div class="small">${new Date(a.ts).toLocaleString()} — <b>${a.type}</b> — ${a.actor||'-'} — ${a.detail||''}</div>`).join('') || '<div class="small">Tom logg.</div>'; }
  render();
  el.querySelector('#clr').onclick = ()=>{ MX.audit = []; MX.save(); render(); };
});
