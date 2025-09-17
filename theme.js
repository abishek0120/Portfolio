document.addEventListener("DOMContentLoaded", () => {

    // --- Theme Switcher Logic ---
    const lightModeBtn = document.getElementById('light-mode-btn');
    const darkModeBtn = document.getElementById('dark-mode-btn');
    
    // Function to apply the theme and update active button
    const applyTheme = (theme) => {
        if (theme === 'dark-mode') {
            document.body.classList.replace('light-mode', 'dark-mode');
            darkModeBtn.classList.add('active');
            lightModeBtn.classList.remove('active');
        } else {
            document.body.classList.replace('dark-mode', 'light-mode');
            lightModeBtn.classList.add('active');
            darkModeBtn.classList.remove('active');
        }
        localStorage.setItem('theme', theme);
    };

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    applyTheme(savedTheme);

    // Add event listeners to buttons
    lightModeBtn.addEventListener('click', () => applyTheme('light-mode'));
    darkModeBtn.addEventListener('click', () => applyTheme('dark-mode'));


    // --- Omnitrix Navigation Logic ---
    const omniNav = document.getElementById('omni-nav');
    const omniTrigger = document.getElementById('omni-trigger');
    const omniLinks = document.querySelectorAll('#omni-menu a');

    if (omniTrigger) {
        omniTrigger.addEventListener('click', () => {
            omniNav.classList.toggle('active');
        });
    }

    omniLinks.forEach(link => {
        link.addEventListener('click', () => {
            omniNav.classList.remove('active');
        });
    });
    

    // --- Custom Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', function (e) {
        if (cursorDot && cursorOutline) {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: 'forwards' });
        }
    });


    // --- Skill Progress Animation Logic ---
    const skillsSection = document.querySelector('#skills');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillCircles = entry.target.querySelectorAll('.skill-circle');
                skillCircles.forEach(circle => {
                    animateSkillCircle(circle);
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    if (skillsSection) {
        observer.observe(skillsSection);
    }
});


function animateSkillCircle(circle) {
    const progressCircle = circle.querySelector('.skill-progress-circle');
    const percentSpan = circle.querySelector('.skill-percent');
    const targetSkillLevel = parseInt(circle.getAttribute('data-skill'), 10);
    
    if (!progressCircle || !percentSpan) return;

    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (targetSkillLevel / 100) * circumference;

    progressCircle.style.strokeDashoffset = offset;
    
    let currentPercent = 0;
    const interval = setInterval(() => {
        if (currentPercent >= targetSkillLevel) {
            clearInterval(interval);
            percentSpan.textContent = targetSkillLevel + '%';
        } else {
            currentPercent++;
            percentSpan.textContent = currentPercent + '%';
        }
    }, 20);
}


// --- Smooth Scrolling for Anchor Links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed headers
                behavior: 'smooth'
            });
        }
    });
});

//service_ns0rxln


document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form"); // give your form id="contact-form"

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill out all fields.");
      return;
    }

    // Send email using EmailJS
    emailjs.send("service_ns0rxln", "template_jidwt7l", {
        from_name: name,
        from_email: email,
        message: message
    })
    .then(() => {
        alert("Thank you! Your message has been sent.");
        form.reset();
    })
    .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Something went wrong. Please try again later.");
    });
  });
});



document.addEventListener("DOMContentLoaded", () => {

    // ... (your other scripts like theme switcher, omnitrix, etc. go here)

    // --- TYPING ANIMATION SCRIPT ---
    const typingTextSpan = document.querySelector(".typing-text");
    if (typingTextSpan) {
        const textArray = ["Python Developer", "Data Analyst", "Backend Developer", "Freelancer"];
        const typingDelay = 100; // Time in ms between each character typed
        const erasingDelay = 50; // Time in ms between each character erased
        const newTextDelay = 2000; // Time in ms to wait after a word is typed
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                typingTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                // Pause at end of word
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typingTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                // Move to next word
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 1100);
            }
        }

        // Initial call
        setTimeout(type, newTextDelay);
    }

});

//gallery
// --- GALLERY SLIDER & LIGHTBOX SCRIPT ---
document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.gallery-slider');
    if (!sliderContainer) return; // Exit if the slider is not on the page

    const slider = sliderContainer;
    const slides = document.querySelectorAll('.gallery-slide');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxContent = lightbox.querySelector('.lightbox-content');

    let currentIndex = 0;
    let slideInterval;
    const SLIDE_INTERVAL_TIME = 5000;
    const totalSlides = slides.length;

    // **FIX**: Correctly match the breakpoints from your CSS
    const getSlidesPerView = () => {
        if (window.innerWidth >= 1400) return 3;
        if (window.innerWidth >= 768) return 2; // Covers 768px to 1399px
        return 1;
    };
    
    // **FIX**: The main function to calculate movement in pixels
    function goToSlide(index) {
        if (slides.length === 0) return;

        const slidesPerView = getSlidesPerView();
        
        // Loop back to the start or end
        if (index > totalSlides - slidesPerView) {
            index = 0;
        }
        if (index < 0) {
            index = totalSlides - slidesPerView;
        }
        
        // Calculate movement based on actual element width and gap
        const slideWidth = slides[0].offsetWidth;
        const sliderGap = parseFloat(getComputedStyle(slider).gap);
        const totalMove = index * (slideWidth + sliderGap);

        slider.style.transform = `translateX(-${totalMove}px)`;
        currentIndex = index;
    }
    
    function showNextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    const startSlideInterval = () => {
        clearInterval(slideInterval); // Clear any existing interval
        slideInterval = setInterval(showNextSlide, SLIDE_INTERVAL_TIME);
    };
    
    nextBtn.addEventListener('click', () => {
        showNextSlide();
        startSlideInterval();
    });

    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        startSlideInterval();
    });
    
    // Lightbox Logic
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const type = item.getAttribute('data-type');
            const src = item.getAttribute('data-src');
            
            lightboxContent.innerHTML = '<button class="lightbox-close">&times;</button>';

            if (type === 'image') {
                const img = document.createElement('img');
                img.src = src;
                lightboxContent.appendChild(img);
            } else if (type === 'video') {
                const video = document.createElement('video');
                video.src = src;
                video.controls = true;
                video.autoplay = true;
                lightboxContent.appendChild(video);
            }

            lightbox.classList.add('show');
            clearInterval(slideInterval);
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('show');
        lightboxContent.innerHTML = ''; // Clear content to stop videos
        startSlideInterval();
    };
    
    lightbox.addEventListener('click', (e) => {
        // Close if clicking on the background or the close button itself
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            closeLightbox();
        }
    });

    // Recalculate on resize to keep it aligned
    window.addEventListener('resize', () => goToSlide(currentIndex));

    // Initial setup
    goToSlide(0);
    startSlideInterval();
});

//qoutes