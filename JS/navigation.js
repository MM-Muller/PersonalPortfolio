function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.button-container .button');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });

        button.addEventListener('click', function () {
            this.style.transform = 'translateY(0) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px) scale(1.1)';
            }, 150);
        });
    });
});
