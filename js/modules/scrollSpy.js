/**
 * Scroll spy functionality to highlight active navigation items
 */
export function initScrollSpy() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  if (!sections.length || !navLinks.length) return;
  
  // Get current section based on scroll position
  const getCurrentSection = () => {
    // Get header height for offset
    const headerHeight = document.getElementById('header').offsetHeight;
    
    // Add a small offset to improve accuracy
    const scrollPosition = window.scrollY + headerHeight + 20;
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionTop = section.offsetTop;
      
      if (scrollPosition >= sectionTop) {
        return section.id;
      }
    }
    
    // Default to first section if none found
    return sections[0].id;
  };
  
  // Update active navigation item
  const updateActiveNavItem = () => {
    const currentSection = getCurrentSection();
    
    navLinks.forEach(link => {
      // Get section id from href attribute
      const linkHref = link.getAttribute('href').substring(1);
      
      // Clear active class for all links
      link.classList.remove('active');
      
      // Add active class if link matches current section
      if (linkHref === currentSection) {
        link.classList.add('active');
      }
    });
  };
  
  // Check active section on scroll
  window.addEventListener('scroll', updateActiveNavItem);
  
  // Check active section on page load
  updateActiveNavItem();
}