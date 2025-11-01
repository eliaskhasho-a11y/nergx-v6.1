
document.documentElement.setAttribute('data-theme', MX.theme);
document.getElementById('themeSel').value = MX.theme;
document.getElementById('langSel').value = MX.lang;
document.getElementById('roleSel').value = MX.role;
document.getElementById('themeSel').onchange = e=>{ MX.theme=e.target.value; document.documentElement.setAttribute('data-theme',MX.theme); MX.save(); };
document.getElementById('langSel').onchange = e=>{ MX.lang=e.target.value; MX.save(); };
document.getElementById('roleSel').onchange = e=>{ MX.role=e.target.value; MX.save(); MX.start(); };
if(!location.hash) location.hash = '#/dashboard';
MX.start();
