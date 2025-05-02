/**
 * Testimonials carousel functionality
 */
export function initTestimonials() {
  const track = document.querySelector('.testimonial-track');
  const testimonials = document.querySelectorAll('.testimonial');
  const prevButton = document.querySelector('.testimonial-nav .prev');
  const nextButton = document.querySelector('.testimonial-nav .next');
  const dots = document.querySelectorAll('.testimonial-nav .dot');
  
  if (!track || testimonials.length === 0) return;
  
  let currentIndex = 0;
  const totalTestimonials = testimonials.length;
  
  // Set up the testimonial track width
  track.style.width = `${totalTestimonials * 100}%`;
  
  // Function to move to a specific testimonial
  const moveToTestimonial = (index) => {
    // Ensure index is within bounds
    if (index < 0) index = 0;
    if (index >= totalTestimonials) index = totalTestimonials - 1;
    
    currentIndex = index;
    
    // Move the track
    track.style.transform = `translateX(-${(100 / totalTestimonials) * currentIndex}%)`;
    
    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  };
  
  // Add click event for previous button
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      moveToTestimonial(currentIndex - 1);
    });
  }
  
  // Add click event for next button
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      moveToTestimonial(currentIndex + 1);
    });
  }
  
  // Add click events for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      moveToTestimonial(index);
    });
  });
  
  // Auto advance testimonials every 5 seconds
  let autoAdvance = setInterval(() => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= totalTestimonials) nextIndex = 0;
    moveToTestimonial(nextIndex);
  }, 5000);
  
  // Pause auto advance on hover
  track.addEventListener('mouseenter', () => {
    clearInterval(autoAdvance);
  });
  
  // Resume auto advance when mouse leaves
  track.addEventListener('mouseleave', () => {
    autoAdvance = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= totalTestimonials) nextIndex = 0;
      moveToTestimonial(nextIndex);
    }, 5000);
  });
  
  // Handle touch events for mobile swipe
  let touchStartX = 0;
  let touchEndX = 0;
  
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  const handleSwipe = () => {
    // Left swipe
    if (touchEndX < touchStartX - 50) {
      moveToTestimonial(currentIndex + 1);
    }
    // Right swipe
    if (touchEndX > touchStartX + 50) {
      moveToTestimonial(currentIndex - 1);
    }
  };
}