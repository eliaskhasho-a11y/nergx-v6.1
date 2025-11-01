
window.MX.renderCRM = (el)=>{
  el.innerHTML = `
    <div class="card">
      <h4>Kunder / CRM</h4>
      <div class="note">Kundlista (mock). AI‑sammanfattning av samtal och chattar kopplas i 7.4.</div>
      <table class="table" style="margin-top:10px">
        <thead><tr><th>Namn</th><th>Segment</th><th>Kontakt</th><th>Senast</th></tr></thead>
        <tbody>
          <tr><td>Nordic Mobile AB</td><td>B2B Premium</td><td>anna@nordic.se</td><td>Igår</td></tr>
          <tr><td>Stock Wireless</td><td>B2B</td><td>leo@stockwireless.se</td><td>Idag</td></tr>
          <tr><td>Elon Ljud & Bild</td><td>Retail</td><td>butik@elon.se</td><td>3 dgr</td></tr>
        </tbody>
      </table>
    </div>
  `;
};
