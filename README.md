# cybereyeagency

Strona cybereyeagency.pl z formularzem kontaktowym zintegrowanym z Claude API.
Wiadomości wysłane przez formularz są automatycznie kategoryzowane
(incydent / wycena / pytanie ogólne / inne) i podsumowywane przez Claude,
co przyspiesza reakcję zespołu.

## Uruchomienie lokalne

1. Zainstaluj zależności:
   ```
   npm install
   ```
2. Skopiuj `.env.example` do `.env` i uzupełnij `ANTHROPIC_API_KEY`
   swoim kluczem API z [console.anthropic.com](https://console.anthropic.com):
   ```
   cp .env.example .env
   ```
3. Uruchom serwer:
   ```
   npm start
   ```
4. Otwórz [http://localhost:3000](http://localhost:3000).

## Struktura projektu

- `server.js` &mdash; serwer Express, obsługuje statyczne pliki oraz endpoint
  `POST /api/contact`, który wywołuje Claude API.
- `public/` &mdash; statyczna strona (HTML/CSS/JS) z sekcją usług i formularzem
  kontaktowym.
