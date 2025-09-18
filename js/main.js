document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Toggle mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Project filter functionality
    const filterButtons = document.querySelectorAll('.filter-button');
    const projects = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            projects.forEach(project => {
                if (filterValue === 'all' || project.classList.contains(filterValue)) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
});