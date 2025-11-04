function renderChat(){
  MX.setTitle("Teamchatt");
  MX.mount(
    `<section class="mx-card">
       <h2>Teamchatt</h2>
       <div id="log" style="background:#0d0d0e;border:1px solid #26262a;border-radius:10px;height:220px;overflow:auto;padding:8px;margin-bottom:8px">
         <p>🟢 Anna: God morgon teamet!</p>
         <p>👤 Jonas: Jag tar kundmötet 11:00.</p>
       </div>
       <input id="msg" placeholder="Skriv ett meddelande…" style="width:100%;padding:8px;border-radius:8px;border:1px solid #26262a;background:#0d0d0e;color:#fff"/>
     </section>`,
    `<div class="mx-card"><h3>AI-hjälp</h3><p>Sammanfatta kanal eller föreslå nästa åtgärd.</p></div>`
  );
  const log = document.getElementById("log"), msg = document.getElementById("msg");
  msg.addEventListener("keydown", e=>{
    if(e.key==="Enter" && msg.value.trim()){
      const p = document.createElement("p"); p.textContent = `💬 Du: ${msg.value}`; log.appendChild(p);
      msg.value=""; log.scrollTop = log.scrollHeight;
    }
  });
}
MX.routes["chat"] = renderChat;
