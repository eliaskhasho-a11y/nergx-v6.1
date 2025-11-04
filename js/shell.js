// Enkel hash-router + mount av vy & rail
const MX = {
  state: { range: "day" },
  routes: {},
  setTitle(txt){ document.getElementById("mx-page-title").textContent = txt; },
  mount(viewHtml, railHtml=""){ 
    const view = document.getElementById("view-root"); view.innerHTML = viewHtml;
    const rail = document.getElementById("rail-root"); rail.innerHTML = railHtml;
  },
  goto(hash){ location.hash = hash; },
};

function markActiveNav() {
  const links = document.querySelectorAll(".mx-nav a[data-route]");
  links.forEach(a => a.classList.remove("is-active"));
  const found = Array.from(links).find(a => a.getAttribute("href") === location.hash);
  if (found) found.classList.add("is-active");
}

function handleRoute(){
  const hash = location.hash || "#/dashboard";
  markActiveNav();
  const [_, route] = hash.split("/"); // '#/dashboard' -> 'dashboard'
  const fn = MX.routes[route] || MX.routes["dashboard"];
  fn();
}

window.addEventListener("hashchange", handleRoute);
document.addEventListener("DOMContentLoaded", () => {
  // filter-knappar
  document.querySelectorAll(".mx-filter [data-range]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      document.querySelectorAll(".mx-filter [data-range]").forEach(b=>b.classList.remove("is-active"));
      btn.classList.add("is-active");
      MX.state.range = btn.dataset.range;
      // broadcast enkelt event
      document.dispatchEvent(new CustomEvent("mx:range", { detail: MX.state.range }));
    });
  });

  document.getElementById("mx-refresh")?.addEventListener("click", ()=>location.reload());
  handleRoute();
});
