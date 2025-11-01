
# MergX v7.5.1 – Online Edition (Vercel)

**Online only.** Allt byggt för hosting på Vercel.

## Deploy
1. Skapa GitHub-repo och lägg in dessa filer.
2. Koppla repo till Vercel → Deploy.
3. Öppna sidan → appen startar på `#/dashboard` (hash-routing).

## Filer
- `index.html` – v7.1 layout (sidomeny, huvudpanel)
- `style.css` – ljus glas-design
- `app.js` – all logik (RBAC, routing, AI-coach mock, dokument, affärssidor, workflow, karta, audit)
- `assets/` – logotyp
- `vercel.json` – SPA-routing

## API (placeholders)
I `app.js` → `MX.API`:
- `coach` – POST {message, role}
- `notify` – POST {level,msg}
- `frakt` – POST
- `whatsapp` – POST {to,message}

Byt till riktiga endpoints när backend klar.
