# CLAUDE.md — cybereyeagency.pl

## O projekcie

**cybereyeagency.pl** to agencja marketingowa z Wrocławia oferująca usługi:
- Migracja stron i sklepów internetowych
- Tworzenie stron www i sklepów Shopify
- SEO i pozycjonowanie
- Branding i identyfikacja wizualna

**Platforma:** Shopify  
**Hosting:** CyberFolks (DirectAdmin)  
**Domena:** cybereyeagency.pl

## Struktura repozytorium

To repozytorium służy do zarządzania kodem, treściami i automatyzacją dla cybereyeagency.pl.

## Połączenia (MCP)

### Shopify
- Sklep podłączony przez MCP Shopify
- Umożliwia zarządzanie: produktami, kolekcjami, zamówieniami, klientami, analityką

### Gmail
- Podłączony przez MCP Gmail
- Do obsługi korespondencji agencji

### Canva
- Podłączony przez MCP Canva
- Do tworzenia i edycji materiałów graficznych

## SEO — znane problemy

- Strona indeksowana słabo przez Google (lipiec 2026)
- Serwer CyberFolks może blokować Googlebot przez mod_security
- Do sprawdzenia: plik `.htaccess` w public_html
- Do zrobienia: zgłosić sitemap.xml w Google Search Console

## Tworzenie treści SEO

Przy pisaniu artykułów i podstron SEO:
- Używaj naturalnego języka po polsku
- Lokalizuj treści pod konkretne miasta (Wrocław, Nowy Targ, itp.)
- Keyword density: 1-2% dla głównej frazy
- Struktura: H1 → H2 → H3, minimum 600 słów
- Zawsze dodawaj meta title (max 60 znaków) i meta description (max 160 znaków)

## Popularne zadania

### Dodanie strony SEO na Shopify
```
Napisz artykuł SEO dla miasta [MIASTO] o usłudze [USŁUGA]
Dodaj go jako stronę w Shopify przez MCP
```

### Sprawdzenie indeksacji
```
Wyszukaj: site:cybereyeagency.pl
```

### Sprawdzenie sklepu
```
Użyj MCP Shopify → get-shop-info
```
