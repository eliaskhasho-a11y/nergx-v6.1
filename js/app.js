/* MergX v8.33 – Core Logic */

// Pages & nav
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav__link[data-page]');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const page = link.getAttribute('data-page');
    pages.forEach(p => p.classList.toggle('is-active', p.id === page));
    navLinks.forEach(n => n.classList.remove('is-active'));
    link.classList.add('is-active');
  });
});

// KPI expansion modal
document.addEventListener('click', (e) => {
  const card = e.target.closest('.kpi__card');
  if(!card) return;
  const modal = document.querySelector('#modal');
  const dialog = modal.querySelector('.modal__dialog');
  const title = card.dataset.title || 'Detaljer';
  dialog.innerHTML = `
    <h2 style="margin:0 0 10px;">${title}</h2>
    <div class="glass" style="height:240px;display:flex;align-items:center;justify-content:center;">
      <span style="opacity:.75">📈 Detaljerad graf & AI-modul: ${title}</span>
    </div>
    <p style="margin-top:10px;opacity:.85;">${window.aiModuleAnalysis?.(title.toLowerCase()) ?? "AI-analys saknas."}</p>
    <div style="display:flex;gap:8px;margin-top:10px;">
      <button id="closeModal" class="nav__link" style="width:auto;">Stäng</button>
    </div>
  `;
  modal.classList.add('is-open');
});

// Stäng modal på klick utanför / knapp
document.addEventListener('click', (e)=>{
  const modal = document.querySelector('#modal');
  if(!modal.classList.contains('is-open')) return;
  if(e.target.id === 'closeModal') modal.classList.remove('is-open');
  if(!e.target.closest('.modal__dialog')) {
    // klick utanför
    modal.classList.remove('is-open');
  }
});

// Theme toggle
const themeToggle = document.querySelector('#themeToggle');
if(themeToggle){
  themeToggle.addEventListener('click',()=>document.body.classList.toggle('theme-light'));
}

// Mini chat
const miniChatList = document.querySelector('#miniChatList');
const miniChatInput = document.querySelector('#miniChatInput');
const miniChatSend = document.querySelector('#miniChatSend');

function appendMsg(list, cls, text){
  const div = document.createElement('div');
  div.className = `msg ${cls}`;
  div.textContent = text;
  list.appendChild(div);
  list.scrollTop = list.scrollHeight;
}

if(miniChatSend){
  miniChatSend.addEventListener('click', ()=>{
    const v = miniChatInput.value.trim();
    if(!v) return;
    appendMsg(miniChatList,'me',v);
    miniChatInput.value = '';
    setTimeout(()=>appendMsg(miniChatList,'bot','AI-Coach: Noterat. Vill du skapa uppgift eller följa upp?'),600);
  });
  miniChatInput.addEventListener('keydown',e=>{if(e.key==='Enter') miniChatSend.click();});
}

// Full chat
const chatList = document.querySelector('#chatList');
const chatInput = document.querySelector('#chatInput');
const chatSend = document.querySelector('#chatSend');

if(chatSend){
  chatSend.addEventListener('click', ()=>{
    const v = chatInput.value.trim();
    if(!v) return;
    appendMsg(chatList,'me',v);
    chatInput.value='';
    setTimeout(()=>appendMsg(chatList,'bot','AI-Coach: Bra! Jag har tagit fram analys och en snabb rapport.'),700);
  });
  chatInput.addEventListener('keydown', e => { if(e.key==='Enter') chatSend.click(); });
}

// Toggle formulär (Customers/Inventory)
const addCustomerBtn = document.querySelector('#addCustomerBtn');
const customerForm = document.querySelector('#customerForm');
const cancelCustomer = document.querySelector('#cancelCustomer');
if(addCustomerBtn && customerForm){
  addCustomerBtn.addEventListener('click', ()=>customerForm.style.display='block');
  cancelCustomer?.addEventListener('click', ()=>customerForm.style.display='none');
}

const addProductBtn = document.querySelector('#addProductBtn');
const productForm = document.querySelector('#productForm');
const cancelProduct = document.querySelector('#cancelProduct');
if(addProductBtn && productForm){
  addProductBtn.addEventListener('click', ()=>productForm.style.display='block');
  cancelProduct?.addEventListener('click', ()=>productForm.style.display='none');
}

// Invoice preview button (mock)
document.addEventListener('click', e=>{
  const btn = e.target.closest('.btn-preview');
  if(!btn) return;
  const modal = document.querySelector('#modal');
  const dialog = modal.querySelector('.modal__dialog');
  dialog.innerHTML = `
    <h2 style="margin:0 0 10px;">Faktura #1001 – Förhandsvisning</h2>
    <div class="glass" style="height:420px;display:flex;align-items:center;justify-content:center;">
      <span style="opacity:.75">🧾 PDF-Preview (mock)</span>
    </div>
    <div style="display:flex;gap:8px;margin-top:10px;">
      <button id="closeModal" class="nav__link" style="width:auto;">Stäng</button>
      <button class="nav__link" style="width:auto;">⬇︎ Ladda ner PDF</button>
    </div>
  `;
  modal.classList.add('is-open');
});

// Safe map placeholder
const mapContainer = document.querySelector('#map');
if(mapContainer){
  mapContainer.innerHTML = "<div style='padding:60px;text-align:center;opacity:.6;'>🗺️ AI-Karta laddas… (Mock)</div>";
}
