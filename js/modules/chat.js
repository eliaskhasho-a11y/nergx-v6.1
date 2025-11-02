
App.routes['chat'] = (el)=>{
  el.innerHTML = `<div class="panel" style="padding:16px">
    <div class="small" style="font-weight:600;margin-bottom:10px">Team‑chatt</div>
    <div id="chatLog" class="body" style="height:260px;overflow:auto;border:1px solid #ebedf2;border-radius:10px;padding:10px"></div>
    <form id="chatForm" style="margin-top:10px;display:flex;gap:8px">
      <input class="input" id="chatInput" placeholder="Skriv ett meddelande… (Enter skickar)">
      <button class="btn">Skicka</button>
    </form>
  </div>`;
  const log = document.getElementById('chatLog');
  document.getElementById('chatForm').addEventListener('submit', e=>{
    e.preventDefault();
    const inp = document.getElementById('chatInput'); const v = inp.value.trim(); if(!v) return;
    log.insertAdjacentHTML('beforeend', `<div class='small'><b>Du:</b> ${v}</div>`); inp.value=''; log.scrollTop=log.scrollHeight;
  });
};
