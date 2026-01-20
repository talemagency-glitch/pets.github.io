/* ============================================
   KIDSAI - GLOBAL JAVASCRIPT
   Handles animations, interactions, and GSAP effects
   ============================================ */

// ========== GSAP CONFIGURATION ==========
gsap.registerPlugin(ScrollTrigger);

// ========== DOM ELEMENTS ==========
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// ========== HAMBURGER MENU TOGGLE ==========
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ========== SMOOTH SCROLLING ==========
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

// ========== SCROLL ANIMATIONS ==========
// Animate elements on scroll
const animateOnScroll = () => {
    // Benefit cards
    gsap.utils.toArray('.benefit-card').forEach((el, index) => {
        gsap.from(el, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Course cards
    gsap.utils.toArray('.course-card, .course-detail-card').forEach((el, index) => {
        gsap.from(el, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: index * 0.08,
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Testimonial cards
    gsap.utils.toArray('.testimonial-card').forEach((el, index) => {
        gsap.from(el, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Feature items
    gsap.utils.toArray('.feature-item').forEach((el, index) => {
        gsap.from(el, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: index * 0.08,
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Value cards
    gsap.utils.toArray('.value-card').forEach((el, index) => {
        gsap.from(el, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Team members
    gsap.utils.toArray('.team-member').forEach((el, index) => {
        gsap.from(el, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Pricing cards
    gsap.utils.toArray('.pricing-card').forEach((el, index) => {
        gsap.from(el, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // FAQ items
    gsap.utils.toArray('.faq-item').forEach((el, index) => {
        gsap.from(el, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: index * 0.08,
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Contact info & form
    gsap.from('.contact-info', {
        opacity: 0,
        x: -30,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.contact-wrapper',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.from('.contact-form-wrapper', {
        opacity: 0,
        x: 30,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.contact-wrapper',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });

    // Stat boxes
    gsap.utils.toArray('.stat-box').forEach((el, index) => {
        gsap.from(el, {
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Trust items
    gsap.utils.toArray('.logo-item, .trust-quote').forEach((el, index) => {
        gsap.from(el, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
};

// ========== HOVER EFFECTS ==========
const addHoverEffects = () => {
    // Benefit cards hover
    document.querySelectorAll('.benefit-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3
            });
        });
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3
            });
        });
    });

    // Button hover effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (!this.classList.contains('btn-block')) {
                gsap.to(this, {
                    scale: 1.05,
                    duration: 0.2
                });
            }
        });
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.2
            });
        });
    });

    // Course card hover
    document.querySelectorAll('.course-card, .course-detail-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -8,
                duration: 0.3
            });
        });
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.3
            });
        });
    });
};

// ========== FORM HANDLING ==========
const handleContactForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate required fields
        if (!data.name || !data.email || !data['child-age'] || !data.interest) {
            showFormMessage('Please fill in all required fields', 'error');
            return;
        }

        // Simulate form submission (replace with actual API call)
        try {
            // In a real application, you would send this data to a server
            console.log('Form data:', data);

            // Show success message
            showFormMessage('🎉 Success! Check your email for next steps. Welcome to KidsAI! 🚀', 'success');

            // Reset form
            form.reset();

            // Scroll to message
            document.getElementById('form-message').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } catch (error) {
            showFormMessage('Something went wrong. Please try again.', 'error');
            console.error('Form error:', error);
        }
    });
};

const showFormMessage = (message, type) => {
    const messageEl = document.getElementById('form-message');
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.className = `form-message ${type}`;

        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageEl.className = 'form-message';
        }, 5000);
    }
};

// ========== STATS COUNTER ==========
const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        ScrollTrigger.create({
            trigger: stat,
            onEnter: () => {
                const text = stat.textContent.trim();
                let finalValue = 0;

                // Extract numeric value
                if (text.includes('K')) {
                    finalValue = parseInt(text) * 1000;
                } else if (text.includes('★')) {
                    // Skip rating
                    return;
                } else {
                    finalValue = parseInt(text);
                }

                // Only animate numbers
                if (!isNaN(finalValue) && finalValue > 0) {
                    gsap.fromTo(
                        { val: 0 },
                        { val: finalValue, duration: 2, ease: 'power2.out' },
                        {
                            onUpdate: function() {
                                if (text.includes('K')) {
                                    stat.textContent = Math.round(this.targets()[0].val / 1000) + 'K+';
                                } else {
                                    stat.textContent = Math.round(this.targets()[0].val) + '+';
                                }
                            }
                        }
                    );
                }
            },
            once: true
        });
    });
};

// ========== PARALLAX EFFECT ==========
const addParallaxEffect = () => {
    gsap.utils.toArray('.hero-bg').forEach((section) => {
        gsap.to(section, {
            y: -100,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                scrub: true,
                markers: false
            }
        });
    });
};

// ========== SCROLL INDICATOR ==========
const handleScrollIndicator = () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            gsap.to(scrollIndicator, {
                opacity: 0,
                duration: 0.3,
                pointerEvents: 'none'
            });
        }
    });
};

// ========== NAVIGATION ACTIVE STATE ==========
const updateActiveNav = () => {
    window.addEventListener('scroll', () => {
        let current = '';

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
};

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.benefit-card, .course-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
};

// ========== INITIALIZE ALL FEATURES ==========
const init = () => {
    console.log('KidsAI Platform Initialized');

    // Run all initialization functions
    animateOnScroll();
    addHoverEffects();
    handleContactForm();
    animateStats();
    addParallaxEffect();
    handleScrollIndicator();
    updateActiveNav();
    observeElements();

    // Refresh ScrollTrigger after page load
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);
};

// ========== DOM READY ==========
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========== WINDOW RESIZE - REFRESH SCROLL TRIGGERS ==========
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// ========== PAGE VISIBILITY - PAUSE ANIMATIONS ON TAB INACTIVE ==========
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        gsap.globalTimeline.pause();
    } else {
        gsap.globalTimeline.resume();
    }
});
