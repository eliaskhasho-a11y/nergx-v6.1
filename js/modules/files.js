
App.routes['files'] = (el)=>{
  el.innerHTML = `<div class="panel" style="padding:16px">
    <div class="small" style="font-weight:600;margin-bottom:10px">Filer & OCR</div>
    <input type="file" id="filePick" multiple class="input">
    <div id="fileList" class="small" style="margin-top:10px"></div>
  </div>`;
  const pick = document.getElementById('filePick');
  pick.addEventListener('change', ()=>{
    const list = document.getElementById('fileList');
    list.innerHTML = Array.from(pick.files).map(f=>`<div>${f.name} <span class='small'>(mock OCR körs…)</span></div>`).join('');
    pushNote('OCR jobb startat (mock)');
  });
};
