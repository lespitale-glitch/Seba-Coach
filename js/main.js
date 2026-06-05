/* ===================================================
   main.js — Interactividad y Carga Dinámica
   Sebastián Zamperoni — SZ Tria Team
=================================================== */

// 1. Importaciones obligatorias desde el módulo de datos
import { testimoniosData, planesData, galeriaData } from './data.js';

/* ================================================
   INTRO SPLASH — se ejecuta antes de DOMContentLoaded
   para que el overlay ya esté pintado
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


document.addEventListener('DOMContentLoaded', () => {

  /* ================================================
     INYECCIÓN DINÁMICA DE PLANES PREMIUM
  ================================================ */
  const planesGrid = document.getElementById('planesGrid');
  
  if (planesGrid) {
    planesGrid.innerHTML = planesData.map(plan => {
      const claseCard = plan.highlight ? 'svc-card svc-card--premium' : 'svc-card';
      const badgePremium = plan.highlight ? `<div class="svc-card__premium-badge"><i class="bi bi-star-fill"></i> Más elegido</div>` : '';
      const claseBoton = plan.highlight ? 'btn btn--cta svc-card__btn' : 'btn btn--primary svc-card__btn';
      const iconoEspecial = plan.highlight ? '<i class="bi bi-lightning-charge-fill"></i>' : '<i class="bi bi-send"></i>';

      const featuresHTML = plan.features.map(feat => `
        <li><i class="bi bi-check2-circle"></i> ${feat}</li>
      `).join('');

      return `
        <article class="${claseCard}" id="${plan.id}">
          ${badgePremium}
          <div class="svc-card__top">
            <div class="svc-card__icon ${plan.iconModifier}">
              <i class="${plan.iconClass}"></i>
            </div>
            <span class="svc-card__tag">${plan.tag}</span>
          </div>
          <h3 class="svc-card__title">${plan.titulo}</h3>
          <p class="svc-card__desc">${plan.desc}</p>
          <ul class="svc-card__features">
            ${featuresHTML}
          </ul>
          <div class="svc-card__footer">
            <span class="svc-card__format">
              <i class="bi bi-file-earmark-arrow-down"></i> Plan PDF + TrainingPeaks
            </span>
            <a href="#contacto" class="${claseBoton}">
              ${iconoEspecial} ${plan.btnText}
            </a>
          </div>
        </article>
      `;
    }).join('');
  }
  
  /* ================================================
     INTRO: secuencia de animación
  ================================================ */
  const intro     = document.getElementById('sz-intro');
  const introSVG  = intro ? intro.querySelectorAll('text') : [];
  const introLabel = intro ? intro.querySelector('.sz-intro__label') : null;
  const introWipe  = intro ? intro.querySelector('.sz-intro__wipe') : null;

  if (intro) {
    const introImg = intro.querySelector('.sz-intro__svg');

    setTimeout(() => {
      if (introImg) introImg.style.opacity = '1';
    }, 120);

    setTimeout(() => {
      if (introLabel) introLabel.style.opacity = '1';
    }, 480);

    setTimeout(() => {
      intro.classList.add('sz-intro--glow');
    }, 750);

    setTimeout(() => {
      intro.classList.add('sz-intro--exit');
    }, 1380);

    setTimeout(() => {
      intro.remove();
      document.body.classList.add('intro-done');
    }, 2120);
  }


  /* ================================================
     NAVBAR: efecto al hacer scroll
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
     NAVBAR: menú hamburguesa
  ================================================ */
  const toggleBtn = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (toggleBtn && navLinks) {
    function openMenu() {
      navLinks.classList.add('open');
      toggleBtn.innerHTML = '<i class="bi bi-x-lg"></i>';
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top      = `-${scrollY}px`;
      document.body.style.width    = '100%';
      document.body.dataset.scrollY = scrollY;
    }

    function closeMenu() {
      navLinks.classList.remove('open');
      toggleBtn.innerHTML = '<i class="bi bi-list"></i>';
      const scrollY = parseInt(document.body.dataset.scrollY || '0');
      document.body.style.position = '';
      document.body.style.top      = '';
      document.body.style.width    = '';
      window.scrollTo(0, scrollY);
    }

    toggleBtn.addEventListener('click', () => {
      navLinks.classList.contains('open') ? closeMenu() : openMenu();
    });

    navLinks.querySelectorAll('.navbar__link, .navbar__cta').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) closeMenu();
    });
  }


  /* ================================================
     NAVBAR: link activo según sección
  ================================================ */
  const navItems = document.querySelectorAll('.navbar__link');
  const sections = document.querySelectorAll('section[id], header[id]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));


  /* ================================================
     CARRUSEL DE TESTIMONIOS (Dinámico e Interactivo)
  ================================================ */
  const carousel = document.querySelector('.testi-carousel');
  const track    = document.getElementById('testiTrack');
  const dotsWrap = document.querySelector('.testi-dots');
  const btnPrev  = document.querySelector('.testi-btn--prev');
  const btnNext  = document.querySelector('.testi-btn--next');
  const counter  = document.querySelector('.testi-counter');

  if (carousel && track) {
    
    track.innerHTML = testimoniosData.map(item => {
      let estrellasHTML = '';
      const enteras = Math.floor(item.estrellas);
      const tieneMitad = item.estrellas % 1 !== 0;

      for (let i = 0; i < enteras; i++) {
        estrellasHTML += '<i class="bi bi-star-fill"></i>';
      }
      if (tieneMitad) {
        estrellasHTML += '<i class="bi bi-star-half"></i>';
      }

      const claseCard = item.highlight ? 'testi-card testi-card--highlight' : 'testi-card';

      return `
        <article class="${claseCard}">
          <div class="testi-card__top">
            <div class="testi-card__avatar">
              <img src="${item.avatar}" alt="${item.nombre}" loading="lazy" width="80" height="80" />
            </div>
            <div class="testi-card__meta">
              <strong>${item.nombre}</strong>
              <span><i class="bi bi-trophy"></i> ${item.disciplina}</span>
            </div>
            <div class="testi-card__stars">
              ${estrellasHTML}
            </div>
          </div>
          <blockquote class="testi-card__quote">
            "${item.cita}"
          </blockquote>
          <div class="testi-card__logro">
            <i class="bi bi-patch-check-fill"></i>
            <span>${item.logro}</span>
          </div>
        </article>
      `;
    }).join('');

    const cards = track.querySelectorAll('.testi-card');
    let current     = 0;
    let autoTimer   = null;
    let isAnimating = false;
    let touchStartX = 0;

    function getVisible() {
      if (window.innerWidth >= 1024) return 2;
      return 1;
    }

    function totalSlides() {
      return cards.length - getVisible() + 1;
    }

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
      dotsWrap.querySelectorAll('.testi-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
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
      if (isAnimating || !cards.length) return;
      isAnimating = true;

      const total = totalSlides();
      current = Math.max(0, Math.min(index, total - 1));

      const cardW = cards[0].getBoundingClientRect().width;
      const gap   = 20; 
      const shift = current * (cardW + gap);
      track.style.transform = `translateX(-${shift}px)`;

      updateDots();
      updateCounter();
      updateButtons();
      updateActiveCards();

      setTimeout(() => { isAnimating = false; }, 500);
    }

    function updateActiveCards() {
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

    function stopAuto() {
      if (autoTimer) clearInterval(autoTimer);
    }

    if (btnPrev) btnPrev.addEventListener('click', () => { prev(); stopAuto(); startAuto(); });
    if (btnNext) btnNext.addEventListener('click', () => { next(); stopAuto(); startAuto(); });

    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? next() : prev();
        stopAuto(); startAuto();
      }
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildDots();
        current = Math.min(current, totalSlides() - 1);
        goTo(current);
      }, 200);
    });

    buildDots();
    updateCounter();
    updateButtons();
    updateActiveCards();
    startAuto();
  }


  /* ================================================
     INYECCIÓN DINÁMICA DE LA GALERÍA + LIGHTBOX
  ================================================ */
  const galeriaGrid = document.getElementById('galeriaGrid');

  if (galeriaGrid) {
    galeriaGrid.innerHTML = galeriaData.map(item => {
      const claseEspecial = item.clase ? ` ${item.clase}` : '';

      return `
        <figure class="galeria__item${claseEspecial}">
          <img 
            src="${item.src}" 
            alt="${item.alt}" 
            loading="lazy" 
            width="600" 
            height="450" 
          />
          <figcaption>
            <i class="bi bi-camera-fill"></i> ${item.caption}
          </figcaption>
        </figure>
      `;
    }).join('');

    // Activación del Lightbox integrado para elementos dinámicos
    galeriaGrid.querySelectorAll('.galeria__item img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', (e) => {
        e.stopPropagation();

        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';

        const bigImg = document.createElement('img');
        bigImg.src = img.src.replace(/w=\d+/, 'w=1400').replace(/q=\d+/, 'q=90');
        bigImg.alt = img.alt;
        bigImg.style.cursor = 'default';

        overlay.appendChild(bigImg);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        overlay.addEventListener('click', closeLightbox);
        const handleKey = (e) => {
          if (e.key === 'Escape') { closeLightbox(); document.removeEventListener('keydown', handleKey); }
        };
        document.addEventListener('keydown', handleKey);

        function closeLightbox() {
          overlay.style.opacity    = '0';
          overlay.style.transition = 'opacity 0.2s ease';
          setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 200);
        }
      });
    });
  }


  /* ================================================
     FORMULARIO: envío simulado
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
     SCROLL REVEAL — animaciones de entrada
  ================================================ */
  const revealEls = document.querySelectorAll(
    '.svc-card, .galeria__item, .contacto__info, .contacto__form-wrap, .sobre__visual, .sobre__content, .tp-box, .testi-card'
  );

  revealEls.forEach(el => {
    el.style.opacity   = '0';
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
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay * 1000);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => revealObserver.observe(el));

});

