/**
 * ZYBER-STREAM.BLOG — Full Production Script v2.0
 * Пошаговая реализация всех интерактивных функций
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК (Lucide)
  // Используем встроенную функцию библиотеки, подключенной через CDN
  if (typeof lucide !== 'undefined') {
      lucide.createIcons();
  }

  // 2. HEADER: ИЗМЕНЕНИЕ ПРИ СКРОЛЛЕ
  // Добавляет класс при прокрутке более 50px для эффекта "закрепленной шапки"
  const header = document.querySelector('.header');
  const updateHeader = () => {
      if (header) {
          window.scrollY > 50
              ? header.classList.add('header--scrolled')
              : header.classList.remove('header--scrolled');
      }
  };
  window.addEventListener('scroll', updateHeader);

  // 3. НАВИГАЦИЯ: МОБИЛЬНОЕ МЕНЮ И ПЛАВНЫЙ СКРОЛЛ
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu'); // Если используется оверлей
  const nav = document.querySelector('.nav'); // Если используется переключение класса в шапке

  const toggleMenu = () => {
      if (burger) burger.classList.toggle('burger--active');
      if (mobileMenu) mobileMenu.classList.toggle('mobile-menu--active');
      if (nav) nav.classList.toggle('nav--active');
      document.body.classList.toggle('no-scroll');
  };

  if (burger) burger.addEventListener('click', toggleMenu);

  // Обработка кликов по ссылкам (якоря и переходы)
  document.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function(e) {
          const href = this.getAttribute('href');

          // Если ссылка — якорь на текущей странице
          if (href && href.startsWith('#') && href !== '#') {
              e.preventDefault();
              const target = document.querySelector(href);
              if (target) {
                  // Закрываем мобильное меню если оно открыто
                  if (nav && nav.classList.contains('nav--active')) toggleMenu();

                  const headerHeight = 80;
                  const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                  window.scrollTo({ top: targetPos, behavior: 'smooth' });
              }
          }
      });
  });

  // 4. ANIMATION: ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ (Intersection Observer)
  // Используем для всех элементов с классом .fade-in
  const revealOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
  const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('appear');
          }
      });
  }, revealOptions);

  document.querySelectorAll('.fade-in').forEach(el => revealObserver.observe(el));

  // 5. SECTION PRACTICES: МЕШ-СПОТЛАЙТ (Spotlight)
  const meshSection = document.getElementById('practices');
  const spotlight = document.getElementById('mesh-spotlight');

  if (meshSection && spotlight) {
      meshSection.addEventListener('mousemove', (e) => {
          const rect = meshSection.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          spotlight.style.left = `${x}px`;
          spotlight.style.top = `${y}px`;
          spotlight.style.opacity = '1';
      });

      meshSection.addEventListener('mouseleave', () => {
          spotlight.style.opacity = '0';
      });
  }

  // 6. SECTION BENEFITS: TILT ЭФФЕКТ (Bento Grid)
  const bentoLarge = document.querySelector('.bento-card--large');
  if (bentoLarge) {
      bentoLarge.addEventListener('mousemove', (e) => {
          const rect = bentoLarge.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;

          bentoLarge.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      });

      bentoLarge.addEventListener('mouseleave', () => {
          bentoLarge.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
      });
  }

  // 7. SECTION INNOVATIONS: ВЕРТИКАЛЬНЫЙ ПРОГРЕСС-БАР
  const progressLine = document.querySelector('.innovation-path__progress');
  const pathSteps = document.querySelectorAll('.path-step');

  const updatePath = () => {
      const pathSection = document.querySelector('.innovation-path');
      if (!pathSection || !progressLine) return;

      const rect = pathSection.getBoundingClientRect();
      const scrollPoint = window.innerHeight / 1.5;

      let progress = ((scrollPoint - rect.top) / pathSection.offsetHeight) * 100;
      progressLine.style.height = `${Math.max(0, Math.min(100, progress))}%`;

      pathSteps.forEach(step => {
          if (step.getBoundingClientRect().top < scrollPoint) {
              step.classList.add('is-active');
          } else {
              step.classList.remove('is-active');
          }
      });
  };
  window.addEventListener('scroll', updatePath);

  // 8. COOKIE POPUP
  const cookiePopup = document.getElementById('cookie-popup');
  const cookieBtn = document.getElementById('cookie-accept');

  if (cookiePopup && !localStorage.getItem('zyber_cookies_accepted')) {
      setTimeout(() => {
          cookiePopup.classList.add('cookie-popup--active');
      }, 3000);
  }

  if (cookieBtn) {
      cookieBtn.addEventListener('click', () => {
          localStorage.setItem('zyber_cookies_accepted', 'true');
          cookiePopup.classList.remove('cookie-popup--active');
      });
  }

  // 9. ВАЛИДАЦИЯ ТЕЛЕФОНА (ДЛЯ ФОРМ, ЕСЛИ ОНИ ЕСТЬ)
  const phoneFields = document.querySelectorAll('input[type="tel"]');
  phoneFields.forEach(field => {
      field.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/[^0-9]/g, '');
      });
  });

  // Первичный запуск функций скролла
  updateHeader();
  updatePath();
});