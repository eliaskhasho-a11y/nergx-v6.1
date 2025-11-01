
Router.mount('automation', ()=>{
  return `
  <section class="grid">
    <div class="card">
      <h3>Automation (beta)</h3>
      <p>Bygg flöden genom att koppla samman steg. Exempel:</p>
      <pre class="card" style="white-space:pre-line">Trigger: Ny order
 → Kontrollera lager
 → Skicka notifiering
 → Uppdatera CRM
 → Skapa faktura</pre>
      <p class="badge">Visuell editor kommer i 7.8</p>
    </div>
  </section>`;
});
