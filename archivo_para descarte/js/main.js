/* ===================================================
   main.js — Interactividad
   Sebastián Zamperoni — SZ Tria Team
=================================================== */

/* ================================================
   INTRO SPLASH — se ejecuta antes de DOMContentLoaded
   para que el overlay ya esté pintado
================================================ */
(function () {
  const splash = document.createElement('div');
  splash.id = 'sz-intro';
  // SVG inline — transparente, glow limpio solo sobre las letras
  splash.innerHTML = `
    <div class="sz-intro__logo">
      <svg class="sz-intro__svg" viewBox="0 0 118 122" xmlns="http://www.w3.org/2000/svg" aria-label="SZ Tria Team">
        <text x="2" y="70"
              font-family="'Cormorant Garamond',Georgia,serif"
              font-size="73" font-weight="700" font-style="italic"
              fill="#FF44E4">S</text>
        <text x="16" y="106"
              font-family="'Cormorant Garamond',Georgia,serif"
              font-size="100" font-weight="700" font-style="italic"
              fill="#FF44E4">Z</text>
      </svg>
      <span class="sz-intro__label">SZ TRIA TEAM</span>
    </div>
    <div class="sz-intro__wipe"></div>
  `;
  document.documentElement.appendChild(splash);
})();


document.addEventListener('DOMContentLoaded', () => {

  /* ================================================
     INTRO: secuencia de animación
  ================================================ */
  const intro     = document.getElementById('sz-intro');
  const introSVG  = intro ? intro.querySelectorAll('text') : [];
  const introLabel = intro ? intro.querySelector('.sz-intro__label') : null;
  const introWipe  = intro ? intro.querySelector('.sz-intro__wipe') : null;

  if (intro) {
    const introImg = intro.querySelector('.sz-intro__svg');

    // Paso 1: imagen aparece con fade-in suave
    setTimeout(() => {
      if (introImg)   introImg.style.opacity   = '1';
    }, 120);

    // Paso 2: label aparece
    setTimeout(() => {
      if (introLabel) introLabel.style.opacity = '1';
    }, 480);

    // Paso 3: glow pulsante sobre la imagen
    setTimeout(() => {
      intro.classList.add('sz-intro--glow');
    }, 750);

    // Paso 4: wipe de salida
    setTimeout(() => {
      intro.classList.add('sz-intro--exit');
    }, 1380);

    // Paso 5: remover del DOM
    setTimeout(() => {
      intro.remove();
      document.body.classList.add('intro-done');
    }, 2120);
  }


  /* ================================================
     NAVBAR: efecto al hacer scroll
  ================================================ */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
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
     CARRUSEL DE TESTIMONIOS
  ================================================ */
  const carousel   = document.querySelector('.testi-carousel');
  const track      = document.querySelector('.testi-track');
  const cards      = document.querySelectorAll('.testi-card');
  const dotsWrap   = document.querySelector('.testi-dots');
  const btnPrev    = document.querySelector('.testi-btn--prev');
  const btnNext    = document.querySelector('.testi-btn--next');
  const counter    = document.querySelector('.testi-counter');

  if (carousel && track && cards.length) {

    let current      = 0;
    let autoTimer    = null;
    let isAnimating  = false;
    let touchStartX  = 0;

    // Calcular cuántas cards se ven según el ancho
    function getVisible() {
      if (window.innerWidth >= 1024) return 2;
      return 1;
    }

    function totalSlides() {
      return cards.length - getVisible() + 1;
    }

    // Crear dots dinámicamente
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
      if (isAnimating) return;
      isAnimating = true;

      const total = totalSlides();
      current = Math.max(0, Math.min(index, total - 1));

      // Calcular el desplazamiento por card
      const cardW = cards[0].getBoundingClientRect().width;
      const gap   = 20; // gap en px definido en CSS
      const shift = current * (cardW + gap);
      track.style.transform = `translateX(-${shift}px)`;

      updateDots();
      updateCounter();
      updateButtons();
      updateActiveCards();

      setTimeout(() => { isAnimating = false; }, 500);
    }

    // Marca como activas las cards visibles en el slide actual
    function updateActiveCards() {
      const visible = getVisible();
      cards.forEach((card, i) => {
        const isActive = i >= current && i < current + visible;
        card.classList.toggle('testi-card--active', isActive);
      });
      // Agregar clase al carousel para atenuar las no activas
      carousel.classList.add('has-active');
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    // Auto-play
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

    // Eventos de flechas
    if (btnPrev) btnPrev.addEventListener('click', () => { prev(); stopAuto(); startAuto(); });
    if (btnNext) btnNext.addEventListener('click', () => { next(); stopAuto(); startAuto(); });

    // Pausa al hover
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);

    // Swipe touch (mobile)
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

    // Reconstruir en resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildDots();
        // Clamp current al nuevo total
        current = Math.min(current, totalSlides() - 1);
        goTo(current);
      }, 200);
    });

    // Init
    buildDots();
    updateCounter();
    updateButtons();
    updateActiveCards();
    startAuto();
  }


  /* ================================================
     GALERÍA: Lightbox
  ================================================ */
  document.querySelectorAll('.galeria__item img').forEach(img => {
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
