/* ---- Portfolio filter tabs ---- */
document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelectorAll('.filter-btn');
    const cards   = document.querySelectorAll('.pf-card');

    if (!filters.length || !cards.length) return;

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active class
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            cards.forEach(card => {
                const categories = card.dataset.category || '';
                const show = filter === 'all' || categories.split(' ').includes(filter);
                card.classList.toggle('hidden', !show);
            });
        });
    });
});
