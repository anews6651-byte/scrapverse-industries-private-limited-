/* ===================================
   SCRAPVERSE INDUSTRIES
   Premium Corporate Landing Page
   JavaScript
   =================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    Preloader.init();
    Navigation.init();
    Hero.init();
    StatsCounter.init();
    ScrollAnimations.init();
    ContactForm.init();
    BackToTop.init();
    SmoothScroll.init();
    AOS.init();
});

/* ===================================
   Preloader Module
   =================================== */
const Preloader = {
    init() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;

        // Hide preloader after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 1000);
        });

        // Fallback: hide preloader after 3 seconds max
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 3000);
    }
};

/* ===================================
   Navigation Module
   =================================== */
const Navigation = {
    navbar: null,
    mobileToggle: null,
    mobileMenu: null,
    mobileOverlay: null,
    mobileClose: null,
    navLinks: null,
    sections: null,

    init() {
        this.navbar = document.getElementById('navbar');
        this.mobileToggle = document.getElementById('mobileToggle');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.mobileOverlay = document.getElementById('mobileOverlay');
        this.mobileClose = document.getElementById('mobileClose');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');

        this.bindEvents();
    },

    bindEvents() {
        // Scroll event for navbar
        window.addEventListener('scroll', () => this.handleScroll());

        // Mobile menu toggle
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Mobile menu close
        if (this.mobileClose) {
            this.mobileClose.addEventListener('click', () => this.closeMobileMenu());
        }

        // Mobile overlay click
        if (this.mobileOverlay) {
            this.mobileOverlay.addEventListener('click', () => this.closeMobileMenu());
        }

        // Mobile nav links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Active nav link on scroll
        window.addEventListener('scroll', () => this.updateActiveLink());
    },

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    },

    toggleMobileMenu() {
        this.mobileToggle.classList.toggle('active');
        this.mobileMenu.classList.toggle('active');
        this.mobileOverlay.classList.toggle('active');
        document.body.style.overflow = this.mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    },

    closeMobileMenu() {
        this.mobileToggle.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        this.mobileOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    },

    updateActiveLink() {
        let scrollPosition = window.scrollY + 100;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
};

/* ===================================
   Hero Module
   =================================== */
const Hero = {
    init() {
        this.setupParallax();
        this.setupTypingEffect();
    },

    setupParallax() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
            }
        });
    },

    setupTypingEffect() {
        // Optional: Add typing effect for hero subtitle
    }
};

/* ===================================
   Statistics Counter Module
   =================================== */
const StatsCounter = {
    counters: [],
    hasAnimated: false,

    init() {
        this.counters = document.querySelectorAll('.stat-number');
        if (this.counters.length === 0) return;

        this.observeStats();
    },

    observeStats() {
        const statsSection = document.querySelector('.statistics');
        if (!statsSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.hasAnimated = true;
                    this.animateCounters();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    },

    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = this.formatNumber(Math.floor(current));
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = this.formatNumber(target);
                }
            };

            updateCounter();
        });
    },

    formatNumber(num) {
        if (num >= 1000) {
            return num.toLocaleString();
        }
        return num.toString();
    }
};

/* ===================================
   Scroll Animations Module
   =================================== */
const ScrollAnimations = {
    init() {
        this.setupRevealAnimations();
        this.setupHoverEffects();
    },

    setupRevealAnimations() {
        // Additional custom scroll animations beyond AOS
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => observer.observe(el));
    },

    setupHoverEffects() {
        // Service cards tilt effect
        const cards = document.querySelectorAll('.service-card, .why-card, .industry-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }
};

/* ===================================
   Contact Form Module
   =================================== */
const ContactForm = {
    form: null,

    init() {
        this.form = document.getElementById('contactForm');
        if (!this.form) return;

        this.bindEvents();
    },

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    },

    handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            this.showSuccess();
            this.form.reset();
        }
    },

    validateForm() {
        let isValid = true;
        const requiredFields = this.form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    },

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearError(field);

        // Required check
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        if (!isValid) {
            this.showError(field, errorMessage);
        }

        return isValid;
    },

    showError(field, message) {
        field.style.borderColor = '#ef4444';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.cssText = 'color: #ef4444; font-size: 0.8rem; margin-top: 4px;';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    },

    clearError(field) {
        field.style.borderColor = '';
        const error = field.parentNode.querySelector('.field-error');
        if (error) error.remove();
    },

    showSuccess() {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #16A34A;
            color: white;
            padding: 32px 48px;
            border-radius: 16px;
            text-align: center;
            z-index: 9999;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: scaleIn 0.3s ease;
        `;
        successDiv.innerHTML = `
            <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 16px;"></i>
            <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.5rem; margin-bottom: 8px;">Thank You!</h3>
            <p style="margin-bottom: 24px;">Your inquiry has been submitted successfully.<br>Our team will contact you within 24 hours.</p>
            <button onclick="this.parentElement.remove()" style="
                background: white;
                color: #16A34A;
                border: none;
                padding: 12px 32px;
                border-radius: 8px;
                font-family: 'Poppins', sans-serif;
                font-weight: 600;
                cursor: pointer;
            ">Close</button>
        `;
        
        document.body.appendChild(successDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 5000);
    }
};

/* ===================================
   Back to Top Module
   =================================== */
const BackToTop = {
    button: null,

    init() {
        this.button = document.getElementById('backToTop');
        if (!this.button) return;

        this.bindEvents();
    },

    bindEvents() {
        // Show/hide button on scroll
        window.addEventListener('scroll', () => this.toggleVisibility());
        
        // Scroll to top on click
        this.button.addEventListener('click', () => this.scrollToTop());
    },

    toggleVisibility() {
        if (window.scrollY > 300) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    },

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

/* ===================================
   Smooth Scroll Module
   =================================== */
const SmoothScroll = {
    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navHeight = document.getElementById('navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

/* ===================================
   Gallery Module (Lightbox)
   =================================== */
const Gallery = {
    init() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                this.openLightbox(item);
            });
        });
    },

    openLightbox(item) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            max-width: 80%;
            max-height: 80%;
            text-align: center;
            color: white;
        `;

        const icon = item.querySelector('i') || item.querySelector('.gallery-placeholder i');
        const text = item.querySelector('span') || item.querySelector('.gallery-placeholder span');
        
        if (icon) {
            const iconClone = icon.cloneNode(true);
            iconClone.style.cssText = 'font-size: 5rem; color: rgba(255,255,255,0.3); margin-bottom: 24px;';
            content.appendChild(iconClone);
        }
        
        if (text) {
            const textEl = document.createElement('h3');
            textEl.textContent = text.textContent;
            textEl.style.cssText = 'font-family: "Poppins", sans-serif; font-size: 1.5rem;';
            content.appendChild(textEl);
        }

        overlay.appendChild(content);
        document.body.appendChild(overlay);

        // Close on click
        overlay.addEventListener('click', () => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        });

        // Close on escape
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 300);
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }
};

// Initialize Gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Gallery.init();
});

/* ===================================
   Utility Functions
   =================================== */
const Utils = {
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

/* ===================================
   AOS Initialization
   =================================== */
function initAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        delay: 0,
        anchorPlacement: 'top-bottom'
    });
}

// Initialize AOS when DOM is ready
document.addEventListener('DOMContentLoaded', initAOS);

/* ===================================
   Performance: Lazy Load Images
   =================================== */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ===================================
   Console Easter Egg
   =================================== */
console.log('%c ScrapVerse Industries ', 'background: #16A34A; color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c Premium Scrap Recycling Solutions ', 'color: #64748B; font-size: 12px; padding: 5px;');
