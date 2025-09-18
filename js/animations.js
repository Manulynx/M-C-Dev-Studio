document.addEventListener('DOMContentLoaded', function() {
    // Initial animations
    const initialElements = document.querySelectorAll('.hero-content, .hero-image');
    initialElements.forEach(element => {
        setTimeout(() => {
            element.classList.add('fade-in');
        }, 300);
    });
    
    // Scroll animations
    const elementsToAnimate = document.querySelectorAll('.animate:not(.fade-in):not(.slide-in-left):not(.slide-in-right)');
    
    // Function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Initial check for elements in viewport
    function checkAnimations() {
        elementsToAnimate.forEach(element => {
            if (isElementInViewport(element)) {
                if (element.classList.contains('service-card')) {
                    setTimeout(() => {
                        element.classList.add('slide-up');
                    }, 200 * Array.from(element.parentNode.children).indexOf(element));
                } else {
                    element.classList.add('fade-in');
                }
            }
        });
    }
    
    // Check animations on scroll
    window.addEventListener('scroll', checkAnimations);
    
    // Initial check for animations
    setTimeout(checkAnimations, 100);
    
    // Handle testimonial slider if present
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        const testimonials = testimonialSlider.querySelectorAll('.testimonial-card');
        let currentIndex = 0;
        
        function showNextTestimonial() {
            testimonials.forEach(testimonial => testimonial.style.display = 'none');
            currentIndex = (currentIndex + 1) % testimonials.length;
            testimonials[currentIndex].style.display = 'block';
            testimonials[currentIndex].classList.add('fade-in');
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