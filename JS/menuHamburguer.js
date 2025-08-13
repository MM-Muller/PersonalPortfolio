document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.menu-toggle');
    const nav = document.getElementById('site-nav');

    if (!toggleButton || !nav) return;

    const closeOnLinkClick = (event) => {
        if (event.target.tagName.toLowerCase() === 'a') {
            nav.classList.remove('open');
            toggleButton.setAttribute('aria-expanded', 'false');
        }
    };

    toggleButton.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        toggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.addEventListener('click', closeOnLinkClick);

    // Close when clicking outside nav and toggle button
    document.addEventListener('click', (event) => {
        const clickedInsideNav = nav.contains(event.target);
        const clickedToggle = toggleButton.contains(event.target);
        if (!clickedInsideNav && !clickedToggle && nav.classList.contains('open')) {
            nav.classList.remove('open');
            toggleButton.setAttribute('aria-expanded', 'false');
        }
    });

    const handleResize = () => {
        if (window.innerWidth > 995) {
            nav.classList.remove('open');
            toggleButton.setAttribute('aria-expanded', 'false');
        }
    };

    window.addEventListener('resize', handleResize);
});


