// Suppress Yoshki SRA badge errors in the console
window.addEventListener('error', function (e) {
    if (e.message && e.message.includes('hideYoshkiPopups')) {
        e.preventDefault();
        return false;
    }
});

// Toggle menu icon between closed and open
const menuIcon = document.getElementById('menu-icon');
const sideMenu = document.getElementById('side-menu');
let menuOpen = false;

function setMenuState(open) {
    menuOpen = open;
    menuIcon.src = menuOpen ? 'Assets/Icons/MenuOpen.svg' : 'Assets/Icons/MenuClosed.svg';
    menuIcon.alt = menuOpen ? 'Menu Open' : 'Menu Closed';
    if (menuOpen) {
        sideMenu.classList.add('open');
    } else {
        sideMenu.classList.remove('open');
    }
}

menuIcon.addEventListener('click', () => {
    setMenuState(!menuOpen);
});

// Optional: close menu if user clicks outside the menu (desktop only)
document.addEventListener('click', (e) => {
    if (menuOpen && !sideMenu.contains(e.target) && e.target !== menuIcon) {
        setMenuState(false);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const contactIcon = document.getElementById('contact-icon');
    if (contactIcon) {
        contactIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            if (contactIcon.src.includes('ContactIconClosed.svg')) {
                contactIcon.src = 'Assets/Icons/ContactIconOpen.svg';
                contactIcon.style.width = '400px';
                contactIcon.style.height = '100px';
            } else {
                contactIcon.src = 'Assets/Icons/ContactIconClosed.svg';
                contactIcon.style.width = '90px';
                contactIcon.style.height = '90px';
            }
        });
    }
    // Animate hero text
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        setTimeout(() => {
            heroText.classList.add('visible');
        }, 200); // slight delay for effect
    }

    // Scroll to next section on down arrow click
    const scrollDownBtn = document.getElementById('scroll-down-btn');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            const nextSection = document.querySelector('.next-section');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // --- TESTIMONIALS EFFECTS ---
    // Typewriter effect for all testimonials
    function runTypewriter(id) {
        const el = document.getElementById(id);
        if (!el) return;
        const fullText = el.textContent;
        el.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < fullText.length) {
                el.textContent += fullText.charAt(i);
                i++;
                setTimeout(typeWriter, 18);
            } else {
                el.classList.add('finished');
            }
        }
        setTimeout(typeWriter, 400);
    }
    runTypewriter('testimonial-typewriter-1');
    setTimeout(() => runTypewriter('testimonial-typewriter-2'), 800);
    setTimeout(() => runTypewriter('testimonial-typewriter-3'), 1600);

    // Spotlight effect for all testimonial cards
    document.querySelectorAll('.spotlight-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
        card.addEventListener('mouseleave', function() {
            card.style.setProperty('--x', '50%');
            card.style.setProperty('--y', '50%');
        });
    });

    // --- EXPERTISE OVERLAYS ---
    const expertiseButtons = document.querySelectorAll('.expertise-btn[data-overlay]');
    const overlays = document.querySelectorAll('.expertise-overlay');

    function closeAllOverlays() {
        overlays.forEach(overlay => overlay.classList.remove('active'));
        document.body.style.overflow = '';
    }

    expertiseButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            closeAllOverlays();
            const overlayId = 'overlay-' + btn.getAttribute('data-overlay');
            const overlay = document.getElementById(overlayId);
            if (overlay) {
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    overlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeAllOverlays();
            }
        });
        const closeBtn = overlay.querySelector('.expertise-overlay-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                closeAllOverlays();
            });
        }
    });

    // Scroll to Expertise section when a footer service link is clicked
    const footerServiceLinks = document.querySelectorAll('.footer-service-link');
    const expertiseSection = document.querySelector('.Expertise-Section');
    if (footerServiceLinks && expertiseSection) {
      footerServiceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          expertiseSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    }

    // --- TESTIMONIALS OVERLAY CAROUSEL ---
    const testimonials = [
      {
        text: "If any client were to come to me and say that they were facing an investigation by the Serious Fraud Office or the National Crime Agency or anyone else, the first and only number I would give them would be the number for Ewing Law. There is no one better; as far as I’m concerned, they are the fourth emergency service’",
        author: "KEITH BISHOP, KEITH BISHOP ASSOCIATES PR"
      },
      {
        text: "I have represented high-profile sportsmen and women for my entire professional career. Unfortunately that high-profile can sometimes attract trouble, and when it does I always recommend Scott Ewing and his team at Ewing Law. Over the years they have represented some of the biggest names in Sport, and I have never known any lawyer than consistently performs at such a level.’",
        author: "RICHARD MAYNARD, MAYNARD COMMUNICATIONS"
      },
      {
        text: "In the security industry legal complications are inevitable, whether for our employees or for our clients. When they arise we turn to Ewing Law. There is no one better when it comes to solving a problem quickly and with the least amount of fuss.’",
        author: "NOBLE SECURITY"
      }
    ];

    let testimonialIndex = 0;
    const testimonialsOverlay = document.getElementById('testimonials-overlay');
    const testimonialsMoreBtn = document.getElementById('testimonials-more-btn');
    const testimonialsOverlayClose = document.getElementById('testimonials-overlay-close');
    const testimonialCarouselSlide = document.getElementById('testimonial-carousel-slide');
    const testimonialCarouselPrev = document.getElementById('testimonial-carousel-prev');
    const testimonialCarouselNext = document.getElementById('testimonial-carousel-next');

    function renderTestimonial(index) {
      const t = testimonials[index];
      testimonialCarouselSlide.innerHTML = `
        <div class="testimonial-carousel-quote">“</div>
        <div class="testimonial-carousel-text">${t.text}</div>
        <div class="testimonial-carousel-author">${t.author}</div>
      `;
    }

    function openTestimonialsOverlay() {
      testimonialsOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      renderTestimonial(testimonialIndex);
    }
    function closeTestimonialsOverlay() {
      testimonialsOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (testimonialsMoreBtn && testimonialsOverlay && testimonialsOverlayClose) {
      testimonialsMoreBtn.addEventListener('click', openTestimonialsOverlay);
      testimonialsOverlayClose.addEventListener('click', closeTestimonialsOverlay);
      testimonialsOverlay.addEventListener('click', function(e) {
        if (e.target === testimonialsOverlay) closeTestimonialsOverlay();
      });
    }
    if (testimonialCarouselPrev && testimonialCarouselNext) {
      testimonialCarouselPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
        renderTestimonial(testimonialIndex);
      });
      testimonialCarouselNext.addEventListener('click', function(e) {
        e.stopPropagation();
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        renderTestimonial(testimonialIndex);
      });
    }
});
