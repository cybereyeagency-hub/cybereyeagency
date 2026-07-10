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

## SEO / indeksowanie (cybereyeagency.pl)

Repozytorium zawiera `public/robots.txt` i `public/sitemap.xml` oraz meta tagi (description, canonical, Open Graph) na obu stronach, żeby ułatwić wyszukiwarkom zaindeksowanie serwisu pod domeną `cybereyeagency.pl`.

Aby zweryfikować własność domeny w Google Search Console:

1. Wejdź na https://search.google.com/search-console i dodaj właściwość `cybereyeagency.pl`.
2. Wybierz metodę weryfikacji „Tag HTML" — Google wygeneruje kod w postaci `<meta name="google-site-verification" content="...">`.
3. Podmień wartość `TWOJ_KOD_WERYFIKACYJNY_Z_GSC` w `public/index.html` (w sekcji `<head>`) na kod otrzymany z Google.
4. Wdróż stronę i kliknij „Zweryfikuj" w Search Console.
5. Po weryfikacji dodaj `sitemap.xml` w zakładce Sitemaps w Search Console: `https://cybereyeagency.pl/sitemap.xml`.
