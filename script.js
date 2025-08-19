// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Page navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            
            // Remove active class from all links and pages
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked link and target page
            this.classList.add('active');
            document.getElementById(targetPage).classList.add('active');
            
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const college = document.getElementById('college').value;
            const message = document.getElementById('message').value;
            
            // Show success message (you can replace this with actual form submission)
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }

    // Add floating animation to hero shapes
    animateFloatingShapes();
    
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Utility function to scroll to a specific page
function scrollToPage(pageId) {
    const navLink = document.querySelector(`[data-page="${pageId}"]`);
    if (navLink) {
        navLink.click();
    }
}

// Group joining functionality
function joinGroup(groupType) {
    const groupUrls = {
        'chillfill': 'https://tally.so/r/wgVQ8P', // Replace with actual Tally form URL
        'skillhub': 'https://tally.so/r/wgVQ8P',  // Replace with actual Tally form URL
        'triptribe': 'https://tally.so/r/wgVQ8P', // Replace with actual Tally form URL
        'custom': 'https://tally.so/r/wgVQ8P'     // Replace with actual Tally form URL
    };
    
    const groupNames = {
        'chillfill': 'ChillFill',
        'skillhub': 'SkillHub',
        'triptribe': 'TripTribe',
        'custom': 'Custom Group'
    };
    
    // Show confirmation modal or directly redirect
    if (confirm(`Ready to join ${groupNames[groupType]}? You'll be redirected to our registration form.`)) {
        // Add loading state to button
        const button = event.target;
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
        button.disabled = true;
        
        // Redirect after short delay for better UX
        setTimeout(() => {
            window.open(groupUrls[groupType], '_blank');
            
            // Reset button state
            button.innerHTML = originalText;
            button.disabled = false;
            
            // Show success notification
            showNotification(`Opening registration for ${groupNames[groupType]}!`, 'success');
        }, 1000);
    }
}

// Modal functionality
function openModal(modalType) {
    const modal = document.getElementById(`${modalType}Modal`);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add event listener for clicking outside modal
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modalType);
            }
        });
    }
}

function closeModal(modalType) {
    const modal = document.getElementById(`${modalType}Modal`);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Keyboard accessibility for modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modal
        const openModals = document.querySelectorAll('.modal[style*="block"]');
        openModals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 
                    type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 
                    'linear-gradient(135deg, #6366f1, #8b5cf6)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        font-family: 'Poppins', sans-serif;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.2s;
        }
        
        .notification-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Floating shapes animation
function animateFloatingShapes() {
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        const randomDelay = Math.random() * 2000;
        const randomDuration = 6000 + Math.random() * 4000;
        
        setTimeout(() => {
            shape.style.animation = `float ${randomDuration}ms ease-in-out infinite`;
        }, randomDelay);
    });
}

// Smooth scrolling for page navigation
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add loading states to buttons
function addLoadingState(button, originalText, loadingText) {
    button.innerHTML = loadingText;
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
}

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shape');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + index * 0.1;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const heroTitle = entry.target.querySelector('.hero-title');
            if (heroTitle && !heroTitle.classList.contains('typed')) {
                heroTitle.classList.add('typed');
                // Add a slight delay before starting the typing effect
                setTimeout(() => {
                    typeWriter(heroTitle, "Find Your Tribe,\nJoin Your Vibe", 80);
                }, 500);
            }
        }
    });
}, { threshold: 0.5 });

// Observe hero section
const heroSection = document.getElementById('home');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Add interactive cursor effect
let cursor = null;
let cursorFollower = null;

function initCustomCursor() {
    cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        transform: translate(-50%, -50%);
    `;
    
    cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    cursorFollower.style.cssText = `
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid rgba(99, 102, 241, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.15s ease;
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .nav-link, .feature-card, .group-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.borderColor = '#06b6d4';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.borderColor = 'rgba(99, 102, 241, 0.5)';
        });
    });
}

// Initialize custom cursor only on desktop
if (window.innerWidth > 768) {
    document.addEventListener('DOMContentLoaded', initCustomCursor);
}

// Add smooth page transitions
function addPageTransitions() {
    const pages = document.querySelectorAll('.page');
    
    pages.forEach(page => {
        page.style.transition = 'all 0.3s ease-in-out';
    });
}

// Initialize page transitions
document.addEventListener('DOMContentLoaded', addPageTransitions);

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / scrollable) * 100;
        
        progressBar.style.width = progress + '%';
    });
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', createScrollProgress);

// Add intersection observer for statistics counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.textContent);
                let count = 0;
                const increment = target / 100;
                
                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        entry.target.textContent = Math.ceil(count) + '+';
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.textContent = target + '+';
                    }
                };
                
                updateCount();
            }
        });
    }, { threshold: 0.7 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Initialize counter animation
document.addEventListener('DOMContentLoaded', animateCounters);

// Add dynamic background particles
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Create floating particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.1) 100%);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatParticle ${duration}s ${delay}s infinite ease-in-out;
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createParticle(container);
        }
    }, (duration + delay) * 1000);
}

// Add particle animation keyframes
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        50% {
            transform: translateY(-100px) translateX(50px) rotate(180deg);
        }
    }
`;
document.head.appendChild(particleStyles);

// Initialize particles only on desktop for performance
if (window.innerWidth > 768) {
    document.addEventListener('DOMContentLoaded', createParticles);
}

// Add form validation with better UX
function enhanceFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearValidationError);
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error
        clearValidationError(e);
        
        if (!value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && !isValidEmail(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        
        showFieldSuccess(field);
        return true;
    }
    
    function clearValidationError(e) {
        const field = e.target;
        const errorElement = field.parentNode.querySelector('.field-error');
        const successElement = field.parentNode.querySelector('.field-success');
        
        if (errorElement) errorElement.remove();
        if (successElement) successElement.remove();
        
        field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    }
    
    function showFieldError(field, message) {
        field.style.borderColor = '#ef4444';
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        field.parentNode.appendChild(errorElement);
    }
    
    function showFieldSuccess(field) {
        field.style.borderColor = '#10b981';
        
        const successElement = document.createElement('div');
        successElement.className = 'field-success';
        successElement.style.cssText = `
            color: #10b981;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        successElement.innerHTML = `<i class="fas fa-check-circle"></i> Looks good!`;
        
        field.parentNode.appendChild(successElement);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Initialize enhanced form validation
document.addEventListener('DOMContentLoaded', enhanceFormValidation);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Navigate pages with arrow keys
    if (e.ctrlKey || e.metaKey) {
        const activePageIndex = Array.from(document.querySelectorAll('.page')).findIndex(page => page.classList.contains('active'));
        const totalPages = document.querySelectorAll('.page').length;
        
        if (e.key === 'ArrowRight' && activePageIndex < totalPages - 1) {
            e.preventDefault();
            const nextNavLink = document.querySelectorAll('.nav-link')[activePageIndex + 1];
            if (nextNavLink) nextNavLink.click();
        }
        
        if (e.key === 'ArrowLeft' && activePageIndex > 0) {
            e.preventDefault();
            const prevNavLink = document.querySelectorAll('.nav-link')[activePageIndex - 1];
            if (prevNavLink) prevNavLink.click();
        }
    }
});

// Add touch gesture support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 100;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        const activePageIndex = Array.from(document.querySelectorAll('.page')).findIndex(page => page.classList.contains('active'));
        const totalPages = document.querySelectorAll('.page').length;
        
        if (swipeDistance > 0 && activePageIndex > 0) {
            // Swipe right - go to previous page
            const prevNavLink = document.querySelectorAll('.nav-link')[activePageIndex - 1];
            if (prevNavLink) prevNavLink.click();
        } else if (swipeDistance < 0 && activePageIndex < totalPages - 1) {
            // Swipe left - go to next page
            const nextNavLink = document.querySelectorAll('.nav-link')[activePageIndex + 1];
            if (nextNavLink) nextNavLink.click();
        }
    }
}

