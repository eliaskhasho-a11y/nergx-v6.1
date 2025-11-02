
Router.mount('chat', ()=>{
  return `
  <section class="card">
    <h3>Teamchatt</h3>
    <div id="teamChat" class="chat" style="height:320px"></div>
    <form id="teamForm" class="row">
      <input id="teamInput" placeholder="Skriv ett meddelande… (Enter)" />
      <button type="submit">Skicka</button>
    </form>
  </section>`;
});
window.__hydrate = (hash)=>{
  if(hash!=='chat') return;
  const list = document.getElementById('teamChat');
  const form = document.getElementById('teamForm');
  const input = document.getElementById('teamInput');
  function push(txt, cls='you'){
    const el = document.createElement('div');
    el.className='msg '+cls; el.innerHTML = `${txt}<small>${new Date().toLocaleTimeString()}</small>`;
    list.appendChild(el); list.scrollTop = list.scrollHeight;
  }
  push('Välkommen till MergX Chatt!', 'ai');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(!input.value.trim()) return;
    push(input.value.trim(), 'you');
    input.value='';
  });
  input.addEventListener('keydown', e=>{ if(e.key==='Enter'){ e.preventDefault(); form.requestSubmit(); }});
};
