
Router.mount('settings', ()=>{
  return `
  <section class="grid">
    <div class="card">
      <h3>Inställningar</h3>
      <p>Allmänt, språk och API‑nycklar (framtida).</p>
      <label>Språk
        <select onchange="State.lang=this.value">
          <option value="sv" selected>Svenska</option>
          <option value="en">English</option>
        </select>
      </label>
    </div>
  </section>`;
});
