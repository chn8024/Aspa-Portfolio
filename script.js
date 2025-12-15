// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
            }
        });
    });
});

// Dynamic Tagline Changes
const taglines = [
    "Crafting Digital Experiences | Web Developer & Designer",
    "Building the Future, One Line of Code at a Time",
    "Where Creativity Meets Technology",
    "Turning Ideas into Interactive Realities"
];

let currentTaglineIndex = 0;
const taglineElement = document.querySelector('.tagline');

function changeTagline() {
    currentTaglineIndex = (currentTaglineIndex + 1) % taglines.length;
    taglineElement.style.opacity = '0';

    setTimeout(() => {
        taglineElement.textContent = taglines[currentTaglineIndex];
        taglineElement.style.opacity = '1';
    }, 500);
}

// Change tagline every 5 seconds
setInterval(changeTagline, 5000);

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

// Custom validation functions
function validateName(name) {
    if (name.trim() === '') {
        return 'Name is required.';
    }
    if (name.length < 2) {
        return 'Name must be at least 2 characters long.';
    }
    return '';
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
        return 'Email is required.';
    }
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address.';
    }
    return '';
}

function validateMessage(message) {
    if (message.trim() === '') {
        return 'Message is required.';
    }
    if (message.length < 10) {
        return 'Message must be at least 10 characters long.';
    }
    return '';
}

// Real-time validation
nameInput.addEventListener('input', () => {
    const error = validateName(nameInput.value);
    nameError.textContent = error;
});

emailInput.addEventListener('input', () => {
    const error = validateEmail(emailInput.value);
    emailError.textContent = error;
});

messageInput.addEventListener('input', () => {
    const error = validateMessage(messageInput.value);
    messageError.textContent = error;
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameErrorMsg = validateName(nameInput.value);
    const emailErrorMsg = validateEmail(emailInput.value);
    const messageErrorMsg = validateMessage(messageInput.value);

    nameError.textContent = nameErrorMsg;
    emailError.textContent = emailErrorMsg;
    messageError.textContent = messageErrorMsg;

    if (!nameErrorMsg && !emailErrorMsg && !messageErrorMsg) {
        // Form is valid, simulate submission
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
    }
});

// Social Media Buttons (Placeholder functionality)
const instagramBtn = document.getElementById('instagram-btn');
const facebookBtn = document.getElementById('facebook-btn');

instagramBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Instagram link would open here. Follow me at @yrean!');
});

facebookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Facebook link would open here. Connect with me on Facebook!');
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Observe project cards
projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
