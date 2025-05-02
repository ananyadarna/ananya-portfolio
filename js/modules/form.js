/**
 * Form validation and submission handling
 */
export function initFormValidation() {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) return;
  
  // Validate email format
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  // Display error message
  const showError = (input, message) => {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    
    // Check if error message already exists
    let errorMessage = formGroup.querySelector('.error-message');
    if (!errorMessage) {
      errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      formGroup.appendChild(errorMessage);
    }
    
    errorMessage.textContent = message;
  };
  
  // Remove error message
  const removeError = (input) => {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
      formGroup.removeChild(errorMessage);
    }
  };
  
  // Validate form fields
  const validateField = (input) => {
    // Remove any existing error
    removeError(input);
    
    // Check if empty
    if (input.value.trim() === '') {
      showError(input, 'This field is required');
      return false;
    }
    
    // Check email format
    if (input.type === 'email' && !isValidEmail(input.value)) {
      showError(input, 'Please enter a valid email address');
      return false;
    }
    
    return true;
  };
  
  // Add event listeners for real-time validation
  const formInputs = contactForm.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });
    
    input.addEventListener('input', () => {
      if (input.parentElement.classList.contains('error')) {
        validateField(input);
      }
    });
  });
  
  // Handle form submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate all fields
    formInputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    
    // If form is valid, simulate submission
    if (isValid) {
      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.innerHTML = '<span class="loader"></span> Sending...';
      submitButton.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i><div>Thank you! Your message has been sent successfully.</div>';
        
        // Insert message before the form
        contactForm.parentElement.insertBefore(successMessage, contactForm);
        
        // Reset button
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
        
        // Remove success message after a delay
        setTimeout(() => {
          if (successMessage.parentElement) {
            successMessage.parentElement.removeChild(successMessage);
          }
        }, 5000);
      }, 1500);
    }
  });
}