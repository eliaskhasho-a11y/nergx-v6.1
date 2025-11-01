
window.MX.initAI = ()=>{
  const body = document.querySelector('#aiBody');
  const input = document.querySelector('#aiInput');
  const sendBtn = document.querySelector('#aiSend');

  function render(){
    if(!body) return;
    body.innerHTML = MX.state.ai.map(m=>{
      const cls = m.role === 'user' ? 'color:#93c5fd' : 'color:#a7f3d0';
      return `<div style="${cls}; margin-bottom:6px">${m.role === 'user' ? 'Du' : 'AI'}: ${m.text}</div>`;
    }).join('');
    body.scrollTop = body.scrollHeight;
  }

  function mockAI(text){
    // simple canned advice
    let reply = "Okej.";
    const t = text.toLowerCase();
    if(t.includes("lager") || t.includes("brist")){
      reply = "Rek: lägg inköpsorder på CAR‑CHG‑60W (minst 50 st) för att undvika brist nästa vecka.";
    } else if(t.includes("budget") || t.includes("kpi")){
      reply = "Budget‑spaning: höj Q4‑kampanj i Region Syd med +15% — hög konvertering i retail.";
    } else if(t.includes("schema") || t.includes("möte")){
      reply = "Schemalägg uppföljning ons 10:00 med Nordic Mobile (AI lägger draft‑inbjudan i nästa version).";
    } else if(t.includes("karta") || t.includes("besök")){
      reply = "AI‑kartan markerar tre varma kundpunkter inom 5 km. Rek: börja med Stock Wireless.";
    }
    return reply;
  }

  function send(){
    const text = (input.value || "").trim();
    if(!text) return;
    MX.state.ai.push({role:"user", text});
    render();
    input.value = "";
    setTimeout(()=>{
      const r = mockAI(text);
      MX.state.ai.push({role:"assistant", text:r});
      render();
    }, 500);
  }

  sendBtn?.addEventListener('click', send);
  input?.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){ e.preventDefault(); send(); }
  });

  render();
};
