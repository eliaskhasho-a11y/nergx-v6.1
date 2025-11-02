
Router.mount('inventory', ()=>{
  return `
  <section class="grid cols-2">
    <div class="card">
      <div class="row" style="justify-content:space-between;align-items:center">
        <h3>Inventarie</h3>
        <button class="badge" onclick="INV.toggle()">+ Ny produkt</button>
      </div>
      <table class="table">
        <tr><th>SKU</th><th>Namn</th><th>Lagersaldo</th><th>Pris</th></tr>
        ${State.products.map(p=>`<tr><td>${p.sku}</td><td>${p.name}</td><td>${p.stock}</td><td>${p.price} kr</td></tr>`).join('')}
      </table>
      <div id="invForm" class="card" style="display:none;margin-top:10px">
        <div class="row" style="gap:12px">
          <div style="flex:2"><label>Produktnamn</label><input type="text"></div>
          <div style="flex:1"><label>SKU</label><input type="text"></div>
        </div>
        <div class="row" style="gap:12px">
          <div style="flex:1"><label>Lagersaldo</label><input type="number" value="0"></div>
          <div style="flex:1"><label>Pris (SEK)</label><input type="number" value="0"></div>
        </div>
        <div class="row" style="justify-content:flex-end"><button class="badge" onclick="INV.save()">Spara</button></div>
      </div>
    </div>
    <div class="card">
      <h3>Brist / Inköp</h3>
      <table class="table">
        <tr><th>SKU</th><th>Produkt</th><th>Nivå</th><th>Status</th></tr>
        ${State.stockAlerts.map(s=>`<tr><td>${s.sku}</td><td>${s.product}</td><td>${s.level}</td><td>${s.status}</td></tr>`).join('')}
      </table>
    </div>
  </section>`;
});
window.INV = {
  toggle(){ const f=document.getElementById('invForm'); f.style.display = (f.style.display==='none'?'block':'none') },
  save(){ Notis.push('Ny produkt sparad (mock)'); this.toggle(); }
};
