
Router.mount('settings', ()=>{
  return `
  <section class="grid cols-2">
    <div class="card">
      <h3>Inställningar</h3>
      <label>Språk:
        <select onchange="State.lang=this.value">
          <option value="sv" selected>Svenska</option>
          <option value="en">English</option>
          <option value="th">ไทย</option>
        </select>
      </label>
      <br/>
      <label>Aktiv roll:
        <select onchange="State.role=this.value">
          <option>Admin</option>
          <option>Ekonomi</option>
          <option>Anställd</option>
          <option>Gäst</option>
        </select>
      </label>
      <p class="small">RBAC‑logik kopplas in i 8.1</p>
    </div>
    <div class="card">
      <h3>API‑nycklar (kommande)</h3>
      <p>Lägg in nycklar för t.ex. ChatGPT, Fortnox, WhatsApp‑gateway.</p>
    </div>
  </section>`;
});
