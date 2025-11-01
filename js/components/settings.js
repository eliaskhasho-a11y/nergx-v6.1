
MX.register('settings', el => {
  el.innerHTML = `
    <div class="grid">
      <div class="header"><div style="font-weight:700">Inställningar</div></div>
      <div class="card">
        <div class="flex"><div class="small" style="width:120px">Roll</div>
          <select id="role"><option>Admin</option><option>Ekonomi</option><option>Sälj</option><option>Lager</option><option>Kundtjänst</option></select></div>
        <div class="flex" style="margin-top:8px"><div class="small" style="width:120px">Tema</div>
          <select id="theme"><option value="light">Ljust</option><option value="dark">Mörkt</option></select></div>
        <div class="flex" style="margin-top:8px"><div class="small" style="width:120px">Språk</div>
          <select id="lang"><option value="sv">Svenska</option><option value="en">English</option></select></div>
      </div>
    </div>
  `;
  const r=el.querySelector('#role'), t=el.querySelector('#theme'), l=el.querySelector('#lang');
  r.value=MX.role; t.value=MX.theme; l.value=MX.lang;
  r.onchange=()=>{ MX.role=r.value; MX.save(); MX.start(); };
  t.onchange=()=>{ MX.theme=t.value; document.documentElement.setAttribute('data-theme', MX.theme); MX.save(); };
  l.onchange=()=>{ MX.lang=l.value; MX.save(); alert('Språk sparat (stub).'); };
});
