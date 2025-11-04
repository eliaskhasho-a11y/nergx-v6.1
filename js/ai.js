function renderAI(){
  MX.setTitle("AI-Nav");
  MX.mount(
    `<section class="mx-card">
       <h2>AI-Nav</h2>
       <p>Fråga företaget, What-If Studio och Auto-rapporter.</p>
       <div class="mx-card" style="margin-top:10px;">
         <h3>What-If Studio (preview)</h3>
         <p>Simulera pris, kampanj, lager och rutt – få prognos & åtgärdsplan.</p>
       </div>
     </section>`,
    `<div class="mx-card"><h3>Snabbinsikt</h3><p>Intäkter +12 % p.g.a. högre AOV och lägre returgrad.</p></div>`
  );
}
MX.routes["ai"] = renderAI;
