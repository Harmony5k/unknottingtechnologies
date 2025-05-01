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
                top: targetElement.offsetTop - 80, // Account for fixed header
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

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Project Card Hover Effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const info = card.querySelector('.project-info');
        info.style.transform = 'translateY(0)';
    });
    
    card.addEventListener('mouseleave', () => {
        const info = card.querySelector('.project-info');
        info.style.transform = 'translateY(100%)';
    });
});
// Testimonial Slider Functionality
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');
let currentIndex = 0;

function showTestimonial(index) {
    // Hide all testimonials
    testimonialCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show selected testimonial
    testimonialCards[index].classList.add('active');
    dots[index].classList.add('active');
    currentIndex = index;
}

function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonialCards.length;
    showTestimonial(currentIndex);
}

function prevTestimonial() {
    currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentIndex);
}

// Event Listeners
nextBtn.addEventListener('click', nextTestimonial);
prevBtn.addEventListener('click', prevTestimonial);

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        showTestimonial(index);
    });
});

// Auto-rotate testimonials (optional)
let testimonialInterval = setInterval(nextTestimonial, 5000);

// Pause auto-rotation when hovering over testimonials
const testimonialSlider = document.querySelector('.testimonial-slider');
testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});

testimonialSlider.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(nextTestimonial, 5000);
});

// Video Background Handling
document.addEventListener('DOMContentLoaded', function() {
    const videoHero = document.querySelector('.video-hero');
    
    if (videoHero) {
      const video = videoHero.querySelector('video');
      
      // Ensure video plays on mobile (with user gesture)
      const playVideo = () => {
        if (video.paused) {
          video.play().catch(e => {
            console.log('Video autoplay prevented:', e);
            // Show fallback image if video can't play
            video.style.display = 'none';
            const fallback = videoHero.querySelector('img');
            if (fallback) fallback.style.display = 'block';
          });
        }
      };
      
      // Try to play immediately (will work on desktop)
      playVideo();
      
      // For mobile, play on first user interaction
      document.body.addEventListener('click', function firstInteraction() {
        playVideo();
        document.body.removeEventListener('click', firstInteraction);
      }, { once: true });
      
      // Fallback for browsers that don't support video
      if (!video.canPlayType) {
        video.style.display = 'none';
        const fallback = videoHero.querySelector('img');
        if (fallback) fallback.style.display = 'block';
      }
      
      // Adjust overlay opacity based on scroll
      window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const overlay = videoHero.querySelector('.video-overlay');
        
        if (scrollPosition < videoHero.offsetHeight) {
          const opacity = 0.5 + (scrollPosition / videoHero.offsetHeight * 0.3);
          overlay.style.opacity = opacity;
        }
      });
    }
  });