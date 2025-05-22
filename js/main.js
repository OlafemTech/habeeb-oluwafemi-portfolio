// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize headline animations
    initializeHeadlineEffects();
    
    // Initialize letter shooting animation
    initializeLetterShootingAnimation();
    
    // Initialize service cards animations and interactions
    initializeServiceCards();
    
    // Typing effect for the hero section with SEO-focused phrases
    const typingText = document.getElementById('typing-text');
    const phrases = [
        'Building SEO-optimized frontends with powerful backends.',
        'Turning ideas into interactive & accessible experiences.',
        'Creating responsive websites with modern frameworks.',
        'Solving complex problems with clean, semantic code.',
        'Specializing in TailwindCSS, React & JavaScript.',
        'Optimizing websites for speed, SEO & conversions.'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next phrase
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start the typing effect
    setTimeout(typeEffect, 1000);
    
    // Initialize service cards animations and interactions
    initializeServiceCards();
    
    // Initialize headline animations and effects
    function initializeHeadlineEffects() {
        // Animate the headline underline on page load
        setTimeout(() => {
            const headlineUnderline = document.querySelector('.headline-underline');
            if (headlineUnderline) {
                headlineUnderline.style.transform = 'scaleX(1)';
            }
            
            // Add gradient animation to specific elements
            const nameSpan = document.querySelector('.headline-text span.relative.inline-block');
            if (nameSpan) {
                nameSpan.classList.add('text-gradient-animate');
            }
        }, 500);
        
        // Add hover effects to skill tags
        const skillTags = document.querySelectorAll('.headline-container .inline-block');
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
        
        // Add structured data for SEO
        addStructuredData();
    }
    
    // Add structured data for SEO
    function addStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Habeeb Oluwafemi",
            "jobTitle": "Frontend Developer & Full-Stack Problem Solver",
            "url": window.location.href,
            "sameAs": [
                "https://github.com/OlafemTech",
                "https://www.linkedin.com/in/habeeb-oluwafemi-0b1999bb/",
                "https://x.com/femi_ultim8",
                "https://www.instagram.com/habeeb_femi_/"
            ],
            "knowsAbout": ["HTML5", "TailwindCSS", "JavaScript", "React", "SEO", "Frontend Development", "Full-Stack Development"],
            "email": "habeeboluwafemi27@gmail.com"
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }
    
    // Letter shooting animation function
    function initializeLetterShootingAnimation() {
        const nameElement = document.getElementById('animated-name');
        
        if (!nameElement) {
            console.warn('Name element not found for animation');
            return;
        }
        
        // Store the original name text
        const nameText = nameElement.textContent;
        nameElement.innerHTML = '';
        
        // Create spans for each character with staggered delays for repeating animation
        for (let i = 0; i < nameText.length; i++) {
            const charSpan = document.createElement('span');
            charSpan.textContent = nameText[i];
            charSpan.className = 'letter';
            
            // Calculate delay - staggered for initial appearance and offset for repeating
            // This creates a wave-like effect in the repeating animation
            const initialDelay = i * 0.07; // Initial staggered delay
            const repeatOffset = i * 0.1; // Additional offset for the repeating cycle
            charSpan.style.animationDelay = `${initialDelay}s`;
            
            // Add a slight variation to animation duration to create more organic movement
            const durationVariation = 0.9 + (Math.random() * 0.2); // Between 0.9 and 1.1
            charSpan.style.animationDuration = `${4 * durationVariation}s`;
            
            nameElement.appendChild(charSpan);
        }
        
        // Function to animate the letters
        function animateLetters() {
            const letters = nameElement.querySelectorAll('.letter');
            letters.forEach(letter => {
                letter.classList.add('animate');
            });
        }
        
        // Set up intersection observer to trigger animation when in view
        const nameObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateLetters, 300); // Slight delay for better effect
                    nameObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        nameObserver.observe(nameElement);
        
        // Also trigger animation on page load
        setTimeout(animateLetters, 800);
    }
    
    
    // Initialize service cards animations and interactions
    function initializeServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        if (serviceCards.length === 0) {
            console.warn('No service cards found on the page');
            return;
        }
        
        // Set up hover effects for each service card
        serviceCards.forEach(card => {
            const frontSide = card.querySelector('.service-card-front');
            const backSide = card.querySelector('.service-card-back');
            const learnMoreBtn = card.querySelector('.service-card-front .text-primary, .service-card-front .text-secondary, .service-card-front .text-accent');
            
            if (!frontSide || !backSide) {
                console.warn('Service card is missing front or back elements');
                return;
            }
            
            // Hover effect
            card.addEventListener('mouseenter', function() {
                frontSide.style.transform = 'translateY(-100%)';
                frontSide.style.opacity = '0';
                backSide.style.transform = 'translateY(0)';
                backSide.style.opacity = '1';
                backSide.style.visibility = 'visible';
            });
            
            card.addEventListener('mouseleave', function() {
                frontSide.style.transform = 'translateY(0)';
                frontSide.style.opacity = '1';
                backSide.style.transform = 'translateY(20px)';
                backSide.style.opacity = '0';
                backSide.style.visibility = 'hidden';
            });
            
            // Click effect for learn more
            if (learnMoreBtn) {
                learnMoreBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    frontSide.style.transform = 'translateY(-100%)';
                    frontSide.style.opacity = '0';
                    backSide.style.transform = 'translateY(0)';
                    backSide.style.opacity = '1';
                    backSide.style.visibility = 'visible';
                });
            }
        });
        
        // Initialize service tabs
        initializeServiceTabs();
        
        // Set up scroll animations for service cards
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            const servicesObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cards = entry.target.querySelectorAll('.service-card:not(.hidden)');
                        cards.forEach((card, index) => {
                            // Add different animation classes based on position
                            setTimeout(() => {
                                if (index % 3 === 0) {
                                    card.classList.add('animate-slide-in-left');
                                } else if (index % 3 === 1) {
                                    card.classList.add('animate-fade-in-up');
                                } else {
                                    card.classList.add('animate-slide-in-right');
                                }
                            }, index * 150); // Stagger the animations
                        });
                        servicesObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            servicesObserver.observe(servicesSection);
        }
    }
    
    // Initialize service tabs functionality
    function initializeServiceTabs() {
        const tabButtons = document.querySelectorAll('.service-tab-btn');
        const serviceCards = document.querySelectorAll('.service-card');
        
        if (tabButtons.length === 0 || serviceCards.length === 0) {
            console.warn('Service tabs or cards not found');
            return;
        }
        
        // Function to filter service cards based on category
        function filterServices(category) {
            serviceCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                    // Add a slight delay for a staggered appearance
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, Math.random() * 300);
                } else {
                    card.classList.add('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                }
            });
        }
        
        // Add click event listeners to tab buttons
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.remove('bg-primary/10', 'dark:bg-primary/20', 'text-primary');
                    btn.classList.add('bg-white', 'dark:bg-gray-900', 'text-gray-700', 'dark:text-gray-300');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                this.classList.remove('bg-white', 'dark:bg-gray-900', 'text-gray-700', 'dark:text-gray-300');
                this.classList.add('bg-primary/10', 'dark:bg-primary/20', 'text-primary');
                
                // Filter services based on category
                const category = this.getAttribute('data-category');
                filterServices(category);
            });
        });
        
        // Initialize with 'all' category selected
        filterServices('all');
    }
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or use user's system preference
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    
    themeToggle.addEventListener('click', function() {
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('shadow-md');
            navbar.classList.add('py-2');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.remove('shadow-md');
            navbar.classList.add('py-4');
            navbar.classList.remove('py-2');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Project filtering and pagination
    const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsContainer = document.getElementById('projects-container');
    const paginationNumbers = document.getElementById('pagination-numbers');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    
    // Pagination settings
    const projectsPerPage = 3;
    let currentPage = 1;
    let filteredProjects = [...projectCards];
    
    // Initialize pagination
    function initPagination() {
        updateFilteredProjects();
        setupPaginationNumbers();
        displayProjects();
        updatePaginationButtons();
        setupVideoHover();
    }
    
    // Setup video functionality
    function setupVideoHover() {
        // Videos now autoplay with the autoplay attribute
        // This function is kept for potential future enhancements
        // No hover functionality needed as videos play automatically
    }
    
    // Update filtered projects based on current filter
    function updateFilteredProjects() {
        const activeFilter = document.querySelector('.project-filter-btn.active');
        const filterValue = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
        
        filteredProjects = [...projectCards].filter(card => {
            return filterValue === 'all' || card.getAttribute('data-category') === filterValue;
        });
    }
    
    // Set up pagination number buttons
    function setupPaginationNumbers() {
        paginationNumbers.innerHTML = '';
        const pageCount = Math.ceil(filteredProjects.length / projectsPerPage);
        
        for (let i = 1; i <= pageCount; i++) {
            const numberButton = document.createElement('button');
            numberButton.className = `pagination-number ${i === currentPage ? 'active' : ''}`;
            numberButton.textContent = i;
            numberButton.setAttribute('aria-label', `Page ${i}`);
            numberButton.setAttribute('title', `Page ${i}`);
            
            numberButton.addEventListener('click', () => {
                currentPage = i;
                displayProjects();
                updatePaginationNumbers();
                updatePaginationButtons();
            });
            
            paginationNumbers.appendChild(numberButton);
        }
    }
    
    // Update active state of pagination number buttons
    function updatePaginationNumbers() {
        const paginationBtns = document.querySelectorAll('.pagination-number');
        paginationBtns.forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.textContent) === currentPage);
        });
    }
    
    // Update disabled state of prev/next buttons
    function updatePaginationButtons() {
        const pageCount = Math.ceil(filteredProjects.length / projectsPerPage);
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === pageCount;
    }
    
    // Display current page of projects
    function displayProjects() {
        projectCards.forEach(card => {
            card.classList.remove('visible');
        });
        
        const startIndex = (currentPage - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        const currentPageProjects = filteredProjects.slice(startIndex, endIndex);
        
        currentPageProjects.forEach(project => {
            project.classList.add('visible');
        });
    }
    
    // Event listeners for prev/next buttons
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayProjects();
            updatePaginationNumbers();
            updatePaginationButtons();
        }
    });
    
    nextPageBtn.addEventListener('click', () => {
        const pageCount = Math.ceil(filteredProjects.length / projectsPerPage);
        if (currentPage < pageCount) {
            currentPage++;
            displayProjects();
            updatePaginationNumbers();
            updatePaginationButtons();
        }
    });
    
    // Project filtering
    projectFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            projectFilterBtns.forEach(btn => btn.classList.remove('active', 'bg-primary', 'text-white'));
            btn.classList.add('active', 'bg-primary', 'text-white');
            
            // Reset to first page when filter changes
            currentPage = 1;
            updateFilteredProjects();
            setupPaginationNumbers();
            displayProjects();
            updatePaginationButtons();
        });
    });
    
    // Initialize pagination on load
    initPagination();
    
    // Project details modal functionality
    const projectDetailsButtons = document.querySelectorAll('.project-details-btn');
    const projectModal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.getElementById('close-modal');
    
    // Project details data (in a real project, this might come from a database or API)
    const projectDetails = {
        'E-commerce Platform': {
            description: 'A comprehensive e-commerce solution with a responsive design and seamless checkout experience.',
            challenge: 'The main challenge was implementing a secure and intuitive checkout process while maintaining performance with a large product catalog.',
            solution: 'I built a custom shopping cart system with optimized database queries and implemented lazy loading for product images to improve performance.',
            technologies: ['HTML5', 'TailwindCSS', 'JavaScript', 'PHP', 'MySQL'],
            features: ['Responsive product grid', 'Advanced filtering', 'Secure checkout', 'Admin dashboard', 'Order tracking'],
            codeSnippet: `// Example code for product filtering
const filterProducts = (category) => {
  return products.filter(product => {
    return category === 'all' || product.category === category;
  });
};

// Render filtered products
const renderProducts = (filteredProducts) => {
  productContainer.innerHTML = '';
  filteredProducts.forEach(product => {
    // Render product card
  });
};`
        },
        'Task Management App': {
            description: 'A full-stack task management application with user authentication and real-time updates.',
            challenge: 'Implementing real-time updates across multiple devices while maintaining data integrity was the primary challenge.',
            solution: 'I used WebSockets for real-time communication and implemented a robust state management system to ensure data consistency.',
            technologies: ['JavaScript', 'PHP', 'MySQL', 'WebSockets'],
            features: ['Drag-and-drop interface', 'Task prioritization', 'Deadline notifications', 'Team collaboration', 'File attachments'],
            codeSnippet: `// Example WebSocket implementation for real-time updates
const socket = new WebSocket('wss://example.com/socket');

socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'task_update') {
    updateTaskInUI(data.task);
  }
});

function updateTaskInUI(task) {
  // Update the task in the UI
  const taskElement = document.getElementById(\`task-\${task.id}\`);
  // Update task properties
}`
        },
        'Analytics Dashboard': {
            description: 'A data visualization dashboard with real-time analytics and customizable reports.',
            challenge: 'Processing and visualizing large datasets efficiently while providing an intuitive user interface.',
            solution: 'I implemented data aggregation on the server side and used efficient charting libraries with canvas rendering for smooth performance.',
            technologies: ['Python', 'MySQL', 'JavaScript', 'Chart.js', 'REST API'],
            features: ['Interactive charts', 'Custom report generation', 'Data export', 'User role management', 'Automated insights'],
            codeSnippet: `# Python backend for data aggregation
def aggregate_data(start_date, end_date, metrics):
    """Aggregate data based on specified parameters"""
    query = """SELECT 
        date_trunc('day', timestamp) as day,
        SUM(value) as total
    FROM metrics
    WHERE timestamp BETWEEN %s AND %s
        AND metric_name = %s
    GROUP BY day
    ORDER BY day"""
    
    results = db.execute_query(query, [start_date, end_date, metrics])
    return format_for_chart(results)`
        }
    };
    
    projectDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            const projectImage = projectCard.querySelector('img').src;
            
            if (projectDetails[projectTitle]) {
                const details = projectDetails[projectTitle];
                
                // Set modal title
                modalTitle.textContent = projectTitle;
                
                // Build modal content
                modalContent.innerHTML = `
                    <img src="${projectImage}" alt="${projectTitle}" class="w-full h-64 object-cover rounded-lg">
                    
                    <div class="mt-6">
                        <h4 class="text-xl font-bold mb-2">Project Overview</h4>
                        <p class="text-gray-600 dark:text-gray-400">${details.description}</p>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="text-xl font-bold mb-2">Challenge</h4>
                            <p class="text-gray-600 dark:text-gray-400">${details.challenge}</p>
                        </div>
                        <div>
                            <h4 class="text-xl font-bold mb-2">Solution</h4>
                            <p class="text-gray-600 dark:text-gray-400">${details.solution}</p>
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="text-xl font-bold mb-2">Technologies Used</h4>
                        <div class="flex flex-wrap gap-2">
                            ${details.technologies.map(tech => 
                                `<span class="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm">${tech}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="text-xl font-bold mb-2">Key Features</h4>
                        <ul class="list-disc pl-5 text-gray-600 dark:text-gray-400">
                            ${details.features.map(feature => 
                                `<li>${feature}</li>`
                            ).join('')}
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="text-xl font-bold mb-2">Code Snippet</h4>
                        <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>${details.codeSnippet}</code></pre>
                    </div>
                `;
                
                // Show modal
                projectModal.classList.remove('invisible', 'opacity-0');
                document.body.classList.add('overflow-hidden');
            }
        });
    });
    
    // Close modal functionality
    closeModal.addEventListener('click', function() {
        projectModal.classList.add('opacity-0');
        setTimeout(() => {
            projectModal.classList.add('invisible');
            document.body.classList.remove('overflow-hidden');
        }, 300);
    });
    
    // Close modal when clicking outside
    projectModal.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            closeModal.click();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !projectModal.classList.contains('invisible')) {
            closeModal.click();
        }
    });
    
    // Form validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            // Simple validation
            if (!nameInput.value.trim()) {
                isValid = false;
                nameInput.classList.add('border-red-500');
            } else {
                nameInput.classList.remove('border-red-500');
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                isValid = false;
                emailInput.classList.add('border-red-500');
            } else {
                emailInput.classList.remove('border-red-500');
            }
            
            if (!messageInput.value.trim()) {
                isValid = false;
                messageInput.classList.add('border-red-500');
            } else {
                messageInput.classList.remove('border-red-500');
            }
            
            if (isValid) {
                // Simulate form submission
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
                submitButton.disabled = true;
                
                setTimeout(function() {
                    submitButton.innerHTML = '<i class="fas fa-check mr-2"></i> Message Sent!';
                    submitButton.classList.remove('bg-primary');
                    submitButton.classList.add('bg-green-500');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(function() {
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                        submitButton.classList.add('bg-primary');
                        submitButton.classList.remove('bg-green-500');
                    }, 3000);
                }, 2000);
            }
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Animation for floating elements
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Set random animation duration between 3-6s
        const duration = Math.random() * 3 + 3;
        // Set random delay so they don't all move together
        const delay = Math.random() * 2;
        
        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
    
    // Animation for code snippets
    const codeSnippets = document.querySelectorAll('.code-snippet');
    
    codeSnippets.forEach((snippet, index) => {
        // Set random animation duration between 10-15s
        const duration = Math.random() * 5 + 10;
        // Set random delay so they don't all move together
        const delay = Math.random() * 3;
        
        snippet.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
    
    // Add CSS animation for floating effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translate(0, 0); }
            50% { transform: translate(0, -20px); }
            100% { transform: translate(0, 0); }
        }
    `;
    document.head.appendChild(style);
    
    // Scroll to top button functionality
    const scrollToTopButton = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.remove('opacity-0', 'invisible');
            scrollToTopButton.classList.add('opacity-100');
        } else {
            scrollToTopButton.classList.add('opacity-0');
            scrollToTopButton.classList.remove('opacity-100');
            // Add a small delay before making it invisible to allow for the opacity transition
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    scrollToTopButton.classList.add('invisible');
                }
            }, 300);
        }
    });
    
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress fixed top-0 left-0 h-1 bg-primary z-50';
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        scrollProgress.style.width = scrollPercent + '%';
    });
    
    // Terminal typing effect
    const terminalCommand = document.getElementById('terminal-command');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalCursor = document.querySelector('.terminal-cursor');
    
    // Terminal commands and responses
    const terminalSequence = [
        {
            command: 'whoami',
            output: 'Habeeb Oluwafemi | Frontend Developer & Full-Stack Problem Solver'
        },
        {
            command: 'cat skills.txt',
            output: 'HTML5, CSS3/TailwindCSS, JavaScript, PHP, MySQL, Python, Git, RESTful APIs'
        },
        {
            command: 'ls -la projects/',
            output: 'drwxr-xr-x  e-commerce-platform\ndrwxr-xr-x  task-management-app\ndrwxr-xr-x  analytics-dashboard'
        },
        {
            command: 'cat contact.txt',
            output: 'Email: habeeboluwafemi27@gmail.com\nPhone: +234 813 101 7099\nGitHub: github.com/OlafemTech'
        },
        {
            command: 'cat about.md',
            output: 'Passionate developer with a keen eye for detail and a love for clean, efficient code. Specializing in creating responsive, user-friendly web applications with modern technologies.'
        }
    ];
    
    let currentCommandIndex = 0;
    let currentCharIndex = 0;
    let isTypingCommand = true;
    let isWaitingAfterCommand = false;
    let isTypingOutput = false;
    let currentOutputLines = [];
    let currentOutputLineIndex = 0;
    let currentOutputCharIndex = 0;
    
    function typeTerminal() {
        // Blink cursor
        setInterval(() => {
            terminalCursor.style.opacity = terminalCursor.style.opacity === '0' ? '1' : '0';
        }, 500);
        
        // Start typing sequence
        typeNextCharacter();
    }
    
    function typeNextCharacter() {
        const currentSequence = terminalSequence[currentCommandIndex];
        
        if (isTypingCommand) {
            // Typing command
            if (currentCharIndex < currentSequence.command.length) {
                terminalCommand.textContent += currentSequence.command.charAt(currentCharIndex);
                currentCharIndex++;
                setTimeout(typeNextCharacter, Math.random() * 50 + 50);
            } else {
                isTypingCommand = false;
                isWaitingAfterCommand = true;
                setTimeout(typeNextCharacter, 500); // Wait after command is typed
            }
        } else if (isWaitingAfterCommand) {
            isWaitingAfterCommand = false;
            isTypingOutput = true;
            currentOutputLines = currentSequence.output.split('\n');
            currentOutputLineIndex = 0;
            currentOutputCharIndex = 0;
            
            // Create a new output element
            const outputElement = document.createElement('div');
            outputElement.className = 'terminal-output-line';
            terminalOutput.appendChild(outputElement);
            
            setTimeout(typeNextCharacter, 300);
        } else if (isTypingOutput) {
            const currentLine = currentOutputLines[currentOutputLineIndex];
            const outputElements = document.querySelectorAll('.terminal-output-line');
            const currentOutputElement = outputElements[outputElements.length - 1];
            
            if (currentOutputCharIndex < currentLine.length) {
                currentOutputElement.textContent += currentLine.charAt(currentOutputCharIndex);
                currentOutputCharIndex++;
                setTimeout(typeNextCharacter, Math.random() * 10 + 10); // Faster typing for output
            } else {
                currentOutputLineIndex++;
                currentOutputCharIndex = 0;
                
                if (currentOutputLineIndex < currentOutputLines.length) {
                    // Create a new output element for the next line
                    const newOutputElement = document.createElement('div');
                    newOutputElement.className = 'terminal-output-line';
                    terminalOutput.appendChild(newOutputElement);
                    setTimeout(typeNextCharacter, 100);
                } else {
                    // Move to next command
                    currentCommandIndex++;
                    
                    if (currentCommandIndex < terminalSequence.length) {
                        isTypingCommand = true;
                        isTypingOutput = false;
                        currentCharIndex = 0;
                        terminalCommand.textContent = '';
                        setTimeout(typeNextCharacter, 1000); // Wait before typing next command
                    }
                }
            }
        }
    }
    
    // Start terminal typing effect when the about section is in view
    const aboutSection = document.getElementById('about');
    
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !terminalCommand.dataset.started) {
                terminalCommand.dataset.started = 'true';
                typeTerminal();
            }
        });
    }, { threshold: 0.3 });
    
    aboutObserver.observe(aboutSection);
    
    // Timeline horizontal scroll functionality
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    const timelineContainer = document.querySelector('.overflow-x-auto');
    
    if (scrollLeftBtn && scrollRightBtn && timelineContainer) {
        // Scroll amount for each click (in pixels)
        const scrollAmount = 300;
        
        scrollLeftBtn.addEventListener('click', function() {
            timelineContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        scrollRightBtn.addEventListener('click', function() {
            timelineContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Show/hide scroll buttons based on scroll position
        timelineContainer.addEventListener('scroll', function() {
            // Check if we can scroll left
            if (timelineContainer.scrollLeft > 0) {
                scrollLeftBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            } else {
                scrollLeftBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }
            
            // Check if we can scroll right
            if (timelineContainer.scrollLeft + timelineContainer.clientWidth < timelineContainer.scrollWidth) {
                scrollRightBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            } else {
                scrollRightBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }
        });
        
        // Trigger initial scroll check
        timelineContainer.dispatchEvent(new Event('scroll'));
    }
    
    // Services section toggle functionality and animations
    function initializeServicesSection() {
        const moreServicesBtn = document.getElementById('more-services-btn');
        const additionalServices = document.getElementById('additional-services');
        const servicesSection = document.getElementById('services');
        
        if (moreServicesBtn && additionalServices) {
            // Smooth toggle animation for additional services
            moreServicesBtn.addEventListener('click', function() {
                const isHidden = additionalServices.classList.contains('hidden');
                
                if (isHidden) {
                    // Show additional services with animation
                    additionalServices.classList.remove('hidden');
                    additionalServices.classList.add('grid');
                    additionalServices.style.maxHeight = '0';
                    additionalServices.style.opacity = '0';
                    
                    // Trigger reflow to ensure animation works
                    void additionalServices.offsetWidth;
                    
                    // Animate in
                    additionalServices.style.transition = 'max-height 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
                    additionalServices.style.maxHeight = '2000px'; // Large enough value
                    additionalServices.style.opacity = '1';
                    
                    // Update button
                    moreServicesBtn.innerHTML = 'View Less Services <i class="fas fa-chevron-up ml-2"></i>';
                    moreServicesBtn.classList.add('active');
                    
                    // Scroll to the additional services section
                    setTimeout(() => {
                        additionalServices.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        
                        // Trigger animations for additional service cards
                        const additionalCards = additionalServices.querySelectorAll('.service-card');
                        additionalCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('in-view');
                            }, index * 100);
                        });
                    }, 100);
                } else {
                    // Hide additional services with animation
                    additionalServices.style.maxHeight = '0';
                    additionalServices.style.opacity = '0';
                    
                    // Update button
                    moreServicesBtn.innerHTML = 'View More Services <i class="fas fa-chevron-down ml-2"></i>';
                    moreServicesBtn.classList.remove('active');
                    
                    // Remove from DOM after animation completes
                    setTimeout(() => {
                        additionalServices.classList.add('hidden');
                        additionalServices.classList.remove('grid');
                        additionalServices.style.maxHeight = '';
                        additionalServices.style.opacity = '';
                        
                        // Reset animations
                        const additionalCards = additionalServices.querySelectorAll('.service-card');
                        additionalCards.forEach(card => {
                            card.classList.remove('in-view');
                        });
                    }, 800);
                }
            });
            
            // Add scroll-triggered animations to service cards
            const serviceCards = document.querySelectorAll('.service-card');
            
            const serviceObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add in-view class to trigger the appropriate animation
                        entry.target.classList.add('in-view');
                        
                        // Keep observing to handle when section comes back into view
                        if (!entry.target.dataset.animated) {
                            entry.target.dataset.animated = 'true';
                        } else {
                            // If already animated once, use a different animation when coming back into view
                            entry.target.classList.remove('in-view');
                            setTimeout(() => {
                                entry.target.classList.add('in-view');
                            }, 50);
                        }
                    } else if (entry.target.dataset.animated) {
                        // When scrolling away, prepare for re-animation when scrolling back
                        entry.target.classList.remove('in-view');
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });
            
            serviceCards.forEach(card => {
                serviceObserver.observe(card);
            });
            
            // Add hover effect enhancement
            serviceCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    // Add subtle scale effect to siblings
                    serviceCards.forEach(sibling => {
                        if (sibling !== card) {
                            sibling.style.transform = 'scale(0.98)';
                            sibling.style.opacity = '0.8';
                        }
                    });
                });
                
                card.addEventListener('mouseleave', function() {
                    // Reset siblings
                    serviceCards.forEach(sibling => {
                        if (sibling !== card) {
                            sibling.style.transform = '';
                            sibling.style.opacity = '';
                        }
                    });
                });
            });
        }
    }
    
    // Initialize all sections
    initializeTypingEffect();
    initializeScrollToTop();
    initializeProjectModals();
    initializeDarkMode();
    initializeScrollProgress();
    initializeTimeline();
    initializeGitHubActivity();
    initializeServicesSection();
});
