
Router.mount('crm', ()=>{
  return `
  <section class="grid cols-2">
    <div class="card">
      <div class="row" style="justify-content:space-between;align-items:center">
        <h3>Kundlista</h3>
        <button class="badge" onclick="CRM.toggle()">+ Ny kund</button>
      </div>
      <table class="table">
        <tr><th>ID</th><th>Namn</th><th>Stad</th><th>Värde</th><th>Status</th></tr>
        ${State.customers.map(c=>`<tr><td>${c.id}</td><td>${c.name}</td><td>${c.city}</td><td>${Formatter.money(c.value)}</td><td>${c.status}</td></tr>`).join('')}
      </table>
      <div id="crmForm" class="card" style="display:none;margin-top:10px">
        <div class="row" style="gap:12px">
          <div style="flex:1"><label>Företag</label><input type="text"></div>
          <div style="flex:1"><label>Org.nr</label><input type="text"></div>
        </div>
        <div class="row" style="gap:12px">
          <div style="flex:1"><label>Kontaktperson</label><input type="text"></div>
          <div style="flex:1"><label>E-post</label><input type="email"></div>
        </div>
        <label>Adress</label><input type="text">
        <div class="row" style="justify-content:flex-end"><button class="badge" onclick="CRM.save()">Spara</button></div>
      </div>
    </div>
    <div class="card">
      <h3>Fakturor</h3>
      <table class="table">
        <tr><th>Nr</th><th>Kund</th><th>Belopp</th><th>Status</th></tr>
        ${State.invoices.map(i=>`<tr><td>${i.no}</td><td>${i.customer}</td><td>${Formatter.money(i.amount)}</td><td>${i.status}</td></tr>`).join('')}
      </table>
    </div>
  </section>`;
});
window.CRM = {
  toggle(){ const f=document.getElementById('crmForm'); f.style.display = (f.style.display==='none'?'block':'none') },
  save(){ Notis.push('Ny kund sparad (mock)'); this.toggle(); }
};
