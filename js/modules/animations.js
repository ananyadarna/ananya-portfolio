/**
 * Handle animations and scrolling effects
 */
export function initAnimations() {
  // Initialize animate on scroll functionality
  const animatedElements = document.querySelectorAll('[data-aos]');
  
  // Function to check if element is in viewport
  const isInViewport = (element, offset = 150) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight - offset || document.documentElement.clientHeight - offset) &&
      rect.bottom >= 0
    );
  };
  
  // Initial check for elements in viewport
  const checkAnimations = () => {
    animatedElements.forEach(element => {
      if (isInViewport(element)) {
        element.classList.add('aos-animate');
      }
    });
  };
  
  // Check animations on scroll
  window.addEventListener('scroll', checkAnimations);
  
  // Check animations on page load
  checkAnimations();
  
  // Initialize skill bars animation
  const initSkillBars = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-width');
      
      // Animate progress bar when it comes into view
      const animateProgressBar = () => {
        if (isInViewport(bar, 100) && !bar.classList.contains('animated')) {
          bar.style.width = targetWidth + '%';
          bar.classList.add('animated');
        }
      };
      
      // Check on scroll
      window.addEventListener('scroll', animateProgressBar);
      
      // Initial check
      animateProgressBar();
    });
  };
  
  // Initialize skill bars if they exist
  initSkillBars();
  
  // Type writing effect for hero heading
  const initTypeWritingEffect = () => {
    const heroHeading = document.querySelector('#hero h1 span');
    
    if (heroHeading) {
      const text = heroHeading.textContent;
      heroHeading.textContent = '';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          heroHeading.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };
      
      // Start typing effect after a short delay
      setTimeout(typeWriter, 500);
    }
  };
  
  // Initialize typing effect
  initTypeWritingEffect();
}