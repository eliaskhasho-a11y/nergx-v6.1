/* =========================================================
   MergX v8.36 • core.js
   Navigation, modaler, språk/tema, chatt och demo-data
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ MergX v8.36 core.js loaded");

  /* ---------- Hjälpfunktioner ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Navigation ---------- */
  const navButtons = $$(".nav__item");
  const routes = $$(".route");

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const route = btn.dataset.route;
      navButtons.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      routes.forEach(r => {
        r.classList.toggle("is-visible", r.id === `route-${route}`);
      });
    });
  });

  /* ---------- Modaler ---------- */
  $$("[data-open]").forEach(el => {
    el.addEventListener("click", () => {
      const id = el.dataset.open;
      const dlg = document.getElementById(id);
      if (dlg) dlg.showModal();
    });
  });
  $$("[data-close]").forEach(el => {
    el.addEventListener("click", () => {
      const id = el.dataset.close;
      const dlg = document.getElementById(id);
      if (dlg) dlg.close();
    });
  });

  /* ---------- Tema & Språk ---------- */
  const btnTheme = $("#btn-theme");
  const btnLang = $("#btn-lang");
  const body = document.body;

  btnTheme?.addEventListener("click", () => {
    const current = body.dataset.theme;
    const next = current === "dark" ? "light" : "dark";
    body.dataset.theme = next;
    btnTheme.textContent = next === "dark" ? "Mörk" : "Ljus";
  });

  btnLang?.addEventListener("click", () => {
    const current = body.dataset.lang;
    const next = current === "sv" ? "en" : "sv";
    body.dataset.lang = next;
    btnLang.textContent = next === "sv" ? "Svenska" : "English";
  });

  /* ---------- KPI-demo (mockdata) ---------- */
  const kpiData = {
    revenue: { value: 128500, delta: +4 },
    orders: { value: 37, delta: +12 },
    costs: { value: 88500, delta: -3 },
    margin: { value: 34, delta: +5 },
  };

  Object.entries(kpiData).forEach(([key, { value, delta }]) => {
    const valEl = $(`#kpi-${key}`);
    const dEl = $(`#kpi-${key}-delta`);
    const barEl = $(`#kpi-${key}-bar`);
    if (valEl) valEl.textContent = value.toLocaleString("sv-SE");
    if (dEl) {
      dEl.textContent = `${delta > 0 ? "+" : ""}${delta}%`;
      dEl.classList.toggle("up", delta > 0);
      dEl.classList.toggle("down", delta < 0);
    }
    if (barEl) barEl.style.width = Math.min(100, Math.abs(delta) * 5) + "%";
  });

  /* ---------- Chatt (dock + full) ---------- */
  const chatInput = $("#chat-input");
  const chatSend = $("#chat-send");
  const chatFeed = $("#chat-feed");
  const dockInput = $("#chat-dock-input");
  const dockFeed = $("#chat-dock-feed");

  function appendBubble(feed, msg, self = false) {
    const div = document.createElement("div");
    div.className = "bubble " + (self ? "bubble--me" : "bubble--sys");
    div.textContent = msg;
    feed.appendChild(div);
    feed.scrollTop = feed.scrollHeight;
  }

  chatSend?.addEventListener("click", () => {
    const msg = chatInput.value.trim();
    if (!msg) return;
    appendBubble(chatFeed, msg, true);
    chatInput.value = "";
    // AI-svar (mock)
    setTimeout(() => appendBubble(chatFeed, "AI: Tack, meddelandet mottaget.", false), 500);
  });

  chatInput?.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      chatSend.click();
    }
  });

  dockInput?.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const msg = dockInput.value.trim();
      if (!msg) return;
      appendBubble(dockFeed, msg, true);
      dockInput.value = "";
      setTimeout(() => appendBubble(dockFeed, "AI: registrerat.", false), 400);
    }
  });

  /* ---------- Globala knappar (AI-panel, sökning) ---------- */
  const btnAI = $("#btn-ask-ai");
  const panelAI = $("#panel-ai");

  btnAI?.addEventListener("click", () => {
    panelAI.hidden = !panelAI.hidden;
  });
  $$("[data-close='panel-ai']").forEach(btn => btn.addEventListener("click", () => (panelAI.hidden = true)));

  /* ---------- Enkel sökning (mock-filter) ---------- */
  $("#global-search")?.addEventListener("input", e => {
    const term = e.target.value.toLowerCase();
    if (!term) return;
    console.log("🔍 sökning:", term);
  });

  /* ---------- Klick utanför modaler ---------- */
  document.addEventListener("click", e => {
    $$("dialog[open]").forEach(modal => {
      const rect = modal.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        modal.close();
      }
    });
  });

  /* ---------- Placeholder-laddning (tabeller osv.) ---------- */
  const placeholders = $$(".table-placeholder, .files-placeholder");
  placeholders.forEach(el => {
    el.innerHTML = `<div style="text-align:center;padding:40px;color:#aaa;">Data laddas…</div>`;
  });

  /* ---------- Init-status ---------- */
  console.log("📊 KPI och grundlogik initierad");
});
