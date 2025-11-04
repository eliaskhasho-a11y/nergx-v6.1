function renderMap(){
  MX.setTitle("AI-Karta");
  MX.mount(
    `<section class="mx-card">
       <h2>Besöksplanerare</h2>
       <p>(Mock) Lista platser i närheten + planera rutt.</p>
       <ul class="mx-list">
         <li>Elon Kista — 5.2 km — ETA 12 min</li>
         <li>Mekonomen Solna — 7.9 km — ETA 17 min</li>
         <li>Power Barkarby — 14.3 km — ETA 25 min</li>
       </ul>
       <button id="planRoute" class="mx-close" style="position:static;">Skapa optimal rutt</button>
     </section>`,
    `<div class="mx-card"><h3>Notiser</h3><ul class="mx-list">
      <li>Elon Kista: potentiell order om 20 dagar</li>
      <li>Mekonomen Solna: begär offertuppföljning</li></ul></div>`
  );
  document.getElementById("planRoute")?.addEventListener("click", ()=>alert("Rutt skapad (mock)."));
}
MX.routes["map"] = renderMap;
