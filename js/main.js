/* ===================================================
   main.js — Interactividad
   Coach Sebastián Zamperoni
=================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ================================================
     NAVBAR: efecto al hacer scroll
  ================================================ */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });


  /* ================================================
     NAVBAR: menú hamburguesa (móvil)
  ================================================ */
  const toggleBtn = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (toggleBtn && navLinks) {

    function openMenu() {
      navLinks.classList.add('open');
      toggleBtn.innerHTML = '<i class="bi bi-x-lg"></i>';
      // Bloquear scroll del body y fijar posición para que no salte
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.dataset.scrollY = scrollY;
    }

    function closeMenu() {
      navLinks.classList.remove('open');
      toggleBtn.innerHTML = '<i class="bi bi-list"></i>';
      // Restaurar scroll exactamente donde estaba
      const scrollY = parseInt(document.body.dataset.scrollY || '0');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    }

    toggleBtn.addEventListener('click', () => {
      navLinks.classList.contains('open') ? closeMenu() : openMenu();
    });

    // Cerrar al hacer click en un link
    navLinks.querySelectorAll('.navbar__link, .navbar__cta').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) closeMenu();
    });
  }


  /* ================================================
     NAVBAR: link activo según sección visible
  ================================================ */
  const navItems   = document.querySelectorAll('.navbar__link');
  const sections   = document.querySelectorAll('section[id], header[id]');

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
     GALERÍA: Lightbox al hacer click en imagen
  ================================================ */
  document.querySelectorAll('.galeria__item img').forEach(img => {
    img.style.cursor = 'zoom-in';

    img.addEventListener('click', (e) => {
      e.stopPropagation();

      // Crear overlay
      const overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';

      const bigImg = document.createElement('img');
      // Pedir imagen más grande a Unsplash
      bigImg.src = img.src.replace(/w=\d+/, 'w=1400').replace(/q=\d+/, 'q=90');
      bigImg.alt = img.alt;
      bigImg.style.cursor = 'default';

      overlay.appendChild(bigImg);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      // Click en overlay (no en la imagen) → cerrar
      overlay.addEventListener('click', closeLightbox);

      // Tecla Escape → cerrar
      const handleKey = (e) => {
        if (e.key === 'Escape') {
          closeLightbox();
          document.removeEventListener('keydown', handleKey);
        }
      };
      document.addEventListener('keydown', handleKey);

      function closeLightbox() {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.2s ease';
        setTimeout(() => {
          overlay.remove();
          document.body.style.overflow = '';
        }, 200);
      }
    });
  });


  /* ================================================
     FORMULARIO: envío simulado con feedback visual
  ================================================ */
  const form = document.getElementById('coachForm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('[type="submit"]');
      const originalContent = submitBtn.innerHTML;

      // Estado de carga
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando...';
      submitBtn.disabled = true;
      submitBtn.style.background = '#444';

      // Simular respuesta del servidor
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="bi bi-check-circle-fill"></i> ¡Mensaje enviado!';
        submitBtn.style.background = '#2e7d32';

        // Resetear formulario
        form.reset();

        // Restaurar botón después de 3.5s
        setTimeout(() => {
          submitBtn.innerHTML = originalContent;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3500);
      }, 1400);
    });
  }


  /* ================================================
     ANIMACIONES DE ENTRADA (scroll reveal)
  ================================================ */
  const revealEls = document.querySelectorAll(
    '.svc-card, .galeria__item, .contacto__info, .contacto__form-wrap'
  );

  // Estilo inicial invisible
  revealEls.forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(28px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Delay escalonado para las cards
        const delay = entry.target.closest('.cards-grid')
          ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.1
          : 0;

        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay * 1000);

        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

});
