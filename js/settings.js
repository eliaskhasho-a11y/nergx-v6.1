const Settings = {
  render(){
    return `
      <div class="card">
        <div class="hd">Inställningar</div>
        <div class="bd">
          <div class="row"><span>Version</span><b>8.60</b></div>
          <div class="row"><span>Routing</span><b>Hash (#/)</b></div>
          <div class="row"><span>Tema</span><b>Light</b></div>
          <div class="row"><span>Språk</span><b>${State.lang.toUpperCase()}</b></div>
        </div>
      </div>
    `;
  }
};
