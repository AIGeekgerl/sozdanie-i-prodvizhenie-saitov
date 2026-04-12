document.addEventListener('DOMContentLoaded', () => {

    /* ---- Preloader — только при прямой загрузке (не кнопка «Назад») ---- */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Определяем, это переход «назад/вперёд» или прямая загрузка
        const navEntry = performance.getEntriesByType?.('navigation')?.[0];
        const isBackForward = navEntry?.type === 'back_forward'
            || (performance.navigation && performance.navigation.type === 2);

        if (isBackForward) {
            // При нажатии «Назад» — мгновенно скрыть
            preloader.classList.add('hidden');
        } else {
            const inner = preloader.querySelector('.preloader-inner');
            // Sequence: video visible → text flies in (delay 0.5s, takes 0.9s)
            // → text on screen ~0.5s → fly out at 1.9s → preloader hides at 2.4s
            setTimeout(() => {
                if (inner) inner.classList.add('fly-out');
            }, 1900);
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 2400);
        }
    }

    /* ---- AOS — драматичные анимации ---- */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 900,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            once: true,
            offset: 80,
        });
    }

    /* ---- Sticky Header ---- */
    const header = document.querySelector('.header');
    if (header) {
        const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ---- Callback Modal ---- */
    const callbackModal = document.getElementById('callbackModal');
    document.querySelectorAll('.js-callback-open').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            callbackModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    document.querySelectorAll('.js-callback-close').forEach(btn => {
        btn.addEventListener('click', () => {
            callbackModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    if (callbackModal) {
        callbackModal.addEventListener('click', e => {
            if (e.target === callbackModal) {
                callbackModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    /* ---- Menu Modal (мобильный) ---- */
    const menuModal = document.getElementById('menuModal');
    document.querySelectorAll('.js-menu-open').forEach(btn => {
        btn.addEventListener('click', () => {
            menuModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    document.querySelectorAll('.js-menu-close').forEach(btn => {
        btn.addEventListener('click', () => {
            menuModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    if (menuModal) {
        menuModal.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuModal.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    /* ---- Services submenu toggle in mobile menu ---- */
    const servicesToggle = document.getElementById('servicesToggle');
    const servicesSubmenu = document.getElementById('servicesSubmenu');
    if (servicesToggle && servicesSubmenu) {
        servicesToggle.addEventListener('click', () => {
            servicesSubmenu.classList.toggle('open');
            servicesToggle.classList.toggle('open');
        });
    }

    /* ---- ESC закрывает модалки ---- */
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            [callbackModal, menuModal].forEach(m => {
                if (m) m.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });

    /* ---- Clients Slider — дублируем для бесконечной прокрутки ---- */
    const track = document.querySelector('.clients-track');
    if (track) track.innerHTML += track.innerHTML;

    /* ---- Scroll to Top ---- */
    const scrollUp = document.getElementById('scrollUp');
    if (scrollUp) {
        window.addEventListener('scroll', () => {
            scrollUp.classList.toggle('visible', window.scrollY > 500);
        }, { passive: true });
        scrollUp.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---- Hero scroll ---- */
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', e => {
            e.preventDefault();
            const t = document.getElementById('section-cases');
            if (t) t.scrollIntoView({ behavior: 'smooth' });
        });
    }

    /* ---- Form submit ---- */
    const form = document.getElementById('callbackForm');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('[type="submit"]');
            btn.textContent = 'Отправляем…';
            btn.disabled = true;
            setTimeout(() => {
                form.innerHTML = `<div style="text-align:center;padding:48px 0;">
                    <div style="font-size:3.5rem;margin-bottom:16px;color:#AACC00;">✓</div>
                    <h3 style="color:#fff;font-size:1.5rem;margin-bottom:10px;">Заявка отправлена!</h3>
                    <p style="color:rgba(255,255,255,0.55);">Мы свяжемся с вами в течение 30 минут.</p>
                </div>`;
            }, 1200);
        });
    }

    /* ---- Cookie ---- */
    const cookie = document.getElementById('cookieNotice');
    if (cookie) {
        const stored = localStorage.getItem('cookie-accepted');
        if (!stored || (+stored + 31536000000) < Date.now()) cookie.classList.remove('hidden');
        cookie.querySelector('.cookie-btn')?.addEventListener('click', () => {
            localStorage.setItem('cookie-accepted', Date.now());
            cookie.classList.add('hidden');
        });
    }

});
