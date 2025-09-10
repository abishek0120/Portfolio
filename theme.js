        // Dark/Light Mode Toggle
        const toggleSwitch = document.querySelector('#checkbox');
        const currentTheme = localStorage.getItem('theme') || 'light-mode';
        
        if (currentTheme) {
            document.body.classList.add(currentTheme);
            if (currentTheme === 'dark-mode') {
                toggleSwitch.checked = true;
            }
        }
        
        function switchTheme(e) {
            if (e.target.checked) {
                document.body.classList.replace('light-mode', 'dark-mode');
                localStorage.setItem('theme', 'dark-mode');
            } else {
                document.body.classList.replace('dark-mode', 'light-mode');
                localStorage.setItem('theme', 'light-mode');
            }    
        }
        
        toggleSwitch.addEventListener('change', switchTheme, false);
        
        // Custom Cursor
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        window.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: 'forwards' });
        });
        
        // Skill Progress Animation
document.addEventListener("DOMContentLoaded", () => {
    const skillsSection = document.querySelector('#skills');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillCircles = entry.target.querySelectorAll('.skill-circle');
                skillCircles.forEach(circle => {
                    animateSkillCircle(circle);
                });
                // Stop observing after the animation has run once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the section is visible
    });

    if (skillsSection) {
        observer.observe(skillsSection);
    }
});

function animateSkillCircle(circle) {
    const progressCircle = circle.querySelector('.skill-progress-circle');
    const percentSpan = circle.querySelector('.skill-percent');
    const targetSkillLevel = parseInt(circle.getAttribute('data-skill'), 10);
    
    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    // Calculate the final offset
    const offset = circumference - (targetSkillLevel / 100) * circumference;

    // Set the transition
    progressCircle.style.strokeDashoffset = offset;
    
    // Animate the percentage text
    let currentPercent = 0;
    const interval = setInterval(() => {
        if (currentPercent >= targetSkillLevel) {
            clearInterval(interval);
            percentSpan.textContent = targetSkillLevel + '%';
        } else {
            currentPercent++;
            percentSpan.textContent = currentPercent + '%';
        }
    }, 20); // Adjust timing for faster/slower count
}
        
        // Initialize animations when page loads
        window.addEventListener('load', function() {
            animateSkills();
            
            // Add smooth scrolling to all links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });
        
        // Navbar background on scroll
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                navbar.style.padding = '10px 0';
            } else {
                navbar.style.boxShadow = 'none';
                navbar.style.padding = '15px 0';
            }
        });

        //omnitrix
        document.addEventListener("DOMContentLoaded", () => {
    const omniNav = document.getElementById('omni-nav');
    const omniTrigger = document.getElementById('omni-trigger');
    const omniLinks = document.querySelectorAll('#omni-menu a');

    // Toggle the menu on trigger click
    if (omniTrigger) {
        omniTrigger.addEventListener('click', () => {
            omniNav.classList.toggle('active');
        });
    }

    // Close the menu when a link is clicked (for single-page navigation)
    omniLinks.forEach(link => {
        link.addEventListener('click', () => {
            omniNav.classList.remove('active');
        });
    });
});

