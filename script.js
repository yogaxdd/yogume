// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when navigation link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
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

// This is now handled in initScrollEffects function

// Enhanced Testimonials Carousel
let currentTestimonialIndex = 0;
let testimonialSlides = [];
let testimonialDots = [];
let testimonialWrapper = null;
let autoPlayInterval = null;

function initTestimonialCarousel() {
    testimonialSlides = document.querySelectorAll('.testimonial-card');
    testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    testimonialWrapper = document.querySelector('.testimonials-wrapper');
    
    if (testimonialSlides.length > 0) {
        showTestimonial(0);
        startAutoPlay();
    }
}

function showTestimonial(index) {
    if (!testimonialWrapper || !testimonialSlides.length) return;
    
    // Update current index
    currentTestimonialIndex = index;
    
    // Move the wrapper to show the current slide
    const translateX = -index * 100;
    testimonialWrapper.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    // Add animation class
    testimonialSlides[index].style.animation = 'slideInScale 0.6s ease-out';
}

function changeTestimonial(direction) {
    const totalSlides = testimonialSlides.length;
    let newIndex;
    
    if (direction === 1) {
        newIndex = (currentTestimonialIndex + 1) % totalSlides;
    } else {
        newIndex = (currentTestimonialIndex - 1 + totalSlides) % totalSlides;
    }
    
    showTestimonial(newIndex);
    resetAutoPlay();
}

function currentTestimonial(index) {
    showTestimonial(index - 1); // Convert to 0-based index
    resetAutoPlay();
}

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        changeTestimonial(1);
    }, 4000);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// Make functions global for onclick handlers
window.changeTestimonial = changeTestimonial;
window.currentTestimonial = currentTestimonial;

// Initialize testimonial carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTestimonialCarousel();
});

// Enhanced parallax and scroll effects
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const scrollDirection = scrolled > lastScrollTop ? 'down' : 'up';
    lastScrollTop = scrolled;
    
    // Enhanced parallax for hero elements
    const heroElements = document.querySelectorAll('.yogurt-product-img, .bean, .splash');
    heroElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform += ` translateY(${yPos * 0.1}px)`;
    });
    
    // Section reveal animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (scrolled > sectionTop - windowHeight + 100) {
            section.classList.add('section-visible');
        }
    });
});

// Enhanced Intersection Observer for Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Add staggered animation for child elements
            const children = entry.target.querySelectorAll('.feature-card, .testimonial-card, .step-card');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('animate');
                }, index * 150);
            });
        }
    });
}, observerOptions);

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Add animate-on-scroll class to elements
    const animateElements = document.querySelectorAll('.section-header, .features-grid, .testimonials-carousel, .steps-container, .footer-content');
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        animationObserver.observe(el);
    });
    
    // Initialize particle interactions
    initParticleInteractions();
    
    // Initialize advanced hover effects
    initAdvancedHoverEffects();
    
    // Initialize scroll-triggered effects
    initScrollEffects();
});

// Product Card Hover Effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced CTA Button Click Handlers
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        // Enhanced click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // WhatsApp integration
        const message = encodeURIComponent('Halo! Saya tertarik dengan Yogume. Bisa info lebih lanjut?');
        const whatsappUrl = `https://wa.me/6282139894273?text=${message}`;
        
        // Enhanced loading state
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menghubungkan...';
        this.style.background = 'linear-gradient(135deg, #BFFFC7, #6FBF73)';
        
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            this.innerHTML = originalText;
            this.style.background = '';
            ripple.remove();
        }, 1500);
    });
});

// Newsletter Form Handler
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('.newsletter-input');
    const submitBtn = this.querySelector('.btn-newsletter');
    const email = emailInput.value.trim();
    
    if (!email || !isValidEmail(email)) {
        showNotification('Mohon masukkan email yang valid!', 'error');
        return;
    }
    
    // Show loading state
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Terima kasih! Anda akan mendapatkan promo spesial via email.', 'success');
        emailInput.value = '';
        submitBtn.innerHTML = originalBtnContent;
        submitBtn.disabled = false;
    }, 1500);
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#c8e6c9' : type === 'error' ? '#ffcdd2' : '#d0f0fd'};
        color: #2c3e50;
        padding: 15px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 350px;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button handler
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Product order buttons
document.querySelectorAll('.btn-product').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        
        // Add to cart animation
        this.innerHTML = '<i class="fas fa-check"></i> Ditambahkan!';
        this.style.background = 'linear-gradient(135deg, #c8e6c9, #a5d6a7)';
        
        setTimeout(() => {
            this.innerHTML = 'Pesan';
            this.style.background = '';
        }, 2000);
        
        // Show notification
        showNotification(`${productName} berhasil ditambahkan ke keranjang!`, 'success');
        
        // Simulate add to cart (you can integrate with actual cart system)
        console.log(`Added to cart: ${productName} - ${productPrice}`);
    });
});

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #ffe4ec, #d0f0fd);
    border: none;
    border-radius: 50%;
    color: #2c3e50;
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    visibility: hidden;
    z-index: 1000;
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced loading animation
window.addEventListener('load', () => {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">Yogume</div>
            <div class="loading-spinner">
                <div class="spinner-dot"></div>
                <div class="spinner-dot"></div>
                <div class="spinner-dot"></div>
            </div>
            <div class="loading-text">Memuat kebaikan yogurt...</div>
        </div>
    `;
    
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #E5FFF1 0%, #FFFFFF 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Animate loading elements
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);
});

// Particle interaction system
function initParticleInteractions() {
    const particles = document.querySelectorAll('.particle');
    const beans = document.querySelectorAll('.bean');
    
    // Make particles interactive
    particles.forEach(particle => {
        particle.addEventListener('mouseenter', () => {
            particle.style.transform = 'scale(2)';
            particle.style.opacity = '1';
            particle.style.background = 'var(--accent-color)';
        });
        
        particle.addEventListener('mouseleave', () => {
            particle.style.transform = 'scale(1)';
            particle.style.opacity = '0.6';
            particle.style.background = 'var(--primary-color)';
        });
    });
    
    // Enhanced bean interactions
    beans.forEach(bean => {
        bean.addEventListener('click', () => {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(111, 191, 115, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                width: 50px;
                height: 50px;
                left: -25px;
                top: -7px;
            `;
            
            bean.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Advanced hover effects
function initAdvancedHoverEffects() {
    // Enhanced feature card effects
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(111, 191, 115, 0.3)';
            
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.animation = 'bounce 0.6s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow-soft)';
        });
    });
    
    // Enhanced testimonial card effects
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateY(5deg)';
            this.style.boxShadow = '0 25px 50px rgba(111, 191, 115, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg)';
            this.style.boxShadow = 'var(--shadow-soft)';
        });
    });
}

// Scroll-triggered effects
function initScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero elements
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${rate * 0.3}px)`;
        }
        
        // Floating particles parallax
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const speed = 0.2 + (index * 0.05);
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Navbar enhancement
        const navbar = document.querySelector('.navbar');
        if (scrolled > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Add dynamic styles for animations
const dynamicStyles = `
    .loading-screen .loading-content {
        text-align: center;
        color: var(--text-color);
    }
    
    .loading-logo {
        font-family: 'Poppins', sans-serif;
        font-size: 3rem;
        font-weight: 800;
        color: var(--primary-color);
        margin-bottom: 30px;
        animation: pulse 2s ease-in-out infinite;
    }
    
    .loading-spinner {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 20px;
    }
    
    .spinner-dot {
        width: 12px;
        height: 12px;
        background: var(--primary-color);
        border-radius: 50%;
        animation: bounce 1.4s ease-in-out infinite both;
    }
    
    .spinner-dot:nth-child(1) { animation-delay: -0.32s; }
    .spinner-dot:nth-child(2) { animation-delay: -0.16s; }
    
    .loading-text {
        font-size: 1.1rem;
        opacity: 0.8;
        animation: fadeInUp 1s ease-out;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .hero-title {
        overflow: visible !important;
    }
    
    .hero-title::after {
        display: none;
    }
`;

// Add dynamic styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// Add mouse trail effect
function initMouseTrail() {
    const trail = [];
    const trailLength = 20;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i / trailLength};
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    document.addEventListener('mousemove', (e) => {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
            }, index * 10);
        });
    });
}

// Initialize mouse trail on desktop only
if (window.innerWidth > 768) {
    initMouseTrail();
}
