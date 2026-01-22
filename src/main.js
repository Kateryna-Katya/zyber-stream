/**
 * ZYBER-STREAM.BLOG — Final Global Script v3.0
 * Технологичный блог об ИИ (Франция / 2026)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК (Lucide)
    // ==========================================
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ==========================================
    // 2. HEADER: СКРОЛЛ-ЭФФЕКТ
    // ==========================================
    const header = document.querySelector('.header');
    const handleScroll = () => {
        if (!header) return;
        window.scrollY > 50 
            ? header.classList.add('header--scrolled') 
            : header.classList.remove('header--scrolled');
    };
    window.addEventListener('scroll', handleScroll);

    // ==========================================
    // 3. НАВИГАЦИЯ: МОБИЛЬНОЕ МЕНЮ И ПЛАВНЫЙ СКРОЛЛ
    // ==========================================
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');

    const toggleMenu = () => {
        if (burger) burger.classList.toggle('burger--active');
        if (mobileMenu) mobileMenu.classList.toggle('mobile-menu--active');
        document.body.classList.toggle('no-scroll');
    };

    if (burger) burger.addEventListener('click', toggleMenu);

    // Обработка всех ссылок с якорями
    document.querySelectorAll('a[href*="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const url = new URL(this.href, window.location.origin);
            
            // Если мы на той же странице
            if (url.pathname === window.location.pathname || url.pathname === '/' && window.location.pathname === '/index.html') {
                const target = document.querySelector(url.hash);
                if (target) {
                    e.preventDefault();
                    if (mobileMenu && mobileMenu.classList.contains('mobile-menu--active')) toggleMenu();
                    
                    const headerHeight = 80;
                    window.scrollTo({
                        top: target.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==========================================
    // 4. ANIMATION: ПОЯВЛЕНИЕ (Intersection Observer)
    // ==========================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => revealObserver.observe(el));

    // ==========================================
    // 5. PRACTICES: SPOTLIGHT (Mesh Grid)
    // ==========================================
    const meshSection = document.getElementById('practices');
    const spotlight = document.getElementById('mesh-spotlight');

    if (meshSection && spotlight) {
        meshSection.addEventListener('mousemove', (e) => {
            const rect = meshSection.getBoundingClientRect();
            spotlight.style.left = `${e.clientX - rect.left}px`;
            spotlight.style.top = `${e.clientY - rect.top}px`;
            spotlight.style.opacity = '1';
        });
        meshSection.addEventListener('mouseleave', () => spotlight.style.opacity = '0');
    }

    // ==========================================
    // 6. BENEFITS: BENTO TILT EFFECT
    // ==========================================
    const bentoLarge = document.querySelector('.bento-card--large');
    if (bentoLarge) {
        bentoLarge.addEventListener('mousemove', (e) => {
            const rect = bentoLarge.getBoundingClientRect();
            const x = (e.clientX - rect.left) - (rect.width / 2);
            const y = (e.clientY - rect.top) - (rect.height / 2);
            
            bentoLarge.style.transform = `perspective(1000px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg) translateY(-5px)`;
        });
        bentoLarge.addEventListener('mouseleave', () => {
            bentoLarge.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    }

    // ==========================================
    // 7. INNOVATIONS: PATH PROGRESS
    // ==========================================
    const progressLine = document.querySelector('.innovation-path__progress');
    const pathSteps = document.querySelectorAll('.path-step');

    const updatePath = () => {
        const pathSection = document.querySelector('.innovation-path');
        if (!pathSection || !progressLine) return;

        const rect = pathSection.getBoundingClientRect();
        const scrollOffset = window.innerHeight / 1.5;
        let progress = ((scrollOffset - rect.top) / pathSection.offsetHeight) * 100;
        
        progressLine.style.height = `${Math.max(0, Math.min(100, progress))}%`;

        pathSteps.forEach(step => {
            step.getBoundingClientRect().top < scrollOffset 
                ? step.classList.add('is-active') 
                : step.classList.remove('is-active');
        });
    };
    window.addEventListener('scroll', updatePath);

    // ==========================================
    // 8. FORM & CAPTCHA: ИСПРАВЛЕННАЯ ЛОГИКА
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const captchaLabel = document.getElementById('captcha-question');
    const captchaInput = document.getElementById('user-captcha');
    const successBox = document.getElementById('success-message');
    const phoneInput = document.getElementById('user-phone');
    
    let correctResult = 0;

    const initCaptcha = () => {
        if (!captchaLabel) return;
        const n1 = Math.floor(Math.random() * 9) + 1;
        const n2 = Math.floor(Math.random() * 9) + 1;
        correctResult = n1 + n2;
        captchaLabel.innerText = `${n1} + ${n2} = ?`;
        if (captchaInput) captchaInput.value = '';
    };

    initCaptcha();

    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const userAns = parseInt(captchaInput.value, 10);

            if (userAns !== correctResult) {
                alert('Неверный ответ капчи! Попробуйте снова.');
                initCaptcha();
                return;
            }

            const btn = contactForm.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.innerText = 'Отправка...';

            setTimeout(() => {
                contactForm.style.display = 'none';
                if (successBox) successBox.style.display = 'flex';
                btn.disabled = false;
                btn.innerText = 'Отправить запрос';
            }, 1500);
        });
    }

    // ==========================================
    // 9. COOKIE POPUP
    // ==========================================
    const cookiePopup = document.getElementById('cookie-popup');
    if (cookiePopup && !localStorage.getItem('zyber_cookies_accepted')) {
        setTimeout(() => cookiePopup.classList.add('cookie-popup--active'), 3000);
        document.getElementById('cookie-accept')?.addEventListener('click', () => {
            localStorage.setItem('zyber_cookies_accepted', 'true');
            cookiePopup.classList.remove('cookie-popup--active');
        });
    }

    // Первичный запуск
    handleScroll();
    updatePath();
});