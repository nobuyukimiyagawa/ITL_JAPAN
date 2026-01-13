document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');

            // Animate hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            if (nav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg)';
                spans[0].style.top = '11px';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg)';
                spans[2].style.bottom = '11px';
            } else {
                spans[0].style.transform = 'none';
                spans[0].style.top = '0';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                spans[2].style.bottom = '0';
            }
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            nav.classList.remove('active'); // Close menu on click

            // Reset hamburger icon
            if (menuToggle) {
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[0].style.top = '0';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                spans[2].style.bottom = '0';
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Effect for Header
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        // Trigger after scrolling past 80% of the viewport height (Hero section)
        if (window.scrollY > window.innerHeight * 0.8) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // Hero Video Slider
    const heroVideos = document.querySelectorAll('.hero-video');
    if (heroVideos.length > 0) {
        let currentVideoIndex = 0;

        setInterval(() => {
            // Remove active class from current
            heroVideos[currentVideoIndex].classList.remove('active');

            // Calculate next index
            currentVideoIndex = (currentVideoIndex + 1) % heroVideos.length;

            // Add active class to next
            heroVideos[currentVideoIndex].classList.add('active');
        }, 7000); // Switch every 7 seconds
    }
});
