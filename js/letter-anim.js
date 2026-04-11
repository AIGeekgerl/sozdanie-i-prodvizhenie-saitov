/* ============================================================
   Letter fly-in animation — буквы вылетают с разных сторон
   и собираются в надпись
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

            // Random direction — angle in radians, distance 250–500px
            const angle = Math.random() * Math.PI * 2;
            const dist  = 260 + Math.random() * 260;
            const rot   = Math.random() * 140 - 70; // –70 … +70 deg

            span.style.setProperty('--lx', `${(Math.cos(angle) * dist).toFixed(1)}px`);
            span.style.setProperty('--ly', `${(Math.sin(angle) * dist).toFixed(1)}px`);
            span.style.setProperty('--lr', `${rot.toFixed(1)}deg`);
            span.style.animationDelay = `${200 + i * 85}ms`;

            el.appendChild(span);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.js-letter-anim').forEach(initLetterAnim);
    });
}());
