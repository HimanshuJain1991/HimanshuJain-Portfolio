// ============================================
// ULTRA MODERN PORTFOLIO - INTERACTIVE JS
// ============================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu-glass');
    const navLinks = document.querySelectorAll('.nav-link-glass');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // ============================================
    // SMOOTH SCROLL & ACTIVE NAVIGATION
    // ============================================
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active navigation on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================
    
    const scrollTop = document.getElementById('scrollTop');
    
    if (scrollTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        });
        
        scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ============================================
    // 3D TILT EFFECT FOR CARDS
    // ============================================
    
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', handleTilt);
        element.addEventListener('mouseleave', resetTilt);
    });
    
    function handleTilt(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }
    
    function resetTilt(e) {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
    
    // ============================================
    // INTERSECTION OBSERVER - FADE IN ANIMATIONS
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards
    const cards = document.querySelectorAll('.glass-card, .skill-pill, .project-tag');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.05}s`;
        observer.observe(card);
    });
    
    // ============================================
    // TYPING EFFECT FOR HERO SUBTITLE
    // ============================================
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < text.length) {
                heroSubtitle.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // ============================================
    // ANIMATED COUNTERS FOR STATS
    // ============================================
    
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = element.textContent;
        const isPlus = target.includes('+');
        const number = parseFloat(target); // Changed to parseFloat for decimals
        
        if (isNaN(number)) return;
        
        let current = 0;
        const increment = number / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        element.textContent = '0' + (isPlus ? '+' : '');
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                // Show decimal if it has one, otherwise show integer
                element.textContent = (number % 1 === 0 ? number : number.toFixed(1)) + (isPlus ? '+' : '');
                clearInterval(timer);
            } else {
                // Show decimal during animation if target has decimal
                element.textContent = (number % 1 === 0 ? Math.floor(current) : current.toFixed(1)) + (isPlus ? '+' : '');
            }
        }, stepTime);
    };
    
    // Animate counters when they come into view
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
    
    // ============================================
    // PARALLAX EFFECT FOR BACKGROUND SHAPES
    // ============================================
    
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ============================================
    // CURSOR GLOW EFFECT
    // ============================================
    
    const createCursorGlow = () => {
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        glow.style.cssText = `
            position: fixed;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease;
            display: none;
        `;
        document.body.appendChild(glow);
        
        document.addEventListener('mousemove', (e) => {
            glow.style.display = 'block';
            glow.style.left = e.clientX - 100 + 'px';
            glow.style.top = e.clientY - 100 + 'px';
        });
        
        document.addEventListener('mouseleave', () => {
            glow.style.display = 'none';
        });
    };
    
    // Only on desktop
    if (window.innerWidth > 768) {
        createCursorGlow();
    }
    
    // ============================================
    // GLASS NAV BLUR ON SCROLL
    // ============================================
    
    const glassNav = document.querySelector('.glass-nav');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            glassNav.style.backdropFilter = 'blur(30px)';
            glassNav.style.background = 'rgba(10, 10, 31, 0.8)';
        } else {
            glassNav.style.backdropFilter = 'blur(20px)';
            glassNav.style.background = 'rgba(255, 255, 255, 0.05)';
        }
    });
    
    // ============================================
    // SKILL PILLS HOVER ANIMATION
    // ============================================
    
    const skillPills = document.querySelectorAll('.skill-pill');
    
    skillPills.forEach(pill => {
        pill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        pill.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ============================================
    // PROJECT CARDS STAGGER ANIMATION
    // ============================================
    
    const projectCards = document.querySelectorAll('.project-card');
    
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        projectObserver.observe(card);
    });
    
    // ============================================
    // SOCIAL BUTTON RIPPLE EFFECT
    // ============================================
    
    const socialButtons = document.querySelectorAll('.social-btn, .footer-social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ============================================
    // GLASS CARD SHINE EFFECT
    // ============================================
    
    const glassCards = document.querySelectorAll('.glass-card');
    
    glassCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // ============================================
    // PERFORMANCE OPTIMIZATION
    // ============================================
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            // Scroll-based animations here are already defined above
        });
    }, { passive: true });
    
    // ============================================
    // LOADING ANIMATION
    // ============================================
    
    window.addEventListener('load', () => {
        document.body.classList.remove('loading');
        
        // Fade in the hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.opacity = '0';
            setTimeout(() => {
                heroSection.style.transition = 'opacity 1s ease';
                heroSection.style.opacity = '1';
            }, 100);
        }
    });
    
    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    
    console.log('%c🚀 Welcome to My Portfolio!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
    console.log('%c✨ Built with love using HTML, CSS & JavaScript', 'font-size: 14px; color: #8b5cf6;');
    console.log('%c📧 Interested in working together? himanshujain119@yahoo.com', 'font-size: 12px; color: #94a3b8;');
    console.log('%c💡 Tip: Try hovering over the cards!', 'font-size: 12px; color: #10b981;');
    
    // ============================================
    // PREVENT RIGHT CLICK (Optional - remove if not needed)
    // ============================================
    
    // Uncomment if you want to prevent right-click
    // document.addEventListener('contextmenu', (e) => {
    //     e.preventDefault();
    // });
    
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Throttle function for performance
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

// Debounce function for performance
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// RESPONSIVE HANDLER
// ============================================

let windowWidth = window.innerWidth;

window.addEventListener('resize', debounce(() => {
    const newWidth = window.innerWidth;
    
    // Only reload if crossing mobile/desktop breakpoint
    if ((windowWidth <= 768 && newWidth > 768) || 
        (windowWidth > 768 && newWidth <= 768)) {
        windowWidth = newWidth;
        // Reinitialize any layout-dependent features
    }
}, 250));
