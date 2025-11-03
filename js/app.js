/* MergX v8.33 – Core Logic */

// ======== Navigation control ========
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const page = link.getAttribute('data-page');
    pages.forEach(p => p.classList.toggle('is-active', p.id === page));
    navLinks.forEach(n => n.classList.remove('is-active'));
    link.classList.add('is-active');
  });
});

// ======== KPI Expansion + AI Suggestion Mock ========
document.querySelectorAll('.kpi__card').forEach(card => {
  card.addEventListener('click', () => {
    const modal = document.querySelector('#modal');
    const dialog = modal.querySelector('.modal__dialog');
    dialog.innerHTML = `
      <h2>${card.dataset.title}</h2>
      <div class="chart glass" style="height:220px;margin-top:10px;display:flex;align-items:center;justify-content:center;">
        <span>📊 Detaljerad graf & AI-analys för ${card.dataset.title}</span>
      </div>
      <p style="margin-top:10px;opacity:.8;">AI-förslag: Justera mål +12% för optimal tillväxt.</p>
      <button id="closeModal">Stäng</button>
    `;
    modal.classList.add('is-open');
    modal.querySelector('#closeModal').onclick = () => modal.classList.remove('is-open');
  });
});

// ======== Chat Simulation ========
const chatInput = document.querySelector('#chatInput');
const chatBtn = document.querySelector('#chatSend');
const chatList = document.querySelector('.messages');

if(chatBtn){
  chatBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', e => { if(e.key === 'Enter') sendMessage(); });
}

function sendMessage(){
  const msg = chatInput.value.trim();
  if(!msg) return;
  const div = document.createElement('div');
  div.className = 'msg me';
  div.textContent = msg;
  chatList.appendChild(div);
  chatInput.value = '';
  chatList.scrollTop = chatList.scrollHeight;
  setTimeout(botReply, 800);
}

function botReply(){
  const responses = [
    "AI-Coach: Bra tänkt! Vill du lägga till detta som uppgift?",
    "AI-Coach: Jag ser att kostnaderna ökat 5 %, vill du analysera?",
    "AI-Coach: Ska jag visa dagens schema?",
    "AI-Coach: Påminnelse – faktura #123 saknar betalning."
  ];
  const div = document.createElement('div');
  div.className = 'msg bot';
  div.textContent = responses[Math.floor(Math.random()*responses.length)];
  chatList.appendChild(div);
  chatList.scrollTop = chatList.scrollHeight;
}

// ======== Dismiss modal on outside click ========
document.addEventListener('click', e => {
  const modal = document.querySelector('#modal');
  if(modal.classList.contains('is-open') && !e.target.closest('.modal__dialog')){
    modal.classList.remove('is-open');
  }
});

// ======== Theme toggle example ========
const themeToggle = document.querySelector('#themeToggle');
if(themeToggle){
  themeToggle.addEventListener('click',()=>{
    document.body.classList.toggle('theme-light');
  });
}

// ======== Map Mock (placeholder for Google API) ========
const mapContainer = document.querySelector('#map');
if(mapContainer){
  mapContainer.innerHTML = "<div style='padding:60px;text-align:center;opacity:.6;'>🗺️ AI-Karta laddas... (Mock)</div>";
}
