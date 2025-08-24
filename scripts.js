// --- Скрипт для мобильного меню-бургера ---
const burgerMenu = document.getElementById('burger-menu');
const navLinks = document.getElementById('nav-links');
const navLinkItems = document.querySelectorAll('#nav-links a');

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burgerMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Закрываем меню при клике на ссылку
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            burgerMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});

// --- Скрипт для анимации появления элементов при прокрутке ---
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});
