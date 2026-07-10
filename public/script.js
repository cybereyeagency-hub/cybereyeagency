(() => {
  const toggleBtn = document.getElementById("chat-toggle");
  const closeBtn = document.getElementById("chat-close");
  const panel = document.getElementById("chat-panel");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const messagesEl = document.getElementById("chat-messages");

  const history = [];

  function addMessage(role, text) {
    const div = document.createElement("div");
    div.className = `msg ${role}`;
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function setOpen(open) {
    panel.classList.toggle("hidden", !open);
    if (open) input.focus();
  }

  toggleBtn.addEventListener("click", () => {
    setOpen(panel.classList.contains("hidden"));
  });
  closeBtn.addEventListener("click", () => setOpen(false));

  if (history.length === 0) {
    addMessage(
      "assistant",
      "Cześć! Jestem asystentem AI CyberEyeAgency. Zapytaj mnie o nasze usługi, cyberbezpieczeństwo lub jak się z nami skontaktować."
    );
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
    history.push({ role: "user", content: text });
    input.value = "";
    input.disabled = true;
    form.querySelector("button").disabled = true;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();

      if (!res.ok) {
        addMessage("error", data.error || "Coś poszło nie tak.");
      } else {
        addMessage("assistant", data.reply);
        history.push({ role: "assistant", content: data.reply });
      }
    } catch (err) {
      addMessage("error", "Nie udało się połączyć z serwerem.");
    } finally {
      input.disabled = false;
      form.querySelector("button").disabled = false;
      input.focus();
    }
  });
})();
