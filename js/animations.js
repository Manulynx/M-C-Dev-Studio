document.addEventListener('DOMContentLoaded', function() {
    // Initial animations
    const initialElements = document.querySelectorAll('.hero-content, .hero-image');
    initialElements.forEach(element => {
        setTimeout(() => {
            element.classList.add('fade-in');
        }, 300);
    });
    
    // Track animated elements to prevent re-animation
    const animatedElements = new Set();
    
    // Add data-aos attributes to elements for animation
    const addAOSAttributes = () => {
        // Team section elements
        document.querySelectorAll('.section-title').forEach(el => {
            if (!el.hasAttribute('data-aos')) el.setAttribute('data-aos', 'fade-up');
        });
        
        document.querySelectorAll('.team-member').forEach((el, index) => {
            if (!el.hasAttribute('data-aos')) {
                el.setAttribute('data-aos', 'fade-up');
                el.setAttribute('data-aos-delay', index * 100);
            }
        });
        
        document.querySelectorAll('.value-item').forEach((el, index) => {
            if (!el.hasAttribute('data-aos')) {
                el.setAttribute('data-aos', 'fade-up');
                el.setAttribute('data-aos-delay', index * 100);
            }
        });
    };
    
    // Call function to add attributes
    addAOSAttributes();
    
    // Scroll animations - optimized to prevent flicker
    const elementsToAnimate = document.querySelectorAll('.animate:not(.fade-in):not(.slide-in-left):not(.slide-in-right), [data-aos]');
    
    // Function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Throttle scroll events to improve performance
    let scrollTimeout;
    
    // Initial check for elements in viewport
    function checkAnimations() {
        elementsToAnimate.forEach(element => {
            // Skip if already animated
            if (animatedElements.has(element)) return;
            
            if (isElementInViewport(element)) {
                animatedElements.add(element); // Mark as animated
                
                if (element.classList.contains('service-card')) {
                    const delay = 100 * Array.from(element.parentNode.children).indexOf(element);
                    setTimeout(() => {
                        element.classList.add('slide-up');
                    }, delay);
                } else if (element.hasAttribute('data-aos')) {
                    const delay = element.getAttribute('data-aos-delay') || 0;
                    setTimeout(() => {
                        element.classList.add('fade-in');
                    }, delay);
                } else {
                    element.classList.add('fade-in');
                }
            }
        });
    }
    
    // Optimized scroll handler
    function handleScroll() {
        if (scrollTimeout) return;
        
        scrollTimeout = setTimeout(() => {
            checkAnimations();
            scrollTimeout = null;
        }, 16); // ~60fps
    }
    
    // Check animations on scroll with throttling
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check for animations
    setTimeout(checkAnimations, 100);
    
    // Handle testimonial slider if present
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        const testimonials = testimonialSlider.querySelectorAll('.testimonial-card');
        let currentIndex = 0;
        
        function showNextTestimonial() {
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
                testimonial.classList.remove('fade-in');
            });
            currentIndex = (currentIndex + 1) % testimonials.length;
            testimonials[currentIndex].style.display = 'block';
            setTimeout(() => {
                testimonials[currentIndex].classList.add('fade-in');
            }, 50);
        }
        
        // Show first testimonial
        if (testimonials.length > 0) {
            testimonials.forEach(testimonial => testimonial.style.display = 'none');
            testimonials[0].style.display = 'block';
            testimonials[0].classList.add('fade-in');
            
            // If more than one testimonial, start rotation
            if (testimonials.length > 1) {
                setInterval(showNextTestimonial, 5000);
            }
        }
    }
});