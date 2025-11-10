(function () {
  const STORAGE_KEY = 'theme';
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');

  function apply(t) {
    if (t === 'light') {
      root.classList.add('theme-light');
      btn?.setAttribute('aria-pressed','true');
      btn?.setAttribute('aria-label','Apagar la luz');
      btn?.setAttribute('title','Apagar la luz');
      btn && (btn.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i>');
    } else {
      root.classList.remove('theme-light');
      btn?.setAttribute('aria-pressed','false');
      btn?.setAttribute('aria-label','Prender la luz');
      btn?.setAttribute('title','Prender la luz');
      btn && (btn.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>');
    }
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  const system = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  let current = saved || system;
  apply(current);

  btn?.addEventListener('click', () => {
    current = root.classList.contains('theme-light') ? 'dark' : 'light';
    apply(current);
    localStorage.setItem(STORAGE_KEY, current);
  });

  // Respeta cambios del sistema si no hay preferencia guardada
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      current = e.matches ? 'light' : 'dark';
      apply(current);
    }
  });
})();