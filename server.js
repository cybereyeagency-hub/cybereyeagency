require('dotenv').config();
const express = require('express');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const port = process.env.PORT || 3000;

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Wszystkie pola są wymagane.' });
  }

  try {
    const completion = await anthropic.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 300,
      system:
        'Jesteś asystentem AI agencji cyberbezpieczeństwa CyberEye Agency. ' +
        'Przeanalizuj zgłoszenie z formularza kontaktowego i odpowiedz WYŁĄCZNIE ' +
        'obiektem JSON (bez dodatkowego tekstu) z polami: ' +
        'category (jedna z: "incydent", "wycena", "pytanie_ogolne", "inne"), ' +
        'urgency ("niski", "sredni", "wysoki"), ' +
        'summary (jedno zdanie po polsku podsumowujące zgłoszenie).',
      messages: [
        { role: 'user', content: `Imię: ${name}\nEmail: ${email}\nWiadomość: ${message}` },
      ],
    });

    const raw = completion.content[0]?.type === 'text' ? completion.content[0].text : '{}';
    let analysis;
    try {
      analysis = JSON.parse(raw);
    } catch {
      analysis = { category: 'inne', urgency: 'sredni', summary: raw };
    }

    console.log('Nowe zgłoszenie z formularza kontaktowego:', { name, email, message, analysis });

    res.json({
      success: true,
      message: 'Dziękujemy za wiadomość! Skontaktujemy się wkrótce.',
      analysis,
    });
  } catch (err) {
    console.error('Błąd wywołania Claude API:', err);
    res.status(502).json({ error: 'Wystąpił błąd podczas przetwarzania zgłoszenia. Spróbuj ponownie później.' });
  }
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
