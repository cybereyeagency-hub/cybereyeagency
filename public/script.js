const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  statusEl.className = 'form-status';
  statusEl.textContent = 'Wysyłanie...';

  const payload = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim(),
  };

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Nie udało się wysłać wiadomości.');
    }

    statusEl.textContent = data.message;
    statusEl.className = 'form-status success';
    form.reset();
  } catch (err) {
    statusEl.textContent = err.message;
    statusEl.className = 'form-status error';
  } finally {
    submitButton.disabled = false;
  }
});
