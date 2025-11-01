
function ChatView(){
  const wrap=el('div','card');wrap.innerHTML=`<h3>Intern chatt</h3>
  <div class="chatbox"><div id="chatLog" class="chatlog"></div>
  <div class="row"><input id="chatInput" class="input" placeholder="Skriv och tryck Enter för att skicka"/>
  <button id="chatSend" class="btn">Skicka</button><button id="chatTone" class="btn ghost">Förbättra ton</button></div></div>`;
  const log=document.getElementById('chatLog');
  function push(sender,msg){const d=document.createElement('div');d.innerHTML=`<span class="chip">${sender}</span> <span class="small">${new Date().toLocaleTimeString()}</span><br>${msg}`;d.style.marginBottom='8px';log.appendChild(d);log.scrollTop=log.scrollHeight}
  function send(){const i=document.getElementById('chatInput');const v=i.value.trim();if(!v)return;push('Du',v);i.value='';setTimeout(()=>push('AI','👍 Noterat. '+v.replace(/\?$/,'')+'.'),250)}
  document.getElementById('chatSend').onclick=send;document.getElementById('chatInput').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();send()}});
  document.getElementById('chatTone').onclick=()=>{const last=log.lastElementChild;if(!last)return;const txt=last.innerText.split('\n').slice(1).join(' ');push('AI','Föreslagen ton: “'+txt.replace(/!/g,'.').replace('Noterat','Tack, jag tar det vidare')+'”')};
  return wrap;
}
