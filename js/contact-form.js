// Initialize EmailJS with your User ID
(function() {
    // Initialize EmailJS with your public key
    emailjs.init("Aq5Oa2-Ck9eBvFRMG");
})();

// Contact form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate form
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
        
        // Prepare template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        };
        
        // Send email using EmailJS
        emailjs.send('dservice_walcaq5', 'template_8opdwen', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                showNotification('Failed to send message. Please try again later.', 'error');
            })
            .finally(function() {
                // Reset button state
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            });
    });
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Function to show notification
    function showNotification(message, type) {
        // Create notification element if it doesn't exist
        let notification = document.getElementById('form-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'form-notification';
            notification.className = 'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-y-full opacity-0';
            document.body.appendChild(notification);
        }
        
        // Set notification style based on type
        if (type === 'success') {
            notification.className = 'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg transform transition-all duration-300 bg-green-500 text-white';
        } else {
            notification.className = 'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg transform transition-all duration-300 bg-red-500 text-white';
        }
        
        // Set notification content
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} mr-2"></i>
                <p>${message}</p>
            </div>
        `;
        
        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 100);
        
        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateY(full)';
            notification.style.opacity = '0';
            
            // Remove notification after animation
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
});
