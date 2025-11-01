
const Notis = {
  list: [],
  seed(){
    this.list = [
      {t: new Date().toLocaleString(), txt: 'Ny order skapad #M-10023'},
      {t: new Date().toLocaleString(), txt: 'AI svar mottaget: lagerprognos klar'},
      {t: new Date().toLocaleString(), txt: 'Kund Nordic Mobile uppdaterades'}
    ];
  },
  renderList(containerId){
    const el = document.getElementById(containerId);
    el.innerHTML = this.list.map(n=>`<div style="padding:6px 0;border-bottom:1px solid var(--border)">
      <div class="smallmuted">${n.t}</div><div>${n.txt}</div></div>`).join('');
  },
  push(txt){
    this.list.unshift({t: new Date().toLocaleString(), txt});
    const el = document.getElementById('notisList');
    if(el) this.renderList('notisList');
  }
};
Notis.seed();
