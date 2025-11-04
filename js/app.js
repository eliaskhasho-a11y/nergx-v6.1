// === MergX Dashboard Interaction v8.51 ===

// Hämta alla KPI-kort
const cards = document.querySelectorAll('.card');
const expander = document.getElementById('expander');
const expanderTitle = document.getElementById('expander-title');
const aiDetailText = document.getElementById('ai-detail-text');
const closeBtn = document.querySelector('.close-expander');
const expanderContent = document.querySelector('.expander-content');

let blurLayer;

// Data för varje KPI
const kpiData = {
  omsattning: {
    title: 'Omsättning',
    ai: 'AI: Omsättningen ökar stabilt. Fortsätt fokus på USB-C 60 W och kampanjer i norr.',
    data: [120, 130, 160, 190, 220],
  },
  ordrar: {
    title: 'Ordrar',
    ai: 'AI: Ordervolymen stiger måndag–torsdag. Tips: marknadsför på tisdag morgon.',
    data: [30, 31, 33, 34, 35],
  },
  kostnader: {
    title: 'Kostnader',
    ai: 'AI: Kostnaderna minskar svagt. Möjlighet att utöka marginalen genom transportoptimering.',
    data: [45, 43, 42, 41, 41],
  },
  marginal: {
    title: 'Bruttomarginal',
    ai: 'AI: Marginalen ökar tack vare högre försäljningsandel av premiumkablar.',
    data: [38, 39, 40, 41, 41],
  },
};

// === Aktivera klick för KPI-kort ===
cards.forEach(card => {
  card.addEventListener('click', () => {
    const type = card.dataset.type;
    const info = kpiData[type];

    if (!info) return;

    // Visa expander
    expander.classList.add('active');
    expanderTitle.textContent = info.title;
    aiDetailText.textContent = info.ai;

    // Skapa lokal blur bakom expander
    blurLayer = document.createElement('div');
    blurLayer.classList.add('local-blur');
    card.appendChild(blurLayer);

    // Visa overlay
    expander.classList.remove('hidden');

    // Ladda graf
    renderDetailChart(info.data);
  });
});

// === Stäng expander ===
closeBtn.addEventListener('click', () => {
  expander.classList.remove('active');
  expander.classList.add('hidden');
  if (blurLayer) blurLayer.remove();
});

// === Rendera graf i detaljvy ===
function renderDetailChart(data) {
  const ctx = document.getElementById('detailChart').getContext('2d');
  if (window.detailChart) window.detailChart.destroy();

  window.detailChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mån', 'Tis', 'Ons', 'Tor', 'Fre'],
      datasets: [{
        label: 'Utveckling',
        data,
        borderColor: '#00C6FF',
        backgroundColor: 'rgba(0,198,255,0.2)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      }]
    },
    options: {
      scales: {
        x: { ticks: { color: '#ccc' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#ccc' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      },
      plugins: { legend: { display: false } },
    }
  });
}
