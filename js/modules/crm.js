
Router.mount('crm', ()=>{
  return `
  <section class="grid cols-2">
    <div class="card">
      <h3>Kundlista</h3>
      <table class="table">
        <tr><th>ID</th><th>Namn</th><th>Stad</th><th>Värde</th><th>Status</th></tr>
        ${State.customers.map(c=>`<tr><td>${c.id}</td><td>${c.name}</td><td>${c.city}</td><td>${Formatter.money(c.value)}</td><td>${c.status}</td></tr>`).join('')}
      </table>
    </div>
    <div class="card">
      <h3>Fakturor</h3>
      <table class="table">
        <tr><th>Nr</th><th>Kund</th><th>Belopp</th><th>Status</th></tr>
        ${State.invoices.map(i=>`<tr><td>${i.no}</td><td>${i.customer}</td><td>${Formatter.money(i.amount)}</td><td>${i.status}</td></tr>`).join('')}
      </table>
    </div>
    <div class="card">
      <h3>AI-sammanfattning</h3>
      <p>Åhléns: stark orderingång Q4. Tammerbrands: trend uppåt. Mekonomen: prospekt, rekommenderat besök.</p>
      <p class="badge">Mockad analys</p>
    </div>
  </section>`;
});
