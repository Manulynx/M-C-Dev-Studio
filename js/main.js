document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Update copyright year
    const copyrightYear = document.querySelector('.footer-bottom p');
    if (copyrightYear) {
        const currentYear = new Date().getFullYear();
        copyrightYear.innerHTML = `&copy; ${currentYear} M&C Dev Studio. All rights reserved.`;
    }

    // Toggle mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        // Toggle menu on click
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent the click from bubbling to document
            navMenu.classList.toggle('active');
            
            // Add aria attributes for accessibility
            const expanded = navMenu.classList.contains('active') ? 'true' : 'false';
            menuToggle.setAttribute('aria-expanded', expanded);
        });
        
        // Close menu when clicking anywhere else on the page
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when escape key is pressed
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when clicking a nav item
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Project filter functionality if on projects page
    const filterButtons = document.querySelectorAll('.filter-button');
    const projects = document.querySelectorAll('.project-item');

    if (filterButtons.length > 0 && projects.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                projects.forEach(project => {
                    if (filterValue === 'all' || project.classList.contains(filterValue)) {
                        project.style.display = 'block';
                        setTimeout(() => {
                            project.classList.add('fade-in');
                        }, 100);
                    } else {
                        project.style.display = 'none';
                        project.classList.remove('fade-in');
                    }
                });
            });
        });
    }
    
    // Form validation if on contact page
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');
            
            if (nameInput && !nameInput.value.trim()) {
                isValid = false;
                nameInput.classList.add('error');
            } else if (nameInput) {
                nameInput.classList.remove('error');
            }
            
            if (emailInput && (!emailInput.value.trim() || !emailInput.value.includes('@'))) {
                isValid = false;
                emailInput.classList.add('error');
            } else if (emailInput) {
                emailInput.classList.remove('error');
            }
            
            if (messageInput && !messageInput.value.trim()) {
                isValid = false;
                messageInput.classList.add('error');
            } else if (messageInput) {
                messageInput.classList.remove('error');
            }
            
            if (isValid) {
                // In a real app, you'd submit the form data to a server
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Thanks for your message! We\'ll get back to you soon.';
                    contactForm.reset();
                    contactForm.appendChild(successMessage);
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }
    
    // Highlight active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});