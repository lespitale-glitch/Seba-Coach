/* ===================================================
   main.js — Interactividad y Carga Dinámica Seguro
   Sebastián Zamperoni — SZ Tria Team
=================================================== */

// 1. Importaciones obligatorias desde el módulo seguro de datos
import { elementosATraducir } from './data.js';

/* ================================================
   INTRO SPLASH — se ejecuta antes de DOMContentLoaded
================================================ */
(function () {
  const splash = document.createElement('div');
  splash.id = 'sz-intro';
  splash.innerHTML = `
    <div class="sz-intro__logo">
      <svg class="sz-intro__svg" viewBox="0 0 108 112" xmlns="http://www.w3.org/2000/svg" aria-label="SZ Tria Team">
        <text x="27" y="90"
              font-family="'Cormorant Garamond',Georgia,serif"
              font-size="130" font-weight="700" font-style="italic"
              fill="#FF44E4">Z</text>
        <text x="5" y="80"
              font-family="'Cormorant Garamond',Georgia,serif"
              font-size="130" font-weight="700" font-style="italic"
              fill="#FF44E4">S</text>
      </svg>
      <span class="sz-intro__label">TRIA TEAM</span>
    </div>
    <div class="sz-intro__wipe"></div>
  `;
  document.documentElement.appendChild(splash);
})();

// === IDIOMA ===
// Siempre arranca en español (el HTML está en español y Google lo indexa así).
// El inglés se activa solo con el botón ES/EN.
// Antes se detectaba el idioma del navegador: Googlebot (en inglés) veía
// la página mezclada (hero en español, planes/testimonios/galería en inglés).
let idiomaActual = "ES";
console.log("[i18n] Idioma inicial:", idiomaActual);

document.addEventListener('DOMContentLoaded', () => {
  // Ajustamos el atributo lang del HTML para SEO de entrada
  document.documentElement.setAttribute('lang', idiomaActual.toLowerCase());

  /* ================================================
     SISTEMA COMPLETO DE TRADUCCIÓN INTERNA
  ================================================ */
  // El español es el texto original del HTML: lo guardamos la primera vez
  // y lo restauramos al volver a ES. data.js solo hace falta para el inglés.
  const originales = new Map();

  function textoPara(el, clave, idioma, tipo) {
    if (!originales.has(el)) {
      originales.set(el, {
        html: el.innerHTML,
        placeholder: el.getAttribute('placeholder'),
        alt: el.getAttribute('alt'),
        title: document.title
      });
    }
    if (idioma === 'ES') return originales.get(el)[tipo];
    const traducido = elementosATraducir[idioma] && elementosATraducir[idioma][clave];
    if (!traducido) console.warn(`[i18n] Falta traducción ${idioma}: "${clave}"`);
    return traducido || null;
  }

  function traducirPaginaEstatica(idioma) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const clave = el.getAttribute('data-i18n');
      if (el.tagName === 'TITLE') {
        const t = textoPara(el, clave, idioma, 'title');
        if (t) document.title = t.trim();
      } else {
        const t = textoPara(el, clave, idioma, 'html');
        if (t !== null) el.innerHTML = t;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(input => {
      const t = textoPara(input, input.getAttribute('data-i18n-placeholder'), idioma, 'placeholder');
      if (t) input.placeholder = t;
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(img => {
      const t = textoPara(img, img.getAttribute('data-i18n-alt'), idioma, 'alt');
      if (t) img.alt = t;
    });
    console.log('[i18n] Página traducida a', idioma);
  }


  /* ================================================
      PLANES (están en el HTML): clic en "Consultar" preselecciona el plan
   ================================================ */
  const planesGrid = document.getElementById('planesGrid');
  if (planesGrid) {
    planesGrid.addEventListener('click', (e) => {
      const botonPlan = e.target.closest('.svc-card__btn, .btn');
      if (botonPlan && botonPlan.dataset.plan) {
        const planSeleccionado = botonPlan.dataset.plan;
        const selectorObjetivo = document.getElementById('objetivo');
        if (selectorObjetivo) selectorObjetivo.value = planSeleccionado;
      }
    });
  }

  /* ================================================
     INTRO: secuencia de animación
  ================================================ */
  const intro = document.getElementById('sz-intro');
  const introLabel = intro ? intro.querySelector('.sz-intro__label') : null;

  if (intro) {
    const introImg = intro.querySelector('.sz-intro__svg');
    setTimeout(() => { if (introImg) introImg.style.opacity = '1'; }, 120);
    setTimeout(() => { if (introLabel) introLabel.style.opacity = '1'; }, 480);
    setTimeout(() => { intro.classList.add('sz-intro--glow'); }, 750);
    setTimeout(() => { intro.classList.add('sz-intro--exit'); }, 1380);
    setTimeout(() => { intro.remove(); document.body.classList.add('intro-done'); }, 2120);
  }

  /* ================================================
     NAVBAR: efecto de scroll
  ================================================ */
  const navbar = document.getElementById('navbar');
  const footer = document.querySelector('.footer');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    if (footer) {
      const footerTop = footer.getBoundingClientRect().top;
      navbar.style.opacity = footerTop < window.innerHeight ? '0' : '1';
      navbar.style.pointerEvents = footerTop < window.innerHeight ? 'none' : 'auto';
    }
  }, { passive: true });

  /* ================================================
     NAVBAR: menú hamburguesa móvil
  ================================================ */
  const toggleBtn = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggleBtn && navLinks) {
    function openMenu() {
      navLinks.classList.add('open');
      toggleBtn.innerHTML = '<i class="bi bi-x-lg"></i>';
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.dataset.scrollY = scrollY;
    }

    function closeMenu() {
      navLinks.classList.remove('open');
      toggleBtn.innerHTML = '<i class="bi bi-list"></i>';
      const scrollY = parseInt(document.body.dataset.scrollY || '0');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, scrollY);
      document.documentElement.style.scrollBehavior = '';
    }
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.contains('open') ? closeMenu() : openMenu();
    });
    navLinks.querySelectorAll('.navbar__link, .navbar__cta').forEach((link) => {
      link.addEventListener('click', (event) => {
        if (link.getAttribute('href') === '#inicio') {
          event.preventDefault();

          if (navLinks.classList.contains('open')) {
            closeMenu();
          }
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 50);
          return;
        }

        closeMenu();
      });
    });
  }

  /* ================================================
     NAVBAR: observador de secciones activas
  ================================================ */
  const navItems = document.querySelectorAll('.navbar__link');
  const sections = document.querySelectorAll('section[id], header[id]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  /* ================================================
     CARRUSEL DE TESTIMONIOS
  ================================================ */
  const carousel = document.querySelector('.testi-carousel');
  const track = document.getElementById('testiTrack');
  const dotsWrap = document.querySelector('.testi-dots');
  const btnPrev = document.querySelector('.testi-btn--prev');
  const btnNext = document.querySelector('.testi-btn--next');
  const counter = document.querySelector('.testi-counter');

  let current = 0;
  let autoTimer = null;
  let isAnimating = false;
  let touchStartX = 0;

  if (carousel && track) {

    // Recalcula posición al cambiar de idioma (los textos cambian de largo)
    window.reajustarTestimonios = function () {
      buildDots();
      current = Math.min(current, totalSlides() - 1);
      goTo(current);
    };

    function getVisible() { return (window.innerWidth >= 1024) ? 2 : 1; }
    function totalSlides() { return track.querySelectorAll('.testi-card').length - getVisible() + 1; }

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      for (let i = 0; i < totalSlides(); i++) {
        const d = document.createElement('button');
        d.className = 'testi-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', `Testimonio ${i + 1}`);
        d.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(d);
      }
    }

    function updateDots() {
      if (!dotsWrap) return;
      dotsWrap.querySelectorAll('.testi-dot').forEach((d, i) => { d.classList.toggle('active', i === current); });
    }

    function updateCounter() {
      if (!counter) return;
      counter.textContent = `${current + 1} / ${totalSlides()}`;
    }

    function updateButtons() {
      if (btnPrev) btnPrev.disabled = current === 0;
      if (btnNext) btnNext.disabled = current >= totalSlides() - 1;
    }

    function goTo(index) {
      const cards = track.querySelectorAll('.testi-card');
      if (!cards.length) return;

      const total = totalSlides();
      current = Math.max(0, Math.min(index, total - 1));

      // Solución recomendada dentro de goTo(index):
      const gap = parseFloat(window.getComputedStyle(track).gap) || 20;
      const cardW = cards[0].getBoundingClientRect().width;
      const shift = current * (cardW + gap);
      track.style.transform = `translateX(-${shift}px)`;

      updateDots();
      updateCounter();
      updateButtons();
      updateActiveCards(cards);
    }

    function updateActiveCards(cards) {
      const visible = getVisible();
      cards.forEach((card, i) => {
        const isActive = i >= current && i < current + visible;
        card.classList.toggle('testi-card--active', isActive);
      });
      carousel.classList.add('has-active');
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(() => {
        if (current >= totalSlides() - 1) goTo(0);
        else next();
      }, 5000);
    }

    function stopAuto() { if (autoTimer) clearInterval(autoTimer); }

    if (btnPrev) btnPrev.addEventListener('click', () => { prev(); stopAuto(); startAuto(); });
    if (btnNext) btnNext.addEventListener('click', () => { next(); stopAuto(); startAuto(); });

    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);
    carousel.addEventListener('touchstart', stopAuto, { passive: true });

    track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); stopAuto(); startAuto(); }
    });

    window.addEventListener('resize', () => {
      buildDots();
      current = Math.min(current, totalSlides() - 1);
      goTo(current);
    });

    buildDots();
    goTo(0);
    startAuto();
    console.log('[testimonios] Slider listo con', track.querySelectorAll('.testi-card').length, 'tarjetas');
  }

  /* ================================================
        GALERÍA (está en el HTML): lightbox al tocar una foto
     ================================================ */
  const galeriaGrid = document.getElementById('galeriaGrid');
  if (galeriaGrid) {
    galeriaGrid.querySelectorAll('.galeria__item img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';

        const bigImg = document.createElement('img');
        bigImg.src = img.src;
        bigImg.alt = img.alt;

        overlay.appendChild(bigImg);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        const handleKey = (ev) => { if (ev.key === 'Escape') closeLightbox(); };
        function closeLightbox() {
          document.removeEventListener('keydown', handleKey);
          overlay.style.opacity = '0';
          overlay.style.transition = 'opacity 0.2s ease';
          setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 200);
        }
        overlay.addEventListener('click', closeLightbox);
        document.addEventListener('keydown', handleKey);
      });
    });
  }

  /* ================================================
       FORMULARIO: PRUEBA DE CONEXIÓN CON LOGS DE CONTROL
    ================================================ */
  const form = document.getElementById('coachForm');
  if (form) {
    console.log("Formulario detectado en el DOM correctamente."); // CONTROL 1

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log("Evento submit disparado."); // CONTROL 2

      const btn = form.querySelector('[type="submit"]');
      const orig = btn.innerHTML;

      // 1. CONTROL ANTI-SPAM (Honeypot)
      const trampa = document.getElementById('campo_trampa');
      console.log("Valor de la trampa anti-spam:", trampa ? trampa.value : "No existe el input"); // CONTROL 3

      if (trampa && trampa.value !== "") {
        console.warn("¡ENVÍO BLOQUEADO POR TRAMPA SENSORA! El campo oculto contenía texto."); // CONTROL 4
        btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> ¡Mensaje enviado!';
        btn.style.background = '#2e7d32';
        form.reset();
        return;
      }

      // 2. Animación de carga
      btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando...';
      btn.disabled = true;
      btn.style.background = '#444';

      // 3. Captura y visualización de lo que viaja
      const formData = new FormData(form);
      console.log("Datos capturados para enviar:"); // CONTROL 5
      for (let [key, value] of formData.entries()) {
        console.log(`- ${key}: ${value}`);
      }

      const actionURL = form.action;
      console.log("Enviando a la URL:", actionURL); // CONTROL 6

      // 4. Intento de envío real
      fetch(actionURL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      })
        .then(() => {
          console.log("¡FETCH EXITOSO! Google aceptó la petición."); // CONTROL 7
          btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> ¡Mensaje enviado!';
          btn.style.background = '#2e7d32';
          form.reset();
        })
        .catch((error) => {
          console.error("¡FALLÓ EL FETCH! Error de conexión de red:", error); // CONTROL 8
          btn.innerHTML = '<i class="bi bi-exclamation-triangle-fill"></i> Error al enviar';
          btn.style.background = '#d32f2f';
        })
        .finally(() => {
          setTimeout(() => {
            btn.innerHTML = orig;
            btn.style.background = '';
            btn.disabled = false;
          }, 4000);
        });
    });
  } else {
    console.error("ERROR CRÍTICO: No se encontró ningún elemento con ID 'coachForm' en el DOM."); // CONTROL EXTRA
  }

  /* ================================================
     SCROLL REVEAL
  ================================================ */
  const revealEls = document.querySelectorAll(
    '.svc-card, .galeria__item, .contacto__info, .contacto__form-wrap, .sobre__visual, .sobre__content, .tp-box, .testi-card'
  );

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.closest('.cards-grid')
          ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.12
          : 0;
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay * 1000);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ================================================
       ESCUCHADOR DEL BOTÓN SWITCH DE IDIOMAS (UNIFICADO AL FINAL)
    ================================================ */
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      idiomaActual = (idiomaActual === "ES") ? "EN" : "ES";
      langToggle.setAttribute('data-lang', idiomaActual.toLowerCase());
      document.documentElement.setAttribute('lang', idiomaActual.toLowerCase());

      const label = document.getElementById('langLabel');
      if (label) label.textContent = (idiomaActual === "ES") ? "ES" : "EN";

      // Disparadores dinámicos en orden de carga
      traducirPaginaEstatica(idiomaActual);
      if (typeof window.reajustarTestimonios === 'function') window.reajustarTestimonios();
    });
  }

  /* ================================================
       CARTEL "VIEW IN ENGLISH?" (solo navegadores no hispanos)
       No cambia el idioma solo: Google sigue viendo la página en español.
    ================================================ */
  mostrarSugerenciaIngles();

  function mostrarSugerenciaIngles() {
    const navLang = (navigator.language || 'es').toLowerCase();
    if (navLang.startsWith('es')) return;

    let yaCerrado = false;
    try { yaCerrado = localStorage.getItem('sz-lang-sugerido') === '1'; } catch (e) {}
    if (yaCerrado) {
      console.log('[i18n] Sugerencia de inglés ya cerrada antes, no se muestra');
      return;
    }

    const aviso = document.createElement('div');
    aviso.className = 'lang-suggest';
    aviso.setAttribute('role', 'dialog');
    aviso.setAttribute('aria-label', 'Language suggestion');
    aviso.setAttribute('data-nosnippet', ''); // Que Google no lo use en el resultado
    aviso.innerHTML = `
      <span class="lang-suggest__text">View this site in English?</span>
      <button type="button" class="lang-suggest__yes">English</button>
      <button type="button" class="lang-suggest__close" aria-label="Close">
        <i class="bi bi-x-lg"></i>
      </button>
    `;
    document.body.appendChild(aviso);
    console.log('[i18n] Navegador en', navLang, '→ muestro sugerencia de inglés');

    const cerrar = () => {
      try { localStorage.setItem('sz-lang-sugerido', '1'); } catch (e) {}
      aviso.remove();
    };

    aviso.querySelector('.lang-suggest__yes').addEventListener('click', () => {
      if (idiomaActual !== 'EN' && langToggle) langToggle.click();
      console.log('[i18n] Usuario eligió inglés desde el cartel');
      cerrar();
    });
    aviso.querySelector('.lang-suggest__close').addEventListener('click', cerrar);
  }

});