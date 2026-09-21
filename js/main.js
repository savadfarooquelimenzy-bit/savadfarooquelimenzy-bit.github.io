document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.main-header');

    // Add shadow to header on scroll for a sleek effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Logic
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');

    if (mobileMenuBtn && mobileNavOverlay) {
        // Open menu
        mobileMenuBtn.addEventListener('click', () => {
            mobileNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        // Close menu
        mobileCloseBtn.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });

        // Close menu when a link is clicked
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Services Carousel Logic
    const carousel = document.getElementById('servicesCarousel');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const servicesHeader = document.querySelector('.services-header');

    if (carousel && btnPrev && btnNext && servicesHeader) {


        // Scroll amount is card width + gap (450 + 24)
        const scrollAmount = 474; 

        btnNext.addEventListener('click', () => {
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        btnPrev.addEventListener('click', () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }
});


