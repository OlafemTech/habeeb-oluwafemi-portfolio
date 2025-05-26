document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    const carouselIndicators = document.querySelectorAll('.carousel-indicator');
    
    let currentIndex = 0;
    const slideCount = carouselSlides.length;
    
    // Initialize carousel
    function updateCarousel() {
        // Update transform to show current slide
        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update indicators
        carouselIndicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
                indicator.style.backgroundColor = 'var(--primary-color, #3B82F6)';
                indicator.style.width = '10px';
            } else {
                indicator.classList.remove('active');
                indicator.style.backgroundColor = '';
                indicator.style.width = '8px';
            }
        });
    }
    
    // Event listeners for next and previous buttons
    carouselNext.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    });
    
    carouselPrev.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    });
    
    // Event listeners for indicators
    carouselIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Auto-advance carousel every 5 seconds
    let carouselInterval = setInterval(function() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }, 5000);
    
    // Pause auto-advance when hovering over carousel
    const carouselElement = document.querySelector('.carousel-container').parentElement;
    carouselElement.addEventListener('mouseenter', function() {
        clearInterval(carouselInterval);
    });
    
    carouselElement.addEventListener('mouseleave', function() {
        carouselInterval = setInterval(function() {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        }, 5000);
    });
    
    // Initialize the carousel
    updateCarousel();
    
    // Add animation classes to elements when they come into view
    const animatedElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-top, .slide-in-bottom');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});
