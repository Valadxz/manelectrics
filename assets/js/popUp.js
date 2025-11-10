document.addEventListener('DOMContentLoaded', () => {
  const openBtn  = document.getElementById('whats-openPopup');
  const popup    = document.querySelector('.popup-whatsapp');
  const closeBtn = document.querySelector('.closePopup');
  const input    = document.getElementById('whats-in');
  const sendBtn  = document.getElementById('send-btn');

  const phone = '525512345678'; // <-- número en formato internacional sin "+"
  const encode = s => encodeURIComponent(s.trim());

  function openPopup() {
    popup.classList.add('open');
    popup.setAttribute('aria-hidden','false');
    openBtn.setAttribute('aria-expanded','true');
    setTimeout(() => input?.focus(), 200);
  }
  function closePopup() {
    popup.classList.remove('open');
    popup.setAttribute('aria-hidden','true');
    openBtn.setAttribute('aria-expanded','false');
  }

  openBtn.addEventListener('click', () => {
    popup.classList.contains('open') ? closePopup() : openPopup();
  });
  closeBtn.addEventListener('click', closePopup);

  sendBtn.addEventListener('click', () => {
    const msg = input.value || 'Hola, me gustaría recibir información.';
    const url = `https://wa.me/${phone}?text=${encode(msg)}`;
    window.open(url, '_blank');
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendBtn.click();
  });
});
