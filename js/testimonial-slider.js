document.addEventListener('DOMContentLoaded', function() {
    // Initialize testimonial slider
    initTestimonialSlider();
    
    function initTestimonialSlider() {
        const testimonialContainer = document.querySelector('.testimonial-slider-container');
        const testimonials = document.querySelectorAll('.testimonial-slide');
        const dotsContainer = document.querySelector('.testimonial-dots');
        const prevButton = document.querySelector('.testimonial-prev');
        const nextButton = document.querySelector('.testimonial-next');
        
        if (!testimonialContainer || testimonials.length === 0) return;
        
        let currentIndex = 0;
        let autoSlideInterval;
        const autoSlideDelay = 5000; // 5 seconds between slides
        
        // Create dots for each testimonial
        testimonials.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        // Set up event listeners for controls
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
                resetAutoSlide();
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
                resetAutoSlide();
            });
        }
        
        // Initialize touch swipe functionality
        let touchStartX = 0;
        let touchEndX = 0;
        
        testimonialContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        testimonialContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            resetAutoSlide();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe left, go to next slide
                goToSlide(currentIndex + 1);
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Swipe right, go to previous slide
                goToSlide(currentIndex - 1);
            }
        }
        
        // Function to go to a specific slide
        function goToSlide(index) {
            // Handle wrapping around at the ends
            if (index < 0) {
                index = testimonials.length - 1;
            } else if (index >= testimonials.length) {
                index = 0;
            }
            
            // Update current index
            currentIndex = index;
            
            // Update the transform to show the current slide
            testimonialContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update active dot
            document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
            
            // Update ARIA attributes for accessibility
            testimonials.forEach((testimonial, i) => {
                testimonial.setAttribute('aria-hidden', i !== currentIndex);
            });
        }
        
        // Auto-slide functionality
        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, autoSlideDelay);
        }
        
        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }
        
        // Initialize auto-slide
        startAutoSlide();
        
        // Pause auto-slide when user hovers over the slider
        testimonialContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        testimonialContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (isElementInViewport(testimonialContainer)) {
                if (e.key === 'ArrowLeft') {
                    goToSlide(currentIndex - 1);
                    resetAutoSlide();
                } else if (e.key === 'ArrowRight') {
                    goToSlide(currentIndex + 1);
                    resetAutoSlide();
                }
            }
        });
        
        // Helper function to check if element is in viewport
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Initialize with first slide active
        goToSlide(0);
        
        // Add resize handler to maintain correct positioning
        window.addEventListener('resize', () => {
            goToSlide(currentIndex);
        });
    }
});
