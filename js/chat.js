const Chat = {
  render(){
    return `
      <div class="card">
        <div class="hd">Intern chatt</div>
        <div class="bd" id="chatBox" style="min-height:180px"></div>
        <div class="bd"><input id="chatInput" placeholder="Skriv och tryck Enter…"/></div>
      </div>
    `;
  },
  afterRender(){
    const box = document.getElementById('chatBox');
    const inp = document.getElementById('chatInput');
    function add(sender, msg){
      const t = new Date().toLocaleTimeString();
      box.innerHTML += `<div class="row"><b>${sender}</b><span class="muted">${t}</span></div><div class="row"><span>${msg}</span></div>`;
      box.scrollTop = box.scrollHeight;
    }
    inp.addEventListener('keydown', (e)=>{
      if(e.key==='Enter'){
        const v = inp.value.trim(); if(!v) return;
        add('Du', v); inp.value='';
      }
    });
  }
};
