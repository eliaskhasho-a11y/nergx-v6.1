
Router.mount('automation', ()=>{
  return `
  <section class="grid cols-2">
    <div class="card">
      <h3>Workflow Builder (beta)</h3>
      <pre class="card" style="white-space:pre-line">Trigger: Ny order
 → Kontrollera lager
 → Skicka notifiering
 → Uppdatera CRM
 → Skapa faktura
 → Skicka SMS med spårning</pre>
      <p class="badge">Visuell editor 8.1</p>
    </div>
    <div class="card">
      <h3>Exempel-flöden</h3>
      <ul>
        <li>Order → Faktura → Kundnotis</li>
        <li>Retur → Lager + Ekonomi</li>
        <li>Lågt lager → Inköpsförslag</li>
      </ul>
    </div>
  </section>`;
});
