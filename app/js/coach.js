
const Coach = {
  bind(inputId, logId){
    const input=document.getElementById(inputId);
    const log=document.getElementById(logId);
    const push=(who, txt)=>{
      const row=document.createElement('div');
      row.innerHTML = `<div class="smallmuted">${who}</div><div style="margin:6px 0 12px 0">${txt}</div>`;
      log.appendChild(row);
      log.scrollTop = log.scrollHeight;
    };
    input.addEventListener('keydown', (e)=>{
      if(e.key==='Enter'){
        e.preventDefault();
        const val=input.value.trim(); if(!val) return;
        push('Du', val);
        input.value='';
        // mock AI answer
        setTimeout(()=>{
          let ans='Noterat.';
          if(/lager|brist/i.test(val)) ans='Föreslår snabbin köporder på CAR‑CHG‑60W (4 st kvar).';
          else if(/budget|prognos/i.test(val)) ans='Prognos: +8% omsättning 30 dagar, GM stabil.';
          else if(/besök|karta|kund/i.test(val)) ans='AI‑kartan föreslår besök hos Stock Wireless kl. 13:00.';
          push('AI', ans);
          Notis.push('AI: '+ans);
        }, 350);
      }
    });
  }
};
