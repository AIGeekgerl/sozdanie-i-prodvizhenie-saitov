/* ============================================================
   Letter fall animation — буквы падают сверху по одной
   и встают на место
   Применяется к элементам с классом .js-letter-anim
   ============================================================ */
(function () {
    'use strict';

    function initLetterAnim(el) {
        const text = el.textContent.trim();
        el.innerHTML = '';
        el.setAttribute('aria-label', text);

        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.className = 'letter-char' + (char === ' ' ? ' letter-space' : '');
            span.textContent = char === ' ' ? '\u00A0' : char;

            // Fall from top: slight horizontal jitter, far above, small tilt
            const lx  = (Math.random() * 60 - 30).toFixed(1);
            const ly  = -(300 + Math.random() * 260).toFixed(1);
            const rot = (Math.random() * 50 - 25).toFixed(1);

            span.style.setProperty('--lx', `${lx}px`);
            span.style.setProperty('--ly', `${ly}px`);
            span.style.setProperty('--lr', `${rot}deg`);
            span.style.animationDelay = `${80 + i * 75}ms`;

            el.appendChild(span);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.js-letter-anim').forEach(initLetterAnim);
    });
}());
