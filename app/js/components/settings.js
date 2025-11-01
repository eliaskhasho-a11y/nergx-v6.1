
function SettingsView(){
  const card=el('div','card');card.innerHTML=`<h3>Inställningar</h3>
  <div class="grid" style="grid-template-columns:repeat(2,1fr);gap:10px">
    <div><div class="small">Språk</div><select id="langSel" class="select"><option value="sv" selected>Svenska</option><option value="en">English</option><option value="th">ไทย</option></select></div>
    <div><div class="small">API-nyckel (OpenAI)</div><input id="apiKey" class="input" placeholder="sk-..." /></div>
  </div><hr/><h3>B2B/B2C-synk (Bridge)</h3><div class="small">Förberett — aktiveras i v7.4</div>`;
  return card;
}
