
function CRMView(){
  const wrap=el('div','grid');
  const form=el('div','card');form.style.gridColumn='span 12';
  form.innerHTML=`<h3>Ny kund</h3>
  <div class="grid" style="grid-template-columns:repeat(2,1fr);gap:10px">
    <div><div class="small">Företag</div><input id="c_name" class="input" placeholder="Ex. Nordic Mobile AB"/></div>
    <div><div class="small">VAT / Momsnr</div><input id="c_vat" class="input" placeholder="SE5590xxxxxx01"/></div>
    <div><div class="small">Kontaktperson</div><input id="c_person" class="input" placeholder="Ex. Anna Svensson"/></div>
    <div><div class="small">E-post</div><input id="c_mail" class="input" placeholder="anna@exempel.se"/></div>
    <div><div class="small">Telefon</div><input id="c_tel" class="input" placeholder="+46…"/></div>
    <div><div class="small">Taggar</div><input id="c_tags" class="input" placeholder="B2B, Premium"/></div>
  </div>
  <div class="row" style="margin-top:8px"><button class="btn" id="c_save">Spara kund</button><span class="small">Autosave i localStorage</span></div>`;
  wrap.appendChild(form);
  const list=el('div','card');list.style.gridColumn='span 12';list.innerHTML=`<h3>Kundlista</h3><div id="crmTable"></div>`;wrap.appendChild(list);
  function render(){const tbl=document.createElement('table');tbl.className='table';tbl.innerHTML=`<thead><tr><th>Namn</th><th>Kontakt</th><th>Email</th><th>Taggar</th></tr></thead>`;const tb=document.createElement('tbody');(JSON.parse(localStorage.getItem('crm')||'[]')).forEach(c=>{const tr=document.createElement('tr');tr.innerHTML=`<td>${c.name}</td><td>${c.person}</td><td>${c.mail}</td><td>${c.tags}</td>`;tb.appendChild(tr)});tbl.appendChild(tb);document.getElementById('crmTable').innerHTML='';document.getElementById('crmTable').appendChild(tbl)}render();
  document.getElementById('c_save').onclick=()=>{const c={name:document.getElementById('c_name').value.trim(),vat:document.getElementById('c_vat').value.trim(),person:document.getElementById('c_person').value.trim(),mail:document.getElementById('c_mail').value.trim(),tel:document.getElementById('c_tel').value.trim(),tags:document.getElementById('c_tags').value.trim()};const arr=JSON.parse(localStorage.getItem('crm')||'[]');arr.push(c);localStorage.setItem('crm',JSON.stringify(arr));render();addNotif('Ny kund skapad','ok')};
  return wrap;
}
