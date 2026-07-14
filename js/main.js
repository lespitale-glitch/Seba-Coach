/* ===================================================
   main.js — Interactividad y Carga Dinámica Seguro
   Sebastián Zamperoni — SZ Tria Team
=================================================== */

// 1. Importaciones obligatorias desde el módulo seguro de datos
import { testimoniosData, planesData, galeriaData, elementosATraducir } from './data.js';

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

// === DETECCIÓN AUTOMÁTICA DE IDIOMA ===
let idiomaActual = "ES";
const usuarioLang = (navigator.language || navigator.userLanguage).toLowerCase();

// Si el navegador del usuario NO está en español, seteamos inglés por defecto
if (!usuarioLang.startsWith('es')) {
  idiomaActual = "EN";
}

document.addEventListener('DOMContentLoaded', () => {
  // Ajustamos el atributo lang del HTML para SEO de entrada
  document.documentElement.setAttribute('lang', idiomaActual.toLowerCase());

  /* ================================================
     SISTEMA COMPLETO DE TRADUCCIÓN INTERNA
  ================================================ */
  function traducirPaginaEstatica(idioma) {
    const etiquetas = document.querySelectorAll('[data-i18n]');
    etiquetas.forEach(el => {
      const clave = el.getAttribute('data-i18n');
      if (elementosATraducir[idioma] && elementosATraducir[idioma][clave]) {
        if (el.tagName === "TITLE") {
          document.title = elementosATraducir[idioma][clave];
        } else {
          el.innerHTML = elementosATraducir[idioma][clave];
        }
      }
    });

    const inputsConPlaceholder = document.querySelectorAll('[data-i18n-placeholder]');
    inputsConPlaceholder.forEach(input => {
      const clavePH = input.getAttribute('data-i18n-placeholder');
      if (elementosATraducir[idioma] && elementosATraducir[idioma][clavePH]) {
        input.placeholder = elementosATraducir[idioma][clavePH];
      }
    });
  }

  /* ================================================
     ESCUCHADOR DEL BOTÓN SWITCH DE IDIOMAS (langToggle)
  ================================================ */
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      idiomaActual = (idiomaActual === "ES") ? "EN" : "ES";
      langToggle.setAttribute('data-lang', idiomaActual.toLowerCase());

      traducirPaginaEstatica(idiomaActual);

      if (typeof window.dibujarTarjetasPlanes === 'function') {
        window.dibujarTarjetasPlanes(idiomaActual);
      }

      if (typeof window.dibujarTarjetasTestimonios === 'function') {
        window.dibujarTarjetasTestimonios(idiomaActual);
      }

      // === AGREGA ESTA LÍNEA ACÁ PARA TRADUCIR LA GALERÍA ===
      if (typeof window.dibujarGaleria === 'function') {
        window.dibujarGaleria(idiomaActual);
      }
    });
  }

  /* ================================================
      INYECCIÓN DINÁMICA DE PLANES PREMIUM (TRADUCIBLE)
   ================================================ */
  const planesGrid = document.getElementById('planesGrid');
  if (planesGrid) {
    window.dibujarTarjetasPlanes = function (idioma) {
      planesGrid.innerHTML = planesData.map(plan => {
        const claseCard = plan.highlight ? 'svc-card svc-card--premium' : 'svc-card';
        const claseBoton = plan.highlight ? 'btn btn--cta svc-card__btn' : 'btn btn--primary svc-card__btn';
        const iconoEspecial = plan.highlight ? '<i class="bi bi-lightning-charge-fill"></i>' : '<i class="bi bi-send"></i>';

        // Traemos las features dinámicas desde tu objeto seguro de JavaScript
        const featuresTraducidas = [
          elementosATraducir[idioma][`${plan.keyPrefix}.f1`],
          elementosATraducir[idioma][`${plan.keyPrefix}.f2`],
          elementosATraducir[idioma][`${plan.keyPrefix}.f3`],
          elementosATraducir[idioma][`${plan.keyPrefix}.f4`]
        ];

        const featuresHTML = featuresTraducidas.map(feat => `
          <li><i class="bi bi-check2-circle"></i> ${feat}</li>
        `).join('');

        // Traemos título, descripción, copete (tag), pie de tarjeta y botón dinámicos[cite: 1]
        const tagTraducido = elementosATraducir[idioma][`${plan.keyPrefix}.tag`];
        const pieTraducido = elementosATraducir[idioma]["plan.global.integrated"];
        const tituloTraducido = elementosATraducir[idioma][`${plan.keyPrefix}.titulo`];
        const descTraducida = elementosATraducir[idioma][`${plan.keyPrefix}.desc`];
        const btnTraducido = elementosATraducir[idioma][`${plan.keyPrefix}.btn`];

        return `
          <article class="${claseCard}" id="${plan.id}">
            <div class="svc-card__top">
              <div class="svc-card__icon ${plan.iconModifier}">
                <i class="bi ${plan.iconClass}"></i>
              </div>
              <!-- COPETA TRADUCIDO -->
              <span class="svc-card__tag">${tagTraducido}</span>
            </div>
            <h3 class="svc-card__title">${tituloTraducido}</h3>
            <p class="svc-card__desc">${descTraducida}</p>
            <ul class="svc-card__features">
              ${featuresHTML}
            </ul>
            <div class="svc-card__footer">
              <span class="svc-card__format">
                <svg viewBox="0 0 22 18" width="14" height="12" style="margin-right: 2px; fill: currentColor; display: inline-block; vertical-align: middle;">
                  <rect x="0" y="4" width="4" height="10" rx="0.8"/>
                  <rect x="6" y="0" width="4" height="18" rx="0.8"/>
                  <rect x="12" y="5" width="4" height="8" rx="0.8"/>
                </svg>
                <!-- PIE DE TARJETA TRADUCIDO -->
                ${pieTraducido}
              </span>
              <a href="#contacto" class="${claseBoton}" data-plan="${plan.id}">
                ${iconoEspecial} ${btnTraducido}
              </a>
            </div>
          </article>
        `;
      }).join('');
    };

    window.dibujarTarjetasPlanes(idiomaActual);

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
      window.scrollTo(0, scrollY);
    }

    toggleBtn.addEventListener('click', () => {
      navLinks.classList.contains('open') ? closeMenu() : openMenu();
    });

    navLinks.querySelectorAll('.navbar__link, .navbar__cta').forEach(link => {
      link.addEventListener('click', closeMenu);
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

    window.dibujarTarjetasTestimonios = function (idioma) {
      track.innerHTML = testimoniosData.map(item => {
        let estrellasHTML = '';
        const enteras = Math.floor(item.estrellas);
        const tieneMitad = item.estrellas % 1 !== 0;

        for (let i = 0; i < enteras; i++) { estrellasHTML += '<i class="bi bi-star-fill"></i>'; }
        if (tieneMitad) { estrellasHTML += '<i class="bi bi-star-half"></i>'; }

        const claseCard = item.highlight ? 'testi-card testi-card--highlight' : 'testi-card';

        const disciplinaTraducida = elementosATraducir[idioma][`testi.${item.id}.disciplina`] || item.disciplina;
        const citaTraducida = elementosATraducir[idioma][`testi.${item.id}.cita`] || item.cita;
        const logroTraducido = elementosATraducir[idioma][`testi.${item.id}.logro`] || item.logro;

        return `
          <article class="${claseCard}">
            <div class="testi-card__top">
              <div class="testi-card__avatar">
                <img src="${item.avatar}" alt="${item.nombre}" loading="lazy" width="80" height="80" />
              </div>
              <div class="testi-card__meta">
                <strong>${item.nombre}</strong>
                <span><i class="bi bi-trophy"></i> ${disciplinaTraducida}</span>
              </div>
              <div class="testi-card__stars">
                ${estrellasHTML}
              </div>
            </div>
            <blockquote class="testi-card__quote">
              "${citaTraducida}"
            </blockquote>
            <div class="testi-card__logro">
              <i class="bi bi-patch-check-fill"></i>
              <span>${logroTraducido}</span>
            </div>
          </article>
        `;
      }).join('');

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

      const cardW = cards[0].getBoundingClientRect().width;
      const gap = 20;
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

    window.dibujarTarjetasTestimonios(idiomaActual);
    buildDots();
    updateCounter();
    updateButtons();
    startAuto();
  }

  /* ================================================
     INYECCIÓN DINÁMICA DE LA GALERÍA + LIGHTBOX
  ================================================ */
  /* ================================================
      INYECCIÓN DINÁMICA DE LA GALERÍA (TRADUCIBLE)
   ================================================ */
  const galeriaGrid = document.getElementById('galeriaGrid');
  if (galeriaGrid) {
    window.dibujarGaleria = function (idioma) {
      galeriaGrid.innerHTML = galeriaData.map(item => {
        const claseEspecial = item.clase ? ` ${item.clase}` : '';
        // Buscamos el texto dinámicamente en nuestro diccionario seguro
        const captionTraducido = elementosATraducir[idioma][`galeria.caption.${item.id}`];

        return `
          <figure class="galeria__item${claseEspecial}">
            <img src="${item.src}" alt="${item.alt}" loading="lazy" width="600" height="450" />
            <figcaption><i class="bi bi-camera-fill"></i> ${captionTraducido}</figcaption>
          </figure>
        `;
      }).join('');

      // Reactivación del Lightbox para las imágenes dinámicas
      galeriaGrid.querySelectorAll('.galeria__item img').forEach(img => {
        img.style.cursor = 'zoom-in';
        // Removemos oyentes viejos para evitar duplicación de clics
        img.replaceWith(img.cloneNode(true));
      });

      galeriaGrid.querySelectorAll('.galeria__item img').forEach(img => {
        img.addEventListener('click', (e) => {
          e.stopPropagation();
          const overlay = document.createElement('div');
          overlay.className = 'lightbox-overlay';

          const bigImg = document.createElement('img');
          bigImg.src = img.src.replace(/w=\d+/, 'w=1400').replace(/q=\d+/, 'q=90');
          bigImg.alt = img.alt;

          overlay.appendChild(bigImg);
          document.body.appendChild(overlay);
          document.body.style.overflow = 'hidden';

          overlay.addEventListener('click', closeLightbox);

          const handleKey = (e) => {
            if (e.key === 'Escape') { closeLightbox(); document.removeEventListener('keydown', handleKey); }
          };
          document.addEventListener('keydown', handleKey);

          function closeLightbox() {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.2s ease';
            setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 200);
          }
        });
      });
    };

    // Ejecución inicial de la galería en español
    window.dibujarGaleria(idiomaActual);
  }

  /* ================================================
     FORMULARIO: envío simulado funcional
  ================================================ */
  const form = document.getElementById('coachForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando...';
      btn.disabled = true;
      btn.style.background = '#444';
      setTimeout(() => {
        btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> ¡Mensaje enviado!';
        btn.style.background = '#2e7d32';
        form.reset();
        setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.disabled = false; }, 3500);
      }, 1400);
    });
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

});