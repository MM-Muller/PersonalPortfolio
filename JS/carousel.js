class SkillsCarousel {
    constructor(type) {
        this.type = type;
        this.track = document.getElementById(type + 'Track');
        this.container = this.track.parentElement;
        this.cards = Array.from(this.track.children);
        this.currentIndex = 0;
        this.cardsToShow = this.getCardsToShow();
        this.cardWidth = 140;
        this.gap = 20;

        this.maxIndex = Math.max(0, this.cards.length - this.cardsToShow);

        console.log(`${type} Carousel:`, {
            totalCards: this.cards.length,
            cardsToShow: this.cardsToShow,
            maxIndex: this.maxIndex,
            cardWidth: this.cardWidth,
            gap: this.gap
        });

        this.init();
    }

    init() {
        this.createIndicators();
        this.updateCarousel();
        this.startAutoPlay();
        this.bindEvents();
    }

    getCardsToShow() {
        const containerWidth = this.container.offsetWidth - 40;
        if (window.innerWidth <= 768) {
            return Math.min(2, this.cards.length);
        } else if (window.innerWidth <= 1024) {
            return Math.min(3, this.cards.length);
        } else {
            return Math.min(4, this.cards.length);
        }
    }

    createIndicators() {
        const indicatorsContainer = document.getElementById(this.type + 'Indicators');
        if (!indicatorsContainer) return;

        indicatorsContainer.innerHTML = '';

        if (this.cards.length <= this.cardsToShow) return;

        const totalPages = this.maxIndex + 1;
        for (let i = 0; i < totalPages; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator' + (i === this.currentIndex ? ' active' : '');
            indicator.addEventListener('click', () => {
                this.goToSlide(i);
            });
            indicatorsContainer.appendChild(indicator);
        }
    }

    updateCarousel() {
        if (!this.track || this.cards.length === 0) return;

        this.updateResponsiveValues();

        const offset = -this.currentIndex * (this.cardWidth + this.gap);

        console.log(`${this.type} - Moving to index ${this.currentIndex}, offset: ${offset}px`);

        this.track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        this.track.style.transform = `translateX(${offset}px)`;
        this.updateIndicators();
    }

    updateResponsiveValues() {
        if (window.innerWidth <= 768) {
            this.cardWidth = 110;
            this.gap = 12;
        } else if (window.innerWidth <= 1024) {
            this.cardWidth = 120;
            this.gap = 15;
        } else {
            this.cardWidth = 140;
            this.gap = 20;
        }
    }

    updateIndicators() {
        const indicators = document.querySelectorAll(`#${this.type}Indicators .indicator`);
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }

    move(direction) {
        if (this.cards.length <= this.cardsToShow) return;
        const previousIndex = this.currentIndex;
        this.currentIndex += direction;

        if (this.currentIndex > this.maxIndex) {
            this.currentIndex = 0;
        } else if (this.currentIndex < 0) {
            this.currentIndex = this.maxIndex;
        }

        console.log(`${this.type} - Direction: ${direction}, Previous: ${previousIndex}, New: ${this.currentIndex}, Max: ${this.maxIndex}`);

        this.updateCarousel();
        this.resetAutoPlay();
    }

    goToSlide(index) {
        if (index >= 0 && index <= this.maxIndex) {
            this.currentIndex = index;
            this.updateCarousel();
            this.resetAutoPlay();
        }
    }

    startAutoPlay() {
        if (this.cards.length <= this.cardsToShow) return;

        this.autoPlayInterval = setInterval(() => {
            this.move(1);
        }, 4000);
    }

    resetAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
        this.startAutoPlay();
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            const newCardsToShow = this.getCardsToShow();
            if (newCardsToShow !== this.cardsToShow) {
                this.cardsToShow = newCardsToShow;
                this.maxIndex = Math.max(0, this.cards.length - this.cardsToShow);
                this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
                this.createIndicators();
            }
            this.updateCarousel();
        });

        if (this.container) {
            this.container.addEventListener('mouseenter', () => {
                this.stopAutoPlay();
            });

            this.container.addEventListener('mouseleave', () => {
                this.startAutoPlay();
            });
        }
    }
}

let hardSkillsCarousel, softSkillsCarousel;

function initializeCarousels() {
    console.log('Initializing carousels...');

    try {
        const hardSkillsTrack = document.getElementById('hardSkillsTrack');
        const softSkillsTrack = document.getElementById('softSkillsTrack');

        if (hardSkillsTrack && hardSkillsTrack.children.length > 0) {
            hardSkillsCarousel = new SkillsCarousel('hardSkills');
            console.log('Carousel initialized');
        } else {
            console.warn('Hard Skills track not found or empty');
        }

        if (softSkillsTrack && softSkillsTrack.children.length > 0) {
            softSkillsCarousel = new SkillsCarousel('softSkills');
            console.log('Carousel initialized');
        } else {
            console.warn('Soft Skills track not found or empty');
        }
    } catch (error) {
        console.error('Error initializing carousels:', error);
    }
}

function moveCarousel(type, direction) {
    console.log(`🔄 moveCarousel called: ${type}, direction: ${direction}`);

    try {
        if (type === 'hardSkills' && hardSkillsCarousel) {
            hardSkillsCarousel.move(direction);
        } else if (type === 'softSkills' && softSkillsCarousel) {
            softSkillsCarousel.move(direction);
        } else {
            console.error(`❌ Carousel ${type} not found or not initialized`);
        }
    } catch (error) {
        console.error('Error moving carousel:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 DOM Content Loaded');

    setTimeout(() => {
        initializeCarousels();
    }, 100);
});

window.moveCarousel = moveCarousel;