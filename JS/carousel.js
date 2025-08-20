const skillsData = {
    hardSkills: [
        { id: 'python', name: 'Python', description: 'IA, Machine Learning, LLMs e automação<br>(Ensino Superior)' },
        { id: 'html5', name: 'HTML5', description: 'Estruturação semântica e acessível<br>(Ensino Superior)' },
        { id: 'css3', name: 'CSS3', description: 'Estilização avançada e responsiva<br>(Ensino Superior)' },
        { id: 'javascript', name: 'JavaScript', description: 'Programação dinâmica e interativa<br>(Ensino Superior)' },
        { id: 'react', name: 'React', description: 'Desenvolvimento de interfaces modernas<br>(Ensino Superior)' },
        { id: 'nodejs', name: 'Node.js', description: 'Desenvolvimento backend escalável<br>(Curso Online)' },
        { id: 'angular', name: 'Angular', description: 'Desenvolvimento de aplicações web robustas<br>(Curso Online)' },
        { id: 'php', name: 'PHP', description: 'Desenvolvimento web dinâmico<br>(Ensino Superior)' },
        { id: 'java', name: 'Java', description: 'Programação orientada a objetos<br>(Ensino Superior)' },
        { id: 'docker', name: 'Docker', description: 'Containerização e deploy eficiente<br>(Curso Online)' },
        { id: 'mongodb', name: 'MongoDB', description: 'Banco de dados NoSQL orientado a documentos<br>(Curso Online)' },
        { id: 'mysql', name: 'MySQL', description: 'Banco de dados relacional robusto<br>(Ensino Superior)' }
    ],
    softSkills: [
        { id: 'teamwork', name: 'Trabalho em Equipe', description: 'Colaboração eficaz e sinergia' },
        { id: 'critical-thinking', name: 'Pensamento Crítico', description: 'Análise e resolução de problemas' },
        { id: 'communication', name: 'Comunicação', description: 'Expressão clara e objetiva' },
        { id: 'proactivity', name: 'Proatividade', description: 'Iniciativa e antecipação' },
        { id: 'adaptability', name: 'Adaptabilidade', description: 'Flexibilidade e evolução' },
        { id: 'curiosity', name: 'Curiosidade', description: 'Busca constante por conhecimento' },
        { id: 'leadership', name: 'Liderança', description: 'Inspiração e orientação' },
        { id: 'time-management', name: 'Gestão de Tempo', description: 'Organização e produtividade' }
    ]
};

const carouselStates = {
    hardSkills: { currentIndex: 0 },
    softSkills: { currentIndex: 0 }
};

function createSkillCard(skill) {
    return `
        <div class="skill-card" data-skill="${skill.id}">
            <div class="skill-icon"></div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-description">${skill.description}</div>
        </div>
    `;
}

function initializeCarousel(type) {
    const track = document.getElementById(`${type}Track`);
    const skills = skillsData[type];

    track.innerHTML = skills.map(skill => createSkillCard(skill)).join('');

    updateCarousel(type);
}

function updateCarousel(type) {
    const track = document.getElementById(`${type}Track`);
    const cards = track.querySelectorAll('.skill-card');
    const currentIndex = carouselStates[type].currentIndex;
    const totalCards = cards.length;

    cards.forEach((card, index) => {
        card.className = 'skill-card';
        card.setAttribute('data-skill', skillsData[type][index].id);

        const position = (index - currentIndex + totalCards) % totalCards;

        if (position === 0) {
            card.classList.add('center');
        } else if (position === 1 || position === totalCards - 1) {
            card.classList.add(position === 1 ? 'right' : 'left');
        } else if (position === 2 || position === totalCards - 2) {
            card.classList.add(position === 2 ? 'far-right' : 'far-left');
        } else {
            card.classList.add('hidden');
        }
    });
}

function moveCarousel(type, direction) {
    const totalCards = skillsData[type].length;
    carouselStates[type].currentIndex =
        (carouselStates[type].currentIndex + direction + totalCards) % totalCards;
    updateCarousel(type);
}

function goToSlide(type, index) {
    carouselStates[type].currentIndex = index;
    updateCarousel(type);
}

function startAutoRotation() {
    setInterval(() => {
        moveCarousel('hardSkills', 1);
    }, 4000);

    setInterval(() => {
        moveCarousel('softSkills', 1);
    }, 4500);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel('hardSkills');
    initializeCarousel('softSkills');
    startAutoRotation();
});

let startX = 0;
let currentCarousel = null;

document.addEventListener('touchstart', (e) => {
    const carousel = e.target.closest('.carousel-container');
    if (carousel) {
        startX = e.touches[0].clientX;
        currentCarousel = carousel.querySelector('.carousel-track').id.replace('Track', '');
    }
});

document.addEventListener('touchend', (e) => {
    if (!currentCarousel) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
        moveCarousel(currentCarousel, diff > 0 ? 1 : -1);
    }

    currentCarousel = null;
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveCarousel('hardSkills', -1);
        moveCarousel('softSkills', -1);
    } else if (e.key === 'ArrowRight') {
        moveCarousel('hardSkills', 1);
        moveCarousel('softSkills', 1);
    }
});

document.querySelectorAll('.carousel-container').forEach(container => {
    let autoRotationPaused = false;

    container.addEventListener('mouseenter', () => {
        autoRotationPaused = true;
    });

    container.addEventListener('mouseleave', () => {
        autoRotationPaused = false;
    });
});