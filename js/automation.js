const Automation = {
  render(){
    return `
      <div class="grid" style="grid-template-columns: 260px 1fr; gap:16px">
        <div class="card"><div class="hd">Byggstenar</div>
          <div class="bd list">
            <div class="row"><span>Trigger: Ny order</span></div>
            <div class="row"><span>Villkor: GM% > 40</span></div>
            <div class="row"><span>Åtgärd: Skicka Slack/Email</span></div>
          </div>
        </div>
        <div class="card"><div class="hd">Canvas (mock)</div>
          <div class="bd" style="height:240px">
            <p class="muted">Dra in noder och koppla pilar (komplett editor kommer i nästa steg).</p>
          </div>
        </div>
      </div>
    `;
  }
};
