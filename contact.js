// Contact Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Validate Name
        const nameField = document.getElementById('name');
        if (!nameField.value.trim()) {
          showError(nameField, 'Please enter your name');
          isValid = false;
        } else {
          clearError(nameField);
        }
        
        // Validate Email
        const emailField = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailField.value.trim()) {
          showError(emailField, 'Please enter your email');
          isValid = false;
        } else if (!emailRegex.test(emailField.value)) {
          showError(emailField, 'Please enter a valid email');
          isValid = false;
        } else {
          clearError(emailField);
        }
        
        // Validate Message
        const messageField = document.getElementById('message');
        if (!messageField.value.trim()) {
          showError(messageField, 'Please enter your message');
          isValid = false;
        } else {
          clearError(messageField);
        }
        
        if (!isValid) {
          e.preventDefault();
        }
      });
      
      function showError(field, message) {
        const formGroup = field.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
          errorElement = document.createElement('p');
          errorElement.className = 'error-message';
          errorElement.style.color = 'red';
          errorElement.style.marginTop = '5px';
          errorElement.style.fontSize = '0.9rem';
          formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        field.style.borderColor = 'red';
      }
      
      function clearError(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
          errorElement.remove();
        }
        
        field.style.borderColor = '#ddd';
      }
    }
    
    // Map Interaction
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
      mapContainer.addEventListener('mouseenter', function() {
        this.style.cursor = 'grab';
      });
      
      mapContainer.addEventListener('mousedown', function() {
        this.style.cursor = 'grabbing';
      });
      
      mapContainer.addEventListener('mouseup', function() {
        this.style.cursor = 'grab';
      });
      
      mapContainer.addEventListener('mouseleave', function() {
        this.style.cursor = 'default';
      });
    }
  });