// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section-title, .about-image, .about-text, .experience-card, .course-card, .contact-info, .contact-form, .project-category, .skills-category');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (elementPosition < screenPosition) {
            element.style.animationPlayState = 'running';
        }
    });
};

// Initialize animations
window.addEventListener('load', () => {
    animateOnScroll();
});

window.addEventListener('scroll', () => {
    animateOnScroll();
});

// Language Switcher
const languageSwitcher = document.getElementById('languageSwitcher');
let currentLanguage = 'en';

languageSwitcher.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    updateLanguage();
});

function updateLanguage() {
    // Update button text
    languageSwitcher.querySelector('span').textContent = currentLanguage === 'en' ? 'EN' : 'AR';

    // Update all elements with data attributes
    document.querySelectorAll('[data-en], [data-ar]').forEach(element => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = element.getAttribute(`data-${currentLanguage}`);
        } else {
            if (element.hasAttribute('title')) {
                element.title = element.getAttribute(`data-${currentLanguage}`);
            } else {
                element.innerHTML = element.getAttribute(`data-${currentLanguage}`);
            }
        }
    });

    // Save language preference
    localStorage.setItem('language', currentLanguage);
}

// Theme Switcher
const themeSwitcher = document.getElementById('themeSwitcher');
const heroImage = document.querySelector('.hero-image img');
let darkMode = true;

// Set initial image based on theme
heroImage.src = 'https://i.ibb.co/5XFhFN6d/Web-Logo-1.png'; // Default dark mode image

themeSwitcher.addEventListener('click', () => {
    darkMode = !darkMode;
    updateTheme();
});

function updateTheme() {
    const logoImg = document.querySelector('.logo-img');
    const heroImage = document.querySelector('.hero-image img');
    
    if (darkMode) {
        // Dark Mode
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        logoImg.src = 'https://i.ibb.co/5XFhFN6d/Web-Logo-1.png'; // اللوجو الداكن
        heroImage.src = 'https://i.ibb.co/5XFhFN6d/Web-Logo-1.png'; // صورة الهيرو الداكنة
        themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        // Light Mode
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        logoImg.src = 'https://i.ibb.co/4gf8Kg9K/Web-Logo-2.png'; // اللوجو الفاتح
        heroImage.src = 'https://i.ibb.co/4gf8Kg9K/Web-Logo-2.png'; // صورة الهيرو الفاتحة
        themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // حفظ التفضيل في localStorage
    localStorage.setItem('darkMode', darkMode);
    
    // إضافة كلاس للانتقال السلس
    document.body.classList.add('theme-transition');
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 300);
}

// Load saved preferences
window.addEventListener('load', () => {
    // Load language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        updateLanguage();
    }

    // Load theme preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
        darkMode = savedDarkMode === 'true';
        updateTheme();
    }
});