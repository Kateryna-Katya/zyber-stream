/**
 * ZYBER-STREAM.BLOG - Full Interactive Script v1.0
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // 2. МОБИЛЬНОЕ МЕНЮ (BURGER)
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-menu__list a');

  const toggleMenu = () => {
      burger.classList.toggle('burger--active');
      mobileMenu.classList.toggle('mobile-menu--active');
      document.body.classList.toggle('no-scroll');
  };

  if (burger) burger.addEventListener('click', toggleMenu);
  navLinks.forEach(link => link.addEventListener('click', toggleMenu));

  // 3. COOKIE POPUP
  const cookiePopup = document.getElementById('cookie-popup');
  const cookieAccept = document.getElementById('cookie-accept');

  if (!localStorage.getItem('cookies-accepted')) {
      setTimeout(() => {
          cookiePopup.classList.add('cookie-popup--active');
      }, 2000);
  }

  cookieAccept.addEventListener('click', () => {
      localStorage.setItem('cookies-accepted', 'true');
      cookiePopup.classList.remove('cookie-popup--active');
  });

  // 4. ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ (FADE-IN)
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('appear');
      });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // 5. ДИНАМИЧЕСКИЙ ФОН (BENEFITS)
  const benefitCards = document.querySelectorAll('.benefit-card');
  const bgOverlay = document.querySelector('.benefits__bg-overlay');

  benefitCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
          if (bgOverlay) {
              bgOverlay.style.background = card.getAttribute('data-color');
              bgOverlay.style.opacity = '1';
          }
      });
      card.addEventListener('mouseleave', () => {
          if (bgOverlay) bgOverlay.style.opacity = '0';
      });
  });

  // 6. ЛИНИЯ ПРОГРЕССА (INNOVATIONS)
  const progressLine = document.querySelector('.innovation-path__progress');
  const pathSteps = document.querySelectorAll('.path-step');

  const updateProgress = () => {
      const pathSection = document.querySelector('.innovation-path');
      if (!pathSection || !progressLine) return;

      const sectionRect = pathSection.getBoundingClientRect();
      const scrollOffset = window.innerHeight / 1.5;
      let progress = ((scrollOffset - sectionRect.top) / pathSection.offsetHeight) * 100;

      progressLine.style.height = `${Math.max(0, Math.min(100, progress))}%`;

      pathSteps.forEach(step => {
          if (step.getBoundingClientRect().top < scrollOffset) {
              step.classList.add('is-active');
          } else {
              step.classList.remove('is-active');
          }
      });
  };

  // 7. КОНТАКТНАЯ ФОРМА (VALIDATION + AJAX + CAPTCHA)
  const contactForm = document.getElementById('contact-form');
  const phoneInput = document.getElementById('user-phone');
  const captchaText = document.getElementById('captcha-question');
  let captchaResult;

  const genCaptcha = () => {
      const a = Math.floor(Math.random() * 9) + 1;
      const b = Math.floor(Math.random() * 9) + 1;
      captchaResult = a + b;
      if (captchaText) captchaText.innerText = `${a} + ${b} = ?`;
  };
  genCaptcha();

  if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/[^0-9]/g, '');
      });
  }

  if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const userCaptcha = parseInt(document.getElementById('user-captcha').value);

          if (userCaptcha !== captchaResult) {
              alert('Ошибка капчи!');
              return genCaptcha();
          }

          const btn = document.getElementById('submit-btn');
          btn.classList.add('btn--loading'); // Добавьте стили для лоадера

          setTimeout(() => {
              contactForm.style.display = 'none';
              document.getElementById('success-message').style.display = 'flex';
          }, 1500);
      });
  }

  // 8. ПАРАЛЛАКС ГЕРОЯ И МОРФИНГ (SCROLL BASED)
  const heroVisual = document.querySelector('.hero__visual');
  const morphPath = document.querySelector('.morph-path');

  window.addEventListener('scroll', () => {
      updateProgress();

      // Морфинг при скролле
      if (morphPath) {
          const scrollVal = window.scrollY * 0.05;
          morphPath.style.transform = `rotate(${scrollVal}deg)`;
      }
  });

  // Параллакс мыши
  document.addEventListener('mousemove', (e) => {
      if (heroVisual) {
          const x = (window.innerWidth / 2 - e.pageX) / 40;
          const y = (window.innerHeight / 2 - e.pageY) / 40;
          heroVisual.style.transform = `translate(${x}px, ${y}px)`;
      }
  });
});