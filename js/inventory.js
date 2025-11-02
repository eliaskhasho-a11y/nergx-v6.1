const Inventory = {
  render(){
    const rows = [
      {sku:'CAR-CHG-60W', name:'Bil-laddare 60W', qty:4, status:'brist'},
      {sku:'LIGHT-27W', name:'LED-lampa 27W', qty:12, status:'låg'},
      {sku:'A-STICK-CC60', name:'USB-C till USB-C 60W', qty:73, status:'ok'}
    ];
    return `
      <div class="card">
        <div class="hd">Produkter / Lager</div>
        <div class="bd list">
          ${rows.map(r=>`<div class="row"><span>${r.sku}</span><span class="muted">${r.name}</span><span>${r.qty} st</span><b class="tag">${r.status}</b></div>`).join('')}
        </div>
      </div>
    `;
  }
};
