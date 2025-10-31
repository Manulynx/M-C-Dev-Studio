document.addEventListener('DOMContentLoaded', function() {
    // MENÚ MÓVIL - IMPLEMENTACIÓN SIMPLIFICADA
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        // Método simplificado para mostrar/ocultar menú
        menuToggle.addEventListener('click', function() {
            console.log('Menu toggle clicked'); // Para debugging
            navMenu.classList.toggle('active');
        });
    }
    
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

function initMobileNav() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });
}

function initDynamicYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function initLazyImages() {
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  if ('loading' in HTMLImageElement.prototype) return; // nativo
  // Fallback simple
  imgs.forEach(img => {
    const src = img.getAttribute('src');
    if (src) {
      const i = new Image();
      i.src = src;
      i.onload = () => { img.src = src; };
    }
  });
}

function initSmoothNavCta() {
  const cta = document.querySelector('.nav-cta .cta-button[href^="#"]');
  if (!cta) return;
  cta.addEventListener('click', (e) => {
    const id = cta.getAttribute('href');
    const target = id ? document.querySelector(id) : null;
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initDynamicYear();
  initLazyImages();
  initSmoothNavCta();
});