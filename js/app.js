
// Notiser
function pushNote(txt){
  App.state.notes.unshift({ t:new Date().toLocaleTimeString(), txt });
  const list = document.getElementById('noteList');
  if(!list) return;
  list.innerHTML = App.state.notes.slice(0,50).map(n=>`<div class='small'>${n.t} — ${n.txt}</div>`).join('');
}

setInterval(()=>{
  const id = Math.floor(10000+Math.random()*90000);
  pushNote(`Ny order #M-${id}`);
}, 12000);

document.addEventListener('click', e=>{
  if(e.target.id==='flushNotes'){ App.state.notes=[]; document.getElementById('noteList').innerHTML=''; }
});

// AI coach (mock)
function coachSay(txt){ 
  App.state.coach.push({role:'ai', txt});
  const el = document.getElementById('coachBody');
  if(el){
    el.insertAdjacentHTML('beforeend', `<div class='small'>AI: ${txt}</div>`);
    el.scrollTop = el.scrollHeight;
  }
}

document.addEventListener('submit', e=>{
  if(e.target.id==='aiForm'){
    e.preventDefault();
    const inp = document.getElementById('aiInput');
    const val = inp.value.trim(); if(!val) return;
    const body = document.getElementById('coachBody');
    body.insertAdjacentHTML('beforeend', `<div class='small'><b>Du:</b> ${val}</div>`);
    body.scrollTop = body.scrollHeight;
    inp.value='';
    // Mockad coachlogik
    if(/budget|gm|marginal/i.test(val)) coachSay('GM% ligger stabilt. Förslag: skala kampanj i Region Syd där konverteringen är högst.');
    else if(/lager|inventory/i.test(val)) coachSay('CAR‑CHG‑60W är låg (4 kvar). Rek. inköpsorder nu för att inte missa Q4‑leveranser.');
    else coachSay('Tack! Jag sparade frågan och återkommer med analys.');
  }
});

// Kommandopalett ⌘/Ctrl+K
(function(){
  const pal = document.getElementById('palette');
  const list = document.getElementById('paletteList');
  const cmds = [
    {label:'Gå till Översikt', run:()=>location.hash='#/dashboard'},
    {label:'Gå till CRM', run:()=>location.hash='#/crm'},
    {label:'Gå till Inventarie', run:()=>location.hash='#/inventory'},
    {label:'Gå till Ekonomi', run:()=>location.hash='#/economy'},
    {label:'Öppna Automation', run:()=>location.hash='#/automation'},
    {label:'Öppna AI‑Karta', run:()=>location.hash='#/map'},
    {label:'Öppna Chatt', run:()=>location.hash='#/chat'}
  ];
  list.innerHTML = cmds.map((c,i)=>`<div class='item' data-i='${i}'>${c.label}</div>`).join('');
  list.addEventListener('click', e=>{
    const item = e.target.closest('.item'); if(!item) return;
    cmds[+item.dataset.i].run(); pal.style.display='none';
  });
  function openPal(){ pal.style.display='flex'; }
  function closePal(){ pal.style.display='none'; }
  document.addEventListener('keydown', e=>{
    if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); openPal(); }
    if(e.key==='Escape') closePal();
  });
})();
