
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
      <p class="small">Tema är låst till ljust i denna patch.</p>
    </div>
    <div class="card">
      <h3>API-nycklar (kommande)</h3>
      <p>ChatGPT, Fortnox, WhatsApp-gateway.</p>
    </div>
  </section>`;
});
