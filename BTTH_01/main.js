document.addEventListener("DOMContentLoaded", () => {
    const progressBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                progressBar.style.width = progressBar.getAttribute('data-width');
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
});