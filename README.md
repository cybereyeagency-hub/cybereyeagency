# cybereyeagency

Strona firmowa CyberEyeAgency z chatbotem AI opartym na Claude API.

## Stos technologiczny

- Statyczny frontend: `public/index.html`, `public/style.css`, `public/script.js`
- Backend: Node.js + Express (`server.js`), endpoint `POST /api/chat` wywołujący Claude API przez oficjalne SDK (`@anthropic-ai/sdk`)

## Uruchomienie lokalne

1. Zainstaluj zależności:
   ```bash
   npm install
   ```
2. Skopiuj `.env.example` do `.env` i uzupełnij klucz API:
   ```bash
   cp .env.example .env
   ```
   Klucz API Anthropic wygenerujesz na https://console.anthropic.com/settings/keys — wklej go jako `ANTHROPIC_API_KEY` w pliku `.env`.
3. Uruchom serwer:
   ```bash
   npm start
   ```
4. Otwórz http://localhost:3000

## Wdrożenie

Backend to zwykła aplikacja Express — możesz ją wdrożyć na dowolnym hostingu Node.js (Render, Railway, Fly.io, VPS itp.). Ustaw zmienną środowiskową `ANTHROPIC_API_KEY` w konfiguracji hostingu — nigdy nie commituj klucza do repozytorium.
