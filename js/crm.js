function renderCRM(){
  MX.setTitle("Kunddata");
  MX.mount(
    `<section class="mx-card">
      <h2>Kunder</h2>
      <ul class="mx-list">
        <li><b>Elon Kista</b> — senaste order 2025-10-28 — nästa besök 20 dagar</li>
        <li><b>Mekonomen Solna</b> — AOV 3 900 kr — churnrisk låg</li>
        <li><b>Power Barkarby</b> — demo föreslås</li>
      </ul>
    </section>`,
    `<div class="mx-card"><h3>Segment</h3><ul class="mx-list">
      <li>Premiumkablar — 124 konton</li>
      <li>Butiker norr — 46 konton</li></ul></div>`
  );
}
MX.routes["crm"] = renderCRM;
