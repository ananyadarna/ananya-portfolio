// Import necessary modules
import { initNavigation } from './modules/navigation.js';
import { initAnimations } from './modules/animations.js';
import { initTestimonials } from './modules/testimonials.js';
import { initFormValidation } from './modules/form.js';
import { initScrollSpy } from './modules/scrollSpy.js';

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize navigation
  initNavigation();
  
  // Initialize animations
  initAnimations();
  
  // Initialize testimonials carousel
  initTestimonials();
  
  // Initialize form validation
  initFormValidation();
  
  // Initialize scroll spy
  initScrollSpy();
  
  // Initialize back to top button
  initBackToTop();
});

// Back to top button functionality
function initBackToTop() {
  const backToTopButton = document.querySelector('.back-to-top');
  
  // Show/hide the button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  // Scroll to top when clicked
  backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}