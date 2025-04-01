// Custom Cursor with Cyberpunk Style
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

// Add cyberpunk style to cursor
cursor.style.border = '2px solid var(--primary-color)';
cursor.style.boxShadow = '0 0 20px var(--primary-color)';
cursorFollower.style.border = '2px solid var(--secondary-color)';
cursorFollower.style.boxShadow = '0 0 20px var(--secondary-color)';

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update cursor position
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    
    // Magnetic effect on interactive elements
    const magneticElements = document.querySelectorAll('a, button, .skill-card, .timeline-content');
    magneticElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(mouseX - centerX, 2) + 
            Math.pow(mouseY - centerY, 2)
        );
        
        if (distance < 100) {
            const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
            const force = (100 - distance) / 100;
            const moveX = Math.cos(angle) * force * 20;
            const moveY = Math.sin(angle) * force * 20;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
            element.style.transform = 'translate(0, 0)';
        }
    });
});

// Smooth cursor follower animation
function animateCursor() {
    // Update follower position with smooth easing
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Smooth Scrolling
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

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// 3D Card Effect
document.querySelectorAll('.skill-card, .timeline-content').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Enhanced Scroll Progress Indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${progress}%`;
});

// Parallax Effect on Hero Section
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Enhanced Scroll Reveal with 3D Effect
const scrollReveal = () => {
    const elements = document.querySelectorAll('.skill-card, .timeline-item, .cert-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('reveal');
            const distance = window.innerHeight - elementTop;
            const opacity = Math.min(1, distance / 300);
            const translateY = Math.max(0, (300 - distance) / 10);
            const rotateX = Math.max(0, (300 - distance) / 20);
            
            element.style.opacity = opacity;
            element.style.transform = `translateY(${translateY}px) rotateX(${rotateX}deg)`;
        }
    });
};

// Enhanced Form Validation with Animation
const contactForm = document.getElementById('contact-form');
const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');
    
    input.addEventListener('focus', () => {
        group.classList.add('focused');
        label.classList.add('active');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            group.classList.remove('focused');
            label.classList.remove('active');
        }
    });
});

// Enhanced Particle System for Cyberpunk Theme
const createBackgroundAnimation = () => {
    const canvas = document.createElement('canvas');
    canvas.className = 'background-canvas';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 150;
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(0, 255, 157, ${Math.random() * 0.3})`;
            this.trail = [];
            this.maxTrailLength = 5;
        }
        
        update() {
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > this.maxTrailLength) {
                this.trail.shift();
            }
            
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > width) this.speedX *= -1;
            if (this.y < 0 || this.y > height) this.speedY *= -1;
        }
        
        draw() {
            // Draw trail
            this.trail.forEach((pos, index) => {
                const alpha = (index / this.trail.length) * 0.3;
                ctx.fillStyle = `rgba(0, 255, 157, ${alpha})`;
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, this.size * 0.5, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Draw particle
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, width, height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
};

// Enhanced Glitch Effect
const createGlitchEffect = (element) => {
    const originalText = element.textContent;
    let glitchInterval;
    
    element.addEventListener('mouseenter', () => {
        glitchInterval = setInterval(() => {
            const glitchText = originalText
                .split('')
                .map(char => Math.random() > 0.9 ? String.fromCharCode(33 + Math.floor(Math.random() * 94)) : char)
                .join('');
            element.textContent = glitchText;
        }, 50);
    });
    
    element.addEventListener('mouseleave', () => {
        clearInterval(glitchInterval);
        element.textContent = originalText;
    });
};

// Apply glitch effect to headings
document.querySelectorAll('h1, h2, h3').forEach(createGlitchEffect);

// Enhanced 3D Card Effect with Cyberpunk Style
document.querySelectorAll('.skill-card, .timeline-content').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        // Add cyberpunk glow effect
        const glowX = (x / rect.width) * 100;
        const glowY = (y / rect.height) * 100;
        card.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0, 255, 157, 0.1), transparent 70%)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        card.style.background = '';
    });
});

// Cyberpunk Text Scramble Effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Apply text scramble effect to headings
document.querySelectorAll('h1, h2').forEach(el => {
    const scramble = new TextScramble(el);
    const originalText = el.textContent;
    
    el.addEventListener('mouseenter', () => {
        scramble.setText(originalText);
    });
});

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    createBackgroundAnimation();
    scrollReveal();
    window.addEventListener('scroll', scrollReveal);
});

// Form Validation and Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Email validation helper
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Add CSS for particles
const style = document.createElement('style');
style.textContent = `
    .particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    
    .particle {
        position: absolute;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        animation: float linear infinite;
    }
    
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
        }
        50% {
            transform: translateY(-100px) translateX(50px);
        }
        100% {
            transform: translateY(0) translateX(0);
        }
    }
    
    .reveal {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-card,
    .timeline-item,
    .cert-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 1rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;

document.head.appendChild(style); 