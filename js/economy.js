function renderEconomy(){
  MX.setTitle("Ekonomi");
  MX.mount(
    `<section class="mx-card">
       <h2>Resultat & Prognoser</h2>
       <canvas id="ecoMain" height="130"></canvas>
       <div class="mx-card" style="margin-top:12px;">
         <h3>Fakturor</h3>
         <ul class="mx-list">
           <li>#10231 — 12 450 kr — Förfaller 2025-11-15</li>
           <li>#10218 — 8 990 kr — Betald</li>
         </ul>
       </div>
     </section>`,
    `<div class="mx-card"><h3>Åtgärder</h3><ul class="mx-list">
      <li>Skicka påminnelse #10231</li>
      <li>Lås Q1-inköp (bulkpris)</li></ul></div>`
  );
  const ctx = document.getElementById("ecoMain")?.getContext("2d");
  if(ctx){
    new Chart(ctx,{type:"bar",data:{labels:["Q1","Q2","Q3","Q4"],datasets:[
      {label:"Intäkter",data:[620,710,660,780],backgroundColor:"#22c55e"},
      {label:"Kostnader",data:[410,430,420,460],backgroundColor:"#ef4444"}]},
      options:{plugins:{legend:{labels:{color:"#ddd"}}},scales:{x:{ticks:{color:"#bbb"}},y:{ticks:{color:"#bbb"}}}}});
  }
}
MX.routes["economy"] = renderEconomy;
