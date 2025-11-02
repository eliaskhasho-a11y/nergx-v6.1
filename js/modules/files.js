
Router.mount('files', ()=>{
  return `
  <section class="grid cols-2">
    <div class="card">
      <h3>Filer & Kvitton</h3>
      <table class="table">
        <tr><th>Filnamn</th><th>Storlek</th><th>Notering</th><th>Route</th></tr>
        ${State.files.map(f=>`<tr><td>${f.name}</td><td>${f.size}</td><td>${f.note}</td><td>${f.route}</td></tr>`).join('')}
      </table>
      <div class="row" style="justify-content:flex-end;margin-top:8px">
        <button class="badge" onclick="Notis.push('Uppladdning (mock)')">+ Ladda upp</button>
      </div>
    </div>
    <div class="card">
      <h3>Mappar</h3>
      <ul class="list">
        <li>Ekonomi / Kvitton</li>
        <li>Order / Följesedlar</li>
        <li>Avtal</li>
      </ul>
    </div>
  </section>`;
});
