// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navbar = document.querySelector('.navbar');

mobileMenuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    mobileMenuBtn.innerHTML = navbar.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 100, // Account for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Service Card Animation
const serviceDetails = document.querySelectorAll('.service-detail');

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

serviceDetails.forEach(service => {
    service.style.opacity = 0;
    service.style.transform = 'translateY(50px)';
    service.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    serviceObserver.observe(service);
});

// Highlight current service when navigating from homepage
document.addEventListener('DOMContentLoaded', function() {
    const hash = window.location.hash;
    if (hash) {
        const targetService = document.querySelector(hash);
        if (targetService) {
            setTimeout(() => {
                targetService.scrollIntoView({ behavior: 'smooth' });
                targetService.style.boxShadow = '0 0 0 3px rgba(255, 102, 0, 0.3)';
                setTimeout(() => {
                    targetService.style.boxShadow = 'none';
                }, 3000);
            }, 500);
        }
    }
});