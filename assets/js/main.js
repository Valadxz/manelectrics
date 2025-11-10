
//navbar toggle icon
function navbar_toggler() {
    $('.navbar-toggler[data-toggle=collapse]').click(function () {
        if ($(".navbar-toggler[data-bs-toggle=collapse] i").hasClass('fa-bars')) {
        } else {
            $(".navbar-toggler[data-bs-toggle=collapse] i").removeClass("fa-times");
        }
    });
}
navbar_toggler();

// navbar clone in mobile device
function navClone() {
    $('.js-clone-nav').each(function () {
        var $this = $(this);
        $this.clone().attr('class', 'navbar-nav ml-auto').appendTo('.d2c_mobile_view_body');
    });

    $('.d2c_mobile_view .nav-link').click(function () {
        $(".nav-link").removeClass("active");
        $('.d2c_mobile_view').removeClass('show');
        $(this).toggleClass('active');
    });
}
navClone();

// partner silder js
$('.d2c_partner_slider').slick({
    dots: false,
    arrows: false,
    infinite: true,
    autoplay:true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
});

// team silder js
$('.d2c_team_slider').slick({
  centerMode: true,
  centerPadding: '0px',
  dots: true,
  arrows: false,
  infinite: true,
  autoplay:true,
  speed: 2000,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        centerPadding: '24px',
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 667,
      settings: {
        slidesToShow: 1,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        centerPadding: '0px',
      }
    }
  ]
});

// js for fancybox slide & button

function fancybox() {
  $('[data-fancybox]').fancybox({
      protect: true,
      buttons: [
          "fullScreen",
          "thumbs",
          "share",
          "slideShow",
          "close"
      ],
      image: {
          preload: false
      },
  });
}
fancybox();

// form validation js
(function () {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})();

// testimonial silder js
$('.testimonial_slider').slick({
  centerMode: true,
  centerPadding: '0px',
  dots: true,
  arrows: false,
  infinite: true,
  autoplay:true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 1,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 1,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
});

// Preloader JS
window.addEventListener('load', function() {
  var preloader = document.querySelector('.preloader');
  preloader.classList.add('hide');
});

// ScrollBtn JS
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
  var scrollBtn = document.getElementById("scrollBtn");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      scrollBtn.classList.add("show");
  } else {
      scrollBtn.classList.remove("show");
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('heroSlider');
  const fill = document.querySelector('.hero-progress-fill');
  let interval = slider?.getAttribute('data-bs-interval') || 6500;
  let anim;

  function startBar() {
    fill.style.transition = 'none';
    fill.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.transition = `width ${interval}ms linear`;
        fill.style.width = '100%';
      });
    });
  }

  slider.addEventListener('slide.bs.carousel', () => {
    // al iniciar transición, reinicia barra
    startBar();
  });

  slider.addEventListener('slid.bs.carousel', () => {
    // al terminar, nos aseguramos esté llena (por si hubo interrupciones)
    fill.style.width = '100%';
  });

  // iniciar al cargar
  startBar();
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".d2c_contact_wrapper form");
  const button = form.querySelector(".btn");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // evita recarga real, simula envío
    button.classList.add("sending");

    // Simula un breve tiempo de envío
    setTimeout(() => {
      button.classList.remove("sending");
      button.classList.add("sent");

      // Crea mensaje flotante
      const alert = document.createElement("div");
      alert.className = "contact-alert";
      alert.innerHTML = "✅ Mensaje enviado correctamente";
      document.body.appendChild(alert);

      // Desaparece después de 3 s
      setTimeout(() => {
        alert.classList.add("hide");
        setTimeout(() => alert.remove(), 400);
      }, 3000);

      // Reset del formulario
      form.reset();
      setTimeout(() => button.classList.remove("sent"), 2000);
    }, 1500);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.about-stats .count');
  let done = false;

  function animate() {
    if (done) return;
    counters.forEach(el => {
      const end = parseInt(el.dataset.target, 10);
      const start = 0;
      const duration = 1200;
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        el.textContent = Math.floor(start + (end - start) * p);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    done = true;
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animate(); io.disconnect(); } });
  }, { threshold: 0.35 });

  const section = document.querySelector('#about');
  if (section) io.observe(section);
});
