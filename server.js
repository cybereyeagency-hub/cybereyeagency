require("dotenv").config();

const express = require("express");
const Anthropic = require("@anthropic-ai/sdk").default;

const app = express();
const PORT = process.env.PORT || 3000;

const client = new Anthropic();

const SYSTEM_PROMPT = `Jesteś asystentem AI firmy CyberEyeAgency — agencji specjalizującej się w cyberbezpieczeństwie (testy penetracyjne, audyty bezpieczeństwa, monitoring zagrożeń, szkolenia z cyberbezpieczeństwa).
Odpowiadaj rzeczowo i zwięźle po polsku (chyba że użytkownik pisze w innym języku — wtedy odpowiadaj w jego języku).
Pomagaj odwiedzającym zrozumieć ofertę firmy, odpowiadaj na ogólne pytania o cyberbezpieczeństwo i zachęcaj do kontaktu w sprawie wyceny, gdy pytanie dotyczy konkretnego zlecenia.
Nie podawaj się za człowieka — jeśli ktoś zapyta, przyznaj, że jesteś asystentem AI.`;

const MAX_MESSAGES = 40;

app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Pole 'messages' jest wymagane." });
  }
  if (messages.length > MAX_MESSAGES) {
    return res.status(400).json({ error: "Zbyt długa konwersacja." });
  }
  for (const m of messages) {
    if (
      !m ||
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string" ||
      m.content.length > 4000
    ) {
      return res.status(400).json({ error: "Nieprawidłowy format wiadomości." });
    }
  }

  try {
    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    const textBlock = response.content.find((block) => block.type === "text");
    res.json({ reply: textBlock ? textBlock.text : "" });
  } catch (err) {
    console.error("Claude API error:", err);
    res.status(502).json({ error: "Błąd komunikacji z asystentem AI. Spróbuj ponownie." });
  }
});

app.listen(PORT, () => {
  console.log(`CyberEyeAgency serwer działa na http://localhost:${PORT}`);
});
