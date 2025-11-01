
window.MX.renderNotis = ()=>{
  const body = document.querySelector('#notisBody');
  if(!body) return;
  if(MX.state.notis.length === 0){ body.textContent = '–'; return; }
  body.innerHTML = MX.state.notis.slice(-20).map(n=>{
    const t = new Date(n.t).toLocaleTimeString('sv-SE', {hour:'2-digit', minute:'2-digit'});
    return `<div><span style="opacity:.6">${t}</span> ${n.txt}</div>`;
  }).join('');
};
// Seed a few
setTimeout(()=>MX.pushNotis("Ny order skapad #M‑10023"), 800);
setTimeout(()=>MX.pushNotis("AI svar mottaget"), 1400);
