
App.routes['academy'] = (el)=>{
  el.innerHTML = `<div class="panel" style="padding:16px">
    <div class="small" style="font-weight:600;margin-bottom:10px">MergX Akademi</div>
    <div class="small">Skapa quiz och guider (mock). Fråga 1: Vad är GM%?</div>
    <button class="btn" id="quizStart">Starta quiz</button>
    <div id="quizBox" class="small" style="margin-top:10px"></div>
  </div>`;
  document.getElementById('quizStart').addEventListener('click', ()=>{
    document.getElementById('quizBox').innerHTML = 'Quiz startat! (mock fylls i av användaren)';
  });
};
