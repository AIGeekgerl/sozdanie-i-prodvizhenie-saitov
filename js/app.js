/* =========================================
   ТехноУспех — Main JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ---- Preloader ---- */
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => preloader.classList.add('hidden'), 400);
        });
        // Fallback: hide after 3s
        setTimeout(() => preloader && preloader.classList.add('hidden'), 3000);
    }

    /* ---- Sticky Header ---- */
    const header = document.querySelector('.header');
    if (header) {
        const onScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 60);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ---- Modal System ---- */
    // Callback modal
    const callbackOverlay = document.getElementById('callbackModal');
    const callbackTriggers = document.querySelectorAll('[data-modal="callback"]');
    const callbackClose = callbackOverlay ? callbackOverlay.querySelector('.modal-close') : null;

    callbackTriggers.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            openModal(callbackOverlay);
        });
    });
    if (callbackClose) callbackClose.addEventListener('click', () => closeModal(callbackOverlay));
    if (callbackOverlay) {
        callbackOverlay.addEventListener('click', e => {
            if (e.target === callbackOverlay) closeModal(callbackOverlay);
        });
    }

    // Menu modal
    const menuOverlay = document.getElementById('menuModal');
    const menuBtn = document.querySelector('.header-menu-btn');
    const menuCloseBtn = menuOverlay ? menuOverlay.querySelector('.menu-close') : null;

    if (menuBtn) menuBtn.addEventListener('click', () => openModal(menuOverlay));
    if (menuCloseBtn) menuCloseBtn.addEventListener('click', () => closeModal(menuOverlay));
    if (menuOverlay) {
        menuOverlay.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => closeModal(menuOverlay));
        });
    }

    // Escape key closes any modal
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeModal(callbackOverlay);
            closeModal(menuOverlay);
        }
    });

    function openModal(overlay) {
        if (!overlay) return;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeModal(overlay) {
        if (!overlay) return;
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    /* ---- Clients Slider (auto-duplicate for infinite loop) ---- */
    const track = document.querySelector('.clients-track');
    if (track) {
        const items = track.innerHTML;
        track.innerHTML = items + items; // duplicate for seamless loop
    }

    /* ---- Scroll to Top ---- */
    const scrollUp = document.querySelector('.scroll-up');
    if (scrollUp) {
        window.addEventListener('scroll', () => {
            scrollUp.classList.toggle('visible', window.scrollY > 500);
        }, { passive: true });
        scrollUp.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---- AOS Init ---- */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80,
        });
    }

    /* ---- Hero scroll indicator ---- */
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector('#section-cases');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    }

    /* ---- Contact Form ---- */
    const form = document.getElementById('callbackForm');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('[type="submit"]');
            const orig = btn.textContent;
            btn.textContent = 'Отправляем...';
            btn.disabled = true;
            // Simulate send
            setTimeout(() => {
                form.innerHTML = `
                    <div style="text-align:center;padding:40px 0;">
                        <div style="font-size:3rem;margin-bottom:16px;">✓</div>
                        <h3 style="color:#fff;margin-bottom:8px;">Заявка отправлена!</h3>
                        <p style="color:var(--text-muted);">Мы свяжемся с вами в течение 30 минут.</p>
                    </div>`;
            }, 1200);
        });
    }

    /* ---- Cookie Notice ---- */
    const cookie = document.getElementById('cookieNotice');
    if (cookie) {
        const stored = localStorage.getItem('cookie-accepted');
        if (!stored || (+stored + 31536000000) < Date.now()) {
            cookie.classList.remove('hidden');
        }
        const cookieBtn = cookie.querySelector('.cookie-btn');
        if (cookieBtn) {
            cookieBtn.addEventListener('click', () => {
                localStorage.setItem('cookie-accepted', Date.now());
                cookie.classList.add('hidden');
            });
        }
    }

    /* ---- Active nav link ---- */
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '/' && href === '/index.html') ||
            (href !== '/' && currentPath.includes(href))) {
            link.classList.add('active');
        }
    });

});
