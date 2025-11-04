// === MergX v8.52: Stable Dashboard Core ===

const cards = document.querySelectorAll('.card');
const expander = document.getElementById('expander');
const expanderTitle = document.getElementById('expander-title');
const aiText = document.getElementById('ai-detail-text');
const closeBtn = document.querySelector('.close-expander');
let blurLayer;

const kpiData = {
  omsattning: {
    title: 'Omsättning',
    ai: 'AI: Omsättningen ökar stabilt. Fortsätt fokus på USB-C 60 W och kampanjer i norr.',
    data: [120,130,150,175,200],
  },
  ordrar: {
    title: 'Ordrar',
    ai: 'AI: Ordervolymen stiger måndag–torsdag. Rekommenderar kampanjstart tisdag.',
    data: [30,32,33,34,35],
  },
  kostnader: {
    title: 'Kostnader',
    ai: 'AI: Kostnaderna sjunker svagt. Transportoptimering kan förbättra marginalen.',
    data: [45,43,42,41,40],
  },
  marginal: {
    title: 'Bruttomarginal',
    ai: 'AI: Marginalen ökar tack vare fler premiumkablar. Behåll fokus på dessa produkter.',
    data: [38,39,40,41,41],
  },
};

// === Klick för att expandera KPI ===
cards.forEach(card => {
  card.addEventListener('click', () => {
    const type = card.dataset.type;
    const info = kpiData[type];
    if (!info) return;

    expander.classList.remove('hidden');
    expanderTitle.textContent = info.title;
    aiText.textContent = info.ai;

    // Lokal blur bakom kortet
    if (blurLayer) blurLayer.remove();
    blurLayer = document.createElement('div');
    blurLayer.classList.add('local-blur');
    card.style.position = 'relative';
    card.appendChild(blurLayer);

    renderChart(info.data);
  });
});

// === Stäng expander ===
closeBtn.addEventListener('click', () => {
  expander.classList.add('hidden');
  if (blurLayer) blurLayer.remove();
});

// === Rendera graf ===
function renderChart(data) {
  const ctx = document.getElementById('detailChart').getContext('2d');
  if (window.detailChart) window.detailChart.destroy();
  window.detailChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mån','Tis','Ons','Tor','Fre'],
      datasets: [{
        label: 'Utveckling',
        data,
        borderColor: '#00C6FF',
        backgroundColor: 'rgba(0,198,255,0.2)',
        borderWidth: 2,
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#ccc' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#ccc' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      }
    }
  });
}
