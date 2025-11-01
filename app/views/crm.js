import { State } from '../state.js';
export function renderCRM(){
  const list = (State.data?.customers||[]).map(c=>`<tr><td>${c.name}</td><td>${c.org}</td><td>${c.email}</td><td>${c.value}</td></tr>`).join('');
  return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <div style="font-weight:700">Kunder / CRM</div>
      <button class="btn" onclick="window.MX.addCustomer()">+ Ny kund</button>
    </div>
    <table class="table">
      <thead><tr><th>Namn</th><th>Org.nr</th><th>E-post</th><th>Värde</th></tr></thead>
      <tbody>${list||'<tr><td colspan=4 class="muted">Inga kunder</td></tr>'}</tbody>
    </table>
  `;
}
