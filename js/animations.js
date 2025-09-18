document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.animate');

    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
    });

    window.addEventListener('scroll', () => {
        elementsToAnimate.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.classList.add('slide-up');
            }
        });
    });
});