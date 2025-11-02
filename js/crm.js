const CRM = {
  render(){
    const rows = [
      {name:'Nordic AB', last:'Igår', value:'34 200 kr'},
      {name:'Stock Wireless', last:'Idag', value:'12 100 kr'},
      {name:'Elon Västerås', last:'Mån', value:'8 900 kr'},
    ];
    return `
      <div class="card">
        <div class="hd">Kunder / CRM</div>
        <div class="bd">
          <div class="list">
            ${rows.map(r=>`<div class="row"><b>${r.name}</b><span class="muted">${r.last}</span><span>${r.value}</span></div>`).join('')}
          </div>
        </div>
      </div>
    `;
  }
};
