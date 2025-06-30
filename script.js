document.addEventListener('DOMContentLoaded', function() {
    // Page Loader
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.appendChild(loader);
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }, 500);
    });

    // Navbar functionality
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });
    
    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate stats numbers
                if (entry.target.classList.contains('stat')) {
                    animateValue(entry.target.querySelector('h3'));
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.section-animate, .feature, .service-card, .product-card, .stat').forEach(el => {
        el.classList.add('section-animate');
        observer.observe(el);
    });

    // Animate numbers
    function animateValue(element) {
        if (!element || element.dataset.animated) return;
        
        const text = element.textContent;
        const number = parseInt(text.replace(/[^0-9]/g, ''));
        const suffix = text.replace(/[0-9]/g, '').replace(/[,\s]/g, '');
        
        if (!isNaN(number)) {
            element.dataset.animated = 'true';
            const duration = 2000;
            const start = 0;
            const increment = number / (duration / 16);
            let current = start;
            
            const timer = setInterval(function() {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current).toLocaleString() + suffix;
            }, 16);
        }
    }

    // Parallax effect for hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = -scrolled * 0.5;
            hero.style.backgroundPositionY = parallax + 'px';
        });
    }

    // Form handling with enhanced validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation animation
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--secondary-color)';
                    input.classList.add('shake');
                    setTimeout(() => {
                        input.classList.remove('shake');
                        input.style.borderColor = '';
                    }, 500);
                }
            });
            
            if (isValid) {
                // Show success animation
                const button = form.querySelector('button[type="submit"]');
                const originalText = button.textContent;
                button.innerHTML = '<span style="display: inline-block; animation: spin 1s linear infinite;">⏳</span> Sending...';
                button.disabled = true;
                
                setTimeout(() => {
                    button.innerHTML = '✓ Sent Successfully!';
                    button.style.backgroundColor = '#28a745';
                    
                    setTimeout(() => {
                        alert('Thank you for your submission! We will contact you soon.');
                        form.reset();
                        button.textContent = originalText;
                        button.style.backgroundColor = '';
                        button.disabled = false;
                    }, 1500);
                }, 1500);
            }
        });
    });
    
    // Enhanced email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const email = input.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                input.setCustomValidity('Please enter a valid email address');
                input.reportValidity();
            } else {
                input.setCustomValidity('');
            }
        });
    });
    
    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            let value = input.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            input.value = value;
        });
    });

    // Add hover sound effect (optional - requires audio file)
    const hoverElements = document.querySelectorAll('.btn, .feature, .service-card, .product-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            // Could add subtle sound effect here
            this.style.transform = 'scale(1.02)';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Typing effect for hero heading
    const heroHeading = document.querySelector('.hero-content h1');
    if (heroHeading) {
        const text = heroHeading.textContent;
        heroHeading.textContent = '';
        heroHeading.style.minHeight = '4rem';
        
        let index = 0;
        function typeWriter() {
            if (index < text.length) {
                heroHeading.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 500);
    }

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    .shake {
        animation: shake 0.5s ease-in-out;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);