/* ============================================================
   Letter fall animation — буквы падают сверху по одной
   и встают на место
   Применяется к элементам с классом .js-letter-anim
   Слова оборачиваются в .letter-word (white-space: nowrap)
   чтобы перенос шёл только по границе слова.
   ============================================================ */
(function () {
    'use strict';

    function initLetterAnim(el) {
        const text = el.textContent.trim();
        el.innerHTML = '';
        el.setAttribute('aria-label', text);

        const words = text.split(' ');
        let charIndex = 0;

        words.forEach((word, wordIdx) => {
            // Обёртка слова — запрещает перенос внутри слова
            const wordWrap = document.createElement('span');
            wordWrap.className = 'letter-word';

            [...word].forEach((char) => {
                const span = document.createElement('span');
                span.className = 'letter-char';
                span.textContent = char;

                const lx  = (Math.random() * 60 - 30).toFixed(1);
                const ly  = -(300 + Math.random() * 260).toFixed(1);
                const rot = (Math.random() * 50 - 25).toFixed(1);

                span.style.setProperty('--lx', `${lx}px`);
                span.style.setProperty('--ly', `${ly}px`);
                span.style.setProperty('--lr', `${rot}deg`);
                span.style.animationDelay = `${80 + charIndex * 75}ms`;
                charIndex++;

                wordWrap.appendChild(span);
            });

            el.appendChild(wordWrap);

            // Пробел между словами (кроме последнего)
            if (wordIdx < words.length - 1) {
                const space = document.createElement('span');
                space.className = 'letter-space';
                space.textContent = '\u00A0';
                el.appendChild(space);
                charIndex++;
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.js-letter-anim').forEach(initLetterAnim);
    });
}());
