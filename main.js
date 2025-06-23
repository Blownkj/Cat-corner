// Enhanced JavaScript for Cat Corner Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeCatFiltering();
    initializeMenuTabs();
    initializeContactForm();
    initializeAdoptionButtons();
    initializeEventRegistration();
    initializeSmoothScrolling();
    initializeImageLoading();
    initializeScrollAnimations();
    initializeHeaderEffects();
    initializeParallaxEffects();
    initializeTypingEffect();
    initializeIntersectionObserver();
    initializeCardHoverEffects();
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Cat filtering functionality with enhanced animations
function initializeCatFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const catCards = document.querySelectorAll('.cat-card');

    if (filterButtons.length > 0 && catCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                catCards.forEach((card, index) => {
                    const cardAge = card.getAttribute('data-age');
                    
                    if (filterValue === 'all' || cardAge === filterValue) {
                        card.style.display = 'block';
                        // Staggered animation
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, index * 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Initialize transition styles
        catCards.forEach(card => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
    }
}

// Menu tab functionality with smooth transitions
function initializeMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');

    if (menuTabs.length > 0 && menuCategories.length > 0) {
        menuTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                menuTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');

                const category = this.getAttribute('data-category');

                // Hide all categories with fade out
                menuCategories.forEach(cat => {
                    cat.style.opacity = '0';
                    cat.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        cat.classList.remove('active');
                    }, 150);
                });

                // Show selected category with fade in
                setTimeout(() => {
                    const targetCategory = document.getElementById(category);
                    if (targetCategory) {
                        targetCategory.classList.add('active');
                        setTimeout(() => {
                            targetCategory.style.opacity = '1';
                            targetCategory.style.transform = 'translateY(0)';
                        }, 50);
                    }
                }, 150);
            });
        });

        // Initialize transition styles
        menuCategories.forEach(category => {
            category.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
    }
}

// Enhanced contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = {};
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }

            // Enhanced validation
            const errors = validateForm(formValues);
            
            if (errors.length > 0) {
                showNotification(errors.join(', '), 'error');
                return;
            }

            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<span>Отправка...</span>';
            submitButton.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                showNotification('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.', 'success');
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Form validation helper
function validateForm(values) {
    const errors = [];
    
    if (!values.name || values.name.trim().length < 2) {
        errors.push('Пожалуйста, введите корректное имя');
    }
    
    if (!values.email || !isValidEmail(values.email)) {
        errors.push('Пожалуйста, введите корректный email');
    }
    
    if (!values.subject) {
        errors.push('Пожалуйста, выберите тему обращения');
    }
    
    if (!values.message || values.message.trim().length < 10) {
        errors.push('Пожалуйста, введите сообщение (не менее 10 символов)');
    }
    
    return errors;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Adoption inquiry buttons with enhanced feedback
function initializeAdoptionButtons() {
    const adoptButtons = document.querySelectorAll('.adopt-btn');
    adoptButtons.forEach(button => {
        button.addEventListener('click', function() {
            const catCard = this.closest('.cat-card');
            const catName = catCard.querySelector('h3').textContent;
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            showNotification(`Спасибо за интерес к коту ${catName}! Пожалуйста, приходите к нам или позвоните по телефону (555) 123-КОТЫ, чтобы узнать больше о процессе усыновления.`, 'success');
        });
    });
}

// Event registration with enhanced UX
function initializeEventRegistration() {
    const registerButtons = document.querySelectorAll('.event-card .btn');
    registerButtons.forEach(button => {
        if (button.textContent.includes('Register')) {
            button.addEventListener('click', function() {
                const eventCard = this.closest('.event-card');
                const eventName = eventCard.querySelector('h3').textContent;
                
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                showNotification(`Спасибо за интерес к событию "${eventName}"! Пожалуйста, позвоните нам по телефону (555) 123-КОТЫ для завершения регистрации.`, 'success');
            });
        }
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced image loading with fade-in effect
function initializeImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // If image is already loaded (cached)
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

// Scroll animations with Intersection Observer
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .cat-card, .event-card, .team-member, .value-card, .menu-item, .activity-card, .faq-item, .contact-item, .step');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Header scroll effects
function initializeHeaderEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove background based on scroll position
            if (scrollTop > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
            
            // Hide/show header based on scroll direction
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
}

// Parallax effects for hero sections
function initializeParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image img');
        
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        // Parallax for page hero backgrounds
        const pageHero = document.querySelector('.page-hero');
        if (pageHero && scrolled < window.innerHeight) {
            pageHero.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
}

// Typing effect for hero text
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && (window.location.pathname === '/' || window.location.pathname.includes('index.html'))) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
}

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    element.style.borderRight = '2px solid #FF8C00';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    type();
}

// Intersection Observer for advanced animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add specific animations based on element type
                if (element.classList.contains('stats-grid')) {
                    animateStats(element);
                } else if (element.classList.contains('hero-content')) {
                    animateHeroContent(element);
                }
            }
        });
    }, observerOptions);

    // Observe specific elements
    const statsGrid = document.querySelector('.stats-grid');
    const heroContent = document.querySelector('.hero-content');
    
    if (statsGrid) observer.observe(statsGrid);
    if (heroContent) observer.observe(heroContent);
}

// Animate statistics numbers
function animateStats(statsGrid) {
    const statNumbers = statsGrid.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        animateNumber(stat, 0, finalValue, 2000);
    });
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * easeOutQuart(progress));
        element.textContent = current + (element.textContent.includes('.') ? '.9' : '+');
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

// Animate hero content
function animateHeroContent(heroContent) {
    const title = heroContent.querySelector('.hero-title');
    const subtitle = heroContent.querySelector('.hero-subtitle');
    const buttons = heroContent.querySelector('.hero-buttons');
    
    if (title) {
        title.style.animation = 'slideInLeft 0.8s ease forwards';
    }
    if (subtitle) {
        subtitle.style.animation = 'slideInLeft 0.8s ease 0.2s forwards';
        subtitle.style.opacity = '0';
    }
    if (buttons) {
        buttons.style.animation = 'slideInLeft 0.8s ease 0.4s forwards';
        buttons.style.opacity = '0';
    }
}

// Enhanced card hover effects
function initializeCardHoverEffects() {
    const cards = document.querySelectorAll('.cat-card, .feature-card, .event-card, .menu-item, .team-member, .value-card, .activity-card, .faq-item, .contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Create notification content
    const content = document.createElement('div');
    content.className = 'notification-content';
    content.innerHTML = `
        <div class="notification-icon">
            ${getNotificationIcon(type)}
        </div>
        <div class="notification-text">${message}</div>
        <button class="notification-close">&times;</button>
    `;
    
    notification.appendChild(content);
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%) scale(0.8);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        max-width: 400px;
        min-width: 300px;
    `;
    
    // Style notification content
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    // Style close button
    const closeButton = content.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.2s ease;
    `;
    
    closeButton.addEventListener('click', () => removeNotification(notification));
    closeButton.addEventListener('mouseenter', () => closeButton.style.opacity = '1');
    closeButton.addEventListener('mouseleave', () => closeButton.style.opacity = '0.8');
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0) scale(1)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(135deg, #4CAF50, #45a049)',
        error: 'linear-gradient(135deg, #f44336, #da190b)',
        warning: 'linear-gradient(135deg, #ff9800, #f57c00)',
        info: 'linear-gradient(135deg, #2196F3, #0b7dda)'
    };
    return colors[type] || colors.info;
}

function removeNotification(notification) {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%) scale(0.8)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 400);
}

// Utility functions for enhanced UX
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimizations
const debouncedScroll = debounce(() => {
    // Scroll-based animations can be added here
}, 10);

const throttledResize = throttle(() => {
    // Resize-based recalculations can be added here
}, 250);

window.addEventListener('scroll', debouncedScroll);
window.addEventListener('resize', throttledResize);

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Initialize tooltips for better UX
function initializeTooltips() {
    const elementsWithTooltips = document.querySelectorAll('[data-tooltip]');
    elementsWithTooltips.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.getAttribute('data-tooltip');
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        z-index: 10001;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    setTimeout(() => tooltip.style.opacity = '1', 10);
    
    e.target._tooltip = tooltip;
}

function hideTooltip(e) {
    if (e.target._tooltip) {
        e.target._tooltip.style.opacity = '0';
        setTimeout(() => {
            if (e.target._tooltip && e.target._tooltip.parentNode) {
                e.target._tooltip.parentNode.removeChild(e.target._tooltip);
            }
            delete e.target._tooltip;
        }, 300);
    }
}

// Initialize tooltips
initializeTooltips();