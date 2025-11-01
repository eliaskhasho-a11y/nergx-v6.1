# MergX v7.3b – Light, Stable (builds on v7.1/7.2)

Detta är en stabil påbyggnad ovanpå v7.1/v7.2, enligt planen för v7.3 med AI-nav, notiser, hash-routing och förberedd AI-karta.
Hosta statiskt (Vercel, Netlify eller lokal).

## Snabbstart lokalt
1) Öppna `index.html` direkt i webbläsaren (eller kör `python3 -m http.server 8000` och gå till http://localhost:8000).
2) Appen använder *hash routing*. Standardroute är `#/dashboard`.
3) Enter skickar meddelande i AI Coach / Chat.

## Deploy på Vercel
- Detta repo kan deployas som statisk sajt.
- `vercel.json` ingår och aktiverar cleanUrls.
- Hash-routing innebär att allt fungerar utan server-side routes.

## Struktur
- index.html — grundlayout + nav + content + AI Coach + Notiser
- assets/css/theme.css — ljust tema, glas-kort, responsiv design
- app/js/main.js — router, state, init, UI-helpers
- app/js/dashboard.js — dashboard-render
- app/js/crm.js — kunder/CRM modul (placeholderlista)
- app/js/economy.js — ekonomi/budget placeholder
- app/js/ai.js — AI Coach 2.1 (enter-to-send, autoskroll, kontextchip)
- app/js/notifications.js — notislistan
- app/js/map.js — AI-karta (Leaflet-ready placeholder)

## Noteringar
- All data är mock / placeholder tills riktiga API:n kopplas in.
- Leaflet/OSM kan aktiveras senare genom att importera script i index.html och initiera i map.js.
