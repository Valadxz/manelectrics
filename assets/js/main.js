  // ================ UTILIDADES ================
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
const $1 = (sel, ctx=document) => ctx.querySelector(sel);

// ================ NAVBAR (BS5) ================
(function navbar() {
  // Toggler icon (fa-bars ↔ fa-times) usando eventos del collapse de Bootstrap 5
  const toggler = $1('.navbar-toggler');
  if (toggler) {
    const icon = toggler.querySelector('i');
    const targetSel = toggler.getAttribute('data-bs-target') || toggler.getAttribute('data-target');
    const target = targetSel ? $1(targetSel) : null;

    // Si no hay icono, no hacemos nada
    if (icon && target) {
      target.addEventListener('shown.bs.collapse', () => {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      });
      target.addEventListener('hidden.bs.collapse', () => {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    }
  }

  // Clonado de navegación para panel móvil (evitar duplicados)
  const container = $1('.d2c_mobile_view_body');
  const src = $1('.js-clone-nav');
  if (container && src && !container.dataset.cloned) {
    const clone = src.cloneNode(true);
    clone.className = 'navbar-nav ml-auto';
    container.appendChild(clone);
    container.dataset.cloned = 'true';

    // Activar link y cerrar panel lateral
    $$('.d2c_mobile_view .nav-link').forEach(a => {
      a.addEventListener('click', () => {
        $$('.nav-link').forEach(x => x.classList.remove('active'));
        $1('.d2c_mobile_view')?.classList.remove('show');
        a.classList.add('active');
      }, { once:false });
    });
  }
})();

// ================ SLIDERS (Slick) ================
(function sliders(){
  if (window.jQuery && typeof jQuery.fn.slick === 'function') {
    // Partner
    if (jQuery('.d2c_partner_slider').length) {
      jQuery('.d2c_partner_slider').not('.slick-initialized').slick({
        dots:false, arrows:false, infinite:true, autoplay:true, speed:2000,
        slidesToShow:6, slidesToScroll:1,
        responsive:[
          { breakpoint:1400, settings:{ slidesToShow:4 } },
          { breakpoint:1200, settings:{ slidesToShow:3 } },
          { breakpoint:992,  settings:{ slidesToShow:3 } },
          { breakpoint:480,  settings:{ slidesToShow:2 } },
        ]
      });
    }
    // Team
    if (jQuery('.d2c_team_slider').length) {
      jQuery('.d2c_team_slider').not('.slick-initialized').slick({
        centerMode:true, centerPadding:'0px', dots:true, arrows:false, infinite:true,
        autoplay:true, speed:2000, slidesToShow:3, slidesToScroll:1,
        responsive:[
          { breakpoint:1400, settings:{ slidesToShow:3, centerPadding:'24px' } },
          { breakpoint:1200, settings:{ slidesToShow:2 } },
          { breakpoint:992,  settings:{ slidesToShow:2 } },
          { breakpoint:667,  settings:{ slidesToShow:1 } },
          { breakpoint:480,  settings:{ slidesToShow:1, centerPadding:'0px' } },
        ]
      });
    }
    // Testimonial
    if (jQuery('.testimonial_slider').length) {
      jQuery('.testimonial_slider').not('.slick-initialized').slick({
        centerMode:true, centerPadding:'0px', dots:true, arrows:false, infinite:true,
        autoplay:true, speed:2000, slidesToShow:1, slidesToScroll:1
      });
    }
  }
})();

// ================ FANCYBOX (si está) ================
(function fancyboxInit(){
  if (window.jQuery && jQuery('[data-fancybox]').length && jQuery.fancybox) {
    jQuery('[data-fancybox]').fancybox({
      protect:true,
      buttons:["fullScreen","thumbs","share","slideShow","close"],
      image:{ preload:false }
    });
  }
})();

// ================ BOOTSTRAP VALIDATION (no bloquea nuestro submit) ================
(function validation(){
  const forms = document.querySelectorAll('.needs-validation');
  Array.prototype.slice.call(forms).forEach(form => {
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();

// ================ PRELOADER ================
window.addEventListener('load', () => {
  const pre = $1('.preloader');
  if (pre) pre.classList.add('hide');
});

// ================ SCROLL BTN ================
(function scrollBtn(){
  const btn = $1('#scrollBtn');
  if (!btn) return;
  function onScroll(){
    const y = document.documentElement.scrollTop || document.body.scrollTop;
    btn.classList.toggle('show', y > 100);
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
})();

// ================ HERO PROGRESS BAR (BS carousel) ================
document.addEventListener('DOMContentLoaded', () => {
  const slider = $1('#heroSlider');
  const fill   = $1('.hero-progress-fill');
  if (!slider || !fill) return;

  let interval = Number(slider.getAttribute('data-bs-interval') || 6500);
  function startBar(){
    fill.style.transition = 'none';
    fill.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.transition = `width ${interval}ms linear`;
        fill.style.width = '100%';
      });
    });
  }
  slider.addEventListener('slide.bs.carousel', startBar);
  slider.addEventListener('slid.bs.carousel', () => { fill.style.width = '100%'; });
  startBar();
});

// ================ CONTACT FORM (sin encimar toasts) ================
document.addEventListener('DOMContentLoaded', () => {
  // Usa el form por id si existe; fallback a wrapper
  const originalForm = $1('#contact-form') || $1('.d2c_contact_wrapper form');
  if (!originalForm) return;

  // Limpia posibles listeners duplicados clonando el form
  const form = originalForm.cloneNode(true);
  originalForm.parentNode.replaceChild(form, originalForm);

  const btn    = form.querySelector('button[type="submit"]');
  const fields = form.querySelectorAll('input, textarea, select');
  const BTN_DEFAULT = (btn?.textContent || 'Enviar Mensaje').trim();
  let isSending = false;

  // Toast root único
  function toastRoot(){
    let root = $1('#toast-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'toast-root';
      document.body.appendChild(root);
    }
    return root;
  }
  function showToast(message, type='success', ttl=3200){
    const root = toastRoot();
    root.innerHTML = ''; // reemplaza el anterior (no se enciman)
    const el = document.createElement('div');
    el.className = `contact-toast ${type}`;
    el.setAttribute('role','status');
    el.setAttribute('aria-live','polite');
    el.innerHTML = `
      <span class="toast-icon">${type==='success'?'✅':type==='error'?'⚠️':'ℹ️'}</span>
      <span class="toast-text">${message}</span>
      <button class="toast-close" aria-label="Cerrar">×</button>
    `;
    root.appendChild(el);
    el.querySelector('.toast-close').addEventListener('click', () => hideToast(el));
    el._t = setTimeout(() => hideToast(el), ttl);
  }
  function hideToast(el){
    if (!el) return;
    clearTimeout(el._t);
    el.classList.add('hide');
    el.addEventListener('animationend', () => el.remove(), { once:true });
  }
  function setDisabled(state){
    fields.forEach(f => f.disabled = state);
    if (btn) btn.disabled = state;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validación nativa + bootstrap
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      form.reportValidity();
      return;
    }

    if (isSending) return; // evita doble submit
    isSending = true;
    setDisabled(true);

    if (btn){
      btn.dataset.originalText = BTN_DEFAULT;
      btn.textContent = 'Enviando…';
      btn.classList.add('sending');
    }

    // Simulación de envío (sustituye por fetch/axios real)
    setTimeout(() => {
      // éxito
      btn?.classList.remove('sending');
      btn?.classList.add('sent');
      if (btn) btn.textContent = 'Enviado ✓';

      showToast('Mensaje enviado correctamente', 'success', 3200);
      form.reset();
      setDisabled(false);

      setTimeout(() => {
        btn?.classList.remove('sent');
        if (btn) btn.textContent = btn.dataset.originalText || BTN_DEFAULT;
        isSending = false;
      }, 900);
    }, 1100);
  });
});

// ================ COUNTERS (About) ================
document.addEventListener('DOMContentLoaded', () => {
  const counters = $$('.about-stats .count');
  if (!counters.length) return;

  let done = false;
  function animate(){
    if (done) return;
    counters.forEach(el => {
      const end = parseInt(el.dataset.target || '0', 10);
      const start = 0, duration = 1200, t0 = performance.now();
      const step = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        el.textContent = Math.floor(start + (end - start) * p);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    done = true;
  }

  const section = $1('#about');
  if (!section) { animate(); return; }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animate(); io.disconnect(); }
    });
  }, { threshold: 0.35 });

  io.observe(section);
});
