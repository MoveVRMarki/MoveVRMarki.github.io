document.addEventListener('DOMContentLoaded', function () {
    console.log('MoveVR Profile loaded');
    // Handle preloader
    implementPreloader();
    // Smooth scrolling for navigation links
    implementSmoothScrolling();
    // Implement parallax effect on header
    implementParallaxEffect();
    // Highlight active navigation based on scroll position
    implementScrollSpy();
    // Add animation to cards on scroll
    implementScrollAnimations();
    // Add hover effects for VR elements
    implementHoverEffects();
    // Track booking button clicks
    trackBookingButtonClicks();
    // Add nav shrink effect on scroll
    implementNavShrink();
    // Add particle background effect
    implementParticleBackground();
    // Add text typing effect
    implementTypingEffect();
    // Implement back to top button
    implementBackToTop();
    // Implement counter animation
    implementCounterAnimation();
    // Animate skill bars
    animateSkillBars();
    // Add special highlight for Games tab
    implementGamesTabHighlight();
});
// Handle preloader
function implementPreloader() {
    var preloader = document.querySelector('.preloader');
    if (!preloader)
        return;
    // Hide preloader after page loadss
    window.addEventListener('load', function () {
        setTimeout(function () {
            preloader.classList.add('hidden');
            // Remove preloader from DOM after animation completes
            setTimeout(function () {
                preloader.style.display = 'none';
            }, 500);
        }, 1000); // Show preloader for at least 1 second
    });
}
function implementSmoothScrolling() {
    var _a;
    var navLinks = document.querySelectorAll('.nav-links a');
    var navHeight = ((_a = document.querySelector('.vr-nav')) === null || _a === void 0 ? void 0 : _a.clientHeight) || 80;
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = e.currentTarget.getAttribute('href') || '';
            if (targetId.charAt(0) === '#') {
                var targetElement = document.querySelector(targetId);
                if (targetElement) {
                    var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: targetPosition - navHeight,
                        behavior: 'smooth'
                    });
                    // Update URL without page reload
                    history.pushState(null, '', targetId);
                    // Update active state in navigation
                    navLinks.forEach(function (navLink) { return navLink.classList.remove('active'); });
                    e.currentTarget.classList.add('active');
                }
            }
        });
    });
}
function implementParallaxEffect() {
    var header = document.querySelector('.vr-header');
    var profileImage = document.querySelector('.profile-image');
    var profileInfo = document.querySelector('.profile-info');
    window.addEventListener('scroll', function () {
        if (header) {
            var scrollPosition = window.pageYOffset;
            // Parallax for background
            header.style.backgroundPositionY = "".concat(scrollPosition * 0.5, "px");
            // Parallax for profile elements
            if (scrollPosition < window.innerHeight) {
                var translateY = scrollPosition * 0.3;
                var opacity = 1 - (scrollPosition / (window.innerHeight * 0.8));
                if (profileImage) {
                    profileImage.style.transform = "translateY(".concat(translateY * 0.5, "px)");
                    profileImage.style.opacity = Math.max(0.2, opacity).toString();
                }
                if (profileInfo) {
                    profileInfo.style.transform = "translateY(".concat(translateY * 0.7, "px)");
                    profileInfo.style.opacity = Math.max(0.2, opacity).toString();
                }
            }
        }
    });
}
function implementScrollSpy() {
    var sections = document.querySelectorAll('.vr-section, .vr-header');
    var navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', function () {
        var current = '';
        sections.forEach(function (section) {
            var sectionElement = section;
            var sectionTop = sectionElement.offsetTop - 100;
            var sectionHeight = sectionElement.clientHeight;
            if (window.pageYOffset >= sectionTop) {
                current = sectionElement.getAttribute('id') || '';
            }
        });
        navLinks.forEach(function (link) {
            link.classList.remove('active');
            var href = link.getAttribute('href');
            if (href && href.substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}
function implementScrollAnimations() {
    // Initialize animation for elements when they come into view
    var animatedElements = document.querySelectorAll('.card, .about-content, .contact-container, .equipment-content, .section-title, .stats');
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            var _a;
            if (entry.isIntersecting) {
                // Add different animations based on element type
                if (entry.target.classList.contains('card')) {
                    var cards = ((_a = entry.target.parentElement) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.card')) || [];
                    Array.prototype.slice.call(cards).forEach(function (card, index) {
                        setTimeout(function () {
                            card.classList.add('fade-in-up');
                        }, index * 150); // Staggered animation
                    });
                }
                else if (entry.target.classList.contains('section-title')) {
                    entry.target.classList.add('fade-in-down');
                }
                else if (entry.target.classList.contains('stats')) {
                    var stats = entry.target.querySelectorAll('.stat');
                    Array.prototype.slice.call(stats).forEach(function (stat, index) {
                        setTimeout(function () {
                            stat.classList.add('fade-in-right');
                        }, index * 200); // Staggered animation
                    });
                }
                else {
                    entry.target.classList.add('fade-in');
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    animatedElements.forEach(function (element) {
        // Remove default animation to control via JS
        element.classList.remove('fadeIn');
        observer.observe(element);
    });
    // Add CSS for various animations if not already defined
    var style = document.createElement('style');
    style.textContent = "\n        .fade-in {\n            animation: fadeIn 1s ease forwards;\n        }\n        .fade-in-up {\n            opacity: 0;\n            transform: translateY(40px);\n            animation: fadeInUp 0.8s ease forwards;\n        }\n        .fade-in-down {\n            opacity: 0;\n            transform: translateY(-30px);\n            animation: fadeInDown 0.8s ease forwards;\n        }\n        .fade-in-right {\n            opacity: 0;\n            transform: translateX(-30px);\n            animation: fadeInRight 0.8s ease forwards;\n        }\n        @keyframes fadeInUp {\n            to {\n                opacity: 1;\n                transform: translateY(0);\n            }\n        }\n        @keyframes fadeInDown {\n            to {\n                opacity: 1;\n                transform: translateY(0);\n            }\n        }\n        @keyframes fadeInRight {\n            to {\n                opacity: 1;\n                transform: translateX(0);\n            }\n        }\n    ";
    document.head.appendChild(style);
}
function implementHoverEffects() {
    // Add 3D tilt effect to cards on hover
    var cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var mouseEvent = e;
            var cardElement = card;
            var rect = cardElement.getBoundingClientRect();
            var x = mouseEvent.clientX - rect.left;
            var y = mouseEvent.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var angleX = (y - centerY) / 10;
            var angleY = (centerX - x) / 10;
            // Add glare effect
            var glareX = (x / rect.width) * 100;
            var glareY = (y / rect.height) * 100;
            cardElement.style.transform = "perspective(1000px) rotateX(".concat(angleX, "deg) rotateY(").concat(angleY, "deg) translateZ(10px)");
            // Update or create glare element
            var glare = cardElement.querySelector('.card-glare');
            if (!glare) {
                glare = document.createElement('div');
                glare.className = 'card-glare';
                cardElement.appendChild(glare);
            }
            glare.style.background = "radial-gradient(circle at ".concat(glareX, "% ").concat(glareY, "%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)");
        });
        card.addEventListener('mouseleave', function () {
            var cardElement = card;
            cardElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            cardElement.style.transition = 'transform 0.5s ease';
            // Remove glare
            var glare = cardElement.querySelector('.card-glare');
            if (glare) {
                glare.style.background = 'none';
            }
        });
    });
    // Add hover effect to equipment images
    var equipmentImages = document.querySelectorAll('.equipment-image');
    equipmentImages.forEach(function (image) {
        image.addEventListener('mouseenter', function () {
            var caption = image.querySelector('.image-caption');
            if (caption) {
                caption.style.transform = 'translateY(0)';
                caption.style.opacity = '1';
            }
        });
        image.addEventListener('mouseleave', function () {
            var caption = image.querySelector('.image-caption');
            if (caption) {
                caption.style.transform = 'translateY(100%)';
                caption.style.opacity = '0';
            }
        });
    });
    // Add CSS for glare and caption effects
    var style = document.createElement('style');
    style.textContent = "\n        .card {\n            position: relative;\n            overflow: hidden;\n        }\n        .card-glare {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            pointer-events: none;\n            z-index: 2;\n        }\n        .image-caption {\n            transform: translateY(100%);\n            opacity: 0;\n            transition: all 0.3s ease;\n        }\n    ";
    document.head.appendChild(style);
}
function trackBookingButtonClicks() {
    var bookingButtons = document.querySelectorAll('#booking-btn, #booking-btn-footer');
    bookingButtons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            console.log('Booking button clicked - redirecting to booksy.pl');
            // Optional: Add fancy transition effect before redirect
            var btnElement = e.currentTarget;
            btnElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Przekierowuję...';
            // You could add analytics tracking here in a real application
            // Redirect happens via the href attribute in the anchor tag
        });
    });
}
// Add mobile navigation toggle functionality for responsive design
document.addEventListener('DOMContentLoaded', function () {
    // Create mobile menu button
    var nav = document.querySelector('.vr-nav');
    var mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    nav.appendChild(mobileMenuBtn);
    // Add menu toggle functionality
    var navLinks = document.querySelector('.nav-links');
    mobileMenuBtn.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        // Toggle between hamburger and close icon
        var icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                mobileMenuBtn.classList.add('active');
            }
            else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
    // Close menu when clicking on a link
    var menuLinks = navLinks.querySelectorAll('a');
    menuLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
                var icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                mobileMenuBtn.classList.remove('active');
            }
        });
    });
    // Add mobile menu styles
    var style = document.createElement('style');
    style.textContent = "\n        .mobile-menu-btn {\n            display: none;\n            background: none;\n            border: none;\n            color: white;\n            font-size: 1.5rem;\n            cursor: pointer;\n            z-index: 1001;\n            width: 40px;\n            height: 40px;\n            border-radius: 50%;\n            transition: all 0.3s ease;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n        }\n        \n        .mobile-menu-btn.active {\n            background: rgba(255, 255, 255, 0.1);\n            box-shadow: 0 0 10px rgba(0, 242, 254, 0.3);\n        }\n        \n        body.menu-open {\n            overflow: hidden;\n        }\n        \n        @media (max-width: 768px) {\n            .mobile-menu-btn {\n                display: flex;\n            }\n            \n            .nav-links {\n                position: fixed;\n                top: 0;\n                right: -100%;\n                width: 80%;\n                max-width: 300px;\n                height: 100vh;\n                background: rgba(18, 18, 18, 0.95);\n                display: flex;\n                flex-direction: column;\n                justify-content: center;\n                align-items: center;\n                z-index: 1000;\n                transition: right 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n                box-shadow: -5px 0 30px rgba(0, 0, 0, 0.3);\n            }\n            \n            .nav-links.active {\n                right: 0;\n            }\n            \n            .nav-links li {\n                margin: 1.2rem 0;\n                opacity: 0;\n                transform: translateX(20px);\n                transition: all 0.3s ease;\n            }\n            \n            .nav-links.active li {\n                opacity: 1;\n                transform: translateX(0);\n                transition-delay: calc(0.1s * var(--item-index, 0));\n            }\n            \n            .nav-links li:nth-child(1) { --item-index: 1; }\n            .nav-links li:nth-child(2) { --item-index: 2; }\n            .nav-links li:nth-child(3) { --item-index: 3; }\n            .nav-links li:nth-child(4) { --item-index: 4; }\n            .nav-links li:nth-child(5) { --item-index: 5; }\n        }\n    ";
    document.head.appendChild(style);
    // Add index to nav items for staggered animation
    var navItems = document.querySelectorAll('.nav-links li');
    navItems.forEach(function (item, index) {
        item.style.setProperty('--item-index', (index + 1).toString());
    });
});
// Add nav shrink effect on scroll
function implementNavShrink() {
    var nav = document.querySelector('.vr-nav');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            nav === null || nav === void 0 ? void 0 : nav.classList.add('scrolled');
        }
        else {
            nav === null || nav === void 0 ? void 0 : nav.classList.remove('scrolled');
        }
    });
}
// Add particle background effect to header
function implementParticleBackground() {
    var header = document.querySelector('.vr-header');
    if (!header)
        return;
    // Create canvas for particles
    var canvas = document.createElement('canvas');
    canvas.className = 'particles-canvas';
    canvas.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;';
    header.insertBefore(canvas, header.firstChild); // Insert at beginning to avoid covering content
    var ctx = canvas.getContext('2d');
    if (!ctx)
        return;
    var particles = [];
    var mouseX = 0;
    var mouseY = 0;
    var isMouseMoving = false;
    // Track mouse position for interactive particles
    header.addEventListener('mousemove', function (e) {
        var mouseEvent = e;
        mouseX = mouseEvent.clientX;
        mouseY = mouseEvent.clientY - header.getBoundingClientRect().top;
        isMouseMoving = true;
        // Add extra particles around mouse
        if (Math.random() > 0.92) {
            particles.push({
                x: mouseX,
                y: mouseY,
                radius: Math.random() * 2 + 1,
                color: 'rgba(0, 242, 254, ' + (Math.random() * 0.5 + 0.3) + ')',
                speedX: Math.random() * 3 - 1.5,
                speedY: Math.random() * 3 - 1.5,
                life: 100
            });
        }
        // Reset mouse moving flag after a delay
        clearTimeout(window.setTimeout(function () { }, 0));
        window.setTimeout(function () {
            isMouseMoving = false;
        }, 100);
    });
    function resizeCanvas() {
        if (header) {
            canvas.width = header.clientWidth;
            canvas.height = header.clientHeight;
            createParticles();
        }
    }
    function createParticles() {
        particles = [];
        var particleCount = Math.min(Math.floor(canvas.width * canvas.height / 8000), 120);
        for (var i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                color: 'rgba(255, 255, 255, ' + (Math.random() * 0.3 + 0.2) + ')',
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5,
                life: Infinity // Regular particles don't die
            });
        }
    }
    function drawParticles() {
        if (!ctx)
            return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Filter out dead particles
        particles = particles.filter(function (p) { return p.life > 0; });
        particles.forEach(function (particle) {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            // Decrease life for temporary particles
            if (particle.life !== Infinity) {
                particle.life--;
                // Fade out as they die
                particle.color = particle.color.replace(/[\d.]+\)$/g, (Math.max(0, particle.life / 100)).toString() + ')');
            }
            // Wrap around edges for permanent particles
            if (particle.life === Infinity) {
                if (particle.x < 0)
                    particle.x = canvas.width;
                if (particle.x > canvas.width)
                    particle.x = 0;
                if (particle.y < 0)
                    particle.y = canvas.height;
                if (particle.y > canvas.height)
                    particle.y = 0;
            }
            // Interactive effect: particles move toward mouse when it's moving
            if (isMouseMoving && Math.random() > 0.95 && particle.life === Infinity) {
                var dx = mouseX - particle.x;
                var dy = mouseY - particle.y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 200) {
                    particle.speedX += dx / distance * 0.2;
                    particle.speedY += dy / distance * 0.2;
                    // Limit speed
                    var speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
                    if (speed > 2) {
                        particle.speedX = (particle.speedX / speed) * 2;
                        particle.speedY = (particle.speedY / speed) * 2;
                    }
                }
            }
            else {
                // Gradually return to normal speed
                particle.speedX *= 0.99;
                particle.speedY *= 0.99;
            }
        });
        // Draw connections between nearby particles
        particles.forEach(function (particle, i) {
            for (var j = i + 1; j < particles.length; j++) {
                var dx = particle.x - particles[j].x;
                var dy = particle.y - particles[j].y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100 && ctx) {
                    ctx.beginPath();
                    // Special color for connections to mouse particles
                    if (particle.life !== Infinity || particles[j].life !== Infinity) {
                        ctx.strokeStyle = 'rgba(0, 242, 254, ' + (0.3 - distance / 500) + ')';
                    }
                    else {
                        ctx.strokeStyle = 'rgba(255, 255, 255, ' + (0.2 - distance / 500) + ')';
                    }
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(drawParticles);
    }
    // Initialize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawParticles();
}
// Add typing effect to tagline
function implementTypingEffect() {
    var tagline = document.querySelector('.tagline');
    if (!tagline)
        return;
    var originalText = tagline.textContent || '';
    tagline.textContent = '';
    tagline.style.borderRight = '2px solid var(--accent-color)';
    var charIndex = 0;
    function typeText() {
        if (!tagline)
            return;
        if (charIndex < originalText.length) {
            tagline.textContent += originalText.charAt(charIndex);
            charIndex++;
            // Random typing speed for more natural effect
            var typingSpeed = Math.random() * 30 + 30; // 30-60ms
            setTimeout(typeText, typingSpeed);
        }
        else {
            tagline.style.borderRight = 'none';
            // Add blinking cursor at the end
            var cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            cursor.textContent = '|';
            tagline.appendChild(cursor);
            // Add CSS for blinking cursor
            var style = document.createElement('style');
            style.textContent = "\n                .typing-cursor {\n                    color: var(--accent-color);\n                    animation: blink 1s infinite;\n                }\n                @keyframes blink {\n                    0%, 100% { opacity: 1; }\n                    50% { opacity: 0; }\n                }\n            ";
            document.head.appendChild(style);
        }
    }
    // Start typing after a short delay
    setTimeout(typeText, 1000);
}
// Implement back to top button
function implementBackToTop() {
    var backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn)
        return;
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        }
        else {
            backToTopBtn.classList.remove('visible');
        }
    });
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
// Implement counter animation
function implementCounterAnimation() {
    var counters = document.querySelectorAll('.counter-number');
    if (!counters.length)
        return;
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var counter_1 = entry.target;
                var target_1 = parseInt(counter_1.getAttribute('data-count') || '0');
                var count_1 = 0;
                var duration = 2000; // 2 seconds
                var frameDuration = 1000 / 60; // 60fps
                var totalFrames = Math.round(duration / frameDuration);
                var increment_1 = target_1 / totalFrames;
                var updateCount_1 = function () {
                    count_1 += increment_1;
                    if (count_1 < target_1) {
                        counter_1.textContent = Math.ceil(count_1).toString();
                        requestAnimationFrame(updateCount_1);
                    }
                    else {
                        counter_1.textContent = target_1.toString();
                    }
                };
                updateCount_1();
                observer.unobserve(counter_1);
            }
        });
    }, {
        threshold: 0.5
    });
    counters.forEach(function (counter) {
        observer.observe(counter);
    });
}
// Animate skill bars
function animateSkillBars() {
    var skillLevels = document.querySelectorAll('.skill-level');
    if (!skillLevels.length)
        return;
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var skillLevel_1 = entry.target;
                var width_1 = skillLevel_1.style.width;
                // Reset width to 0 first
                skillLevel_1.style.width = '0';
                // Animate to target width
                setTimeout(function () {
                    skillLevel_1.style.width = width_1;
                }, 200);
                observer.unobserve(skillLevel_1);
            }
        });
    }, {
        threshold: 0.5
    });
    skillLevels.forEach(function (skillLevel) {
        observer.observe(skillLevel);
    });
}
// Add special highlight for Games tab
function implementGamesTabHighlight() {
    var gamesTab = document.querySelector('.nav-links a[href="#gry"]');
    if (!gamesTab) return;
    
    // Add special CSS for games tab hover effect that matches other tabs
    var style = document.createElement('style');
    style.textContent = `
        .nav-links a[href="#gry"]:hover {
            color: var(--accent-color);
            background-color: rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 10px rgba(0, 242, 254, 0.3);
        }
        
        .nav-links a[href="#gry"].active {
            font-weight: 600;
            background: linear-gradient(90deg, rgba(0, 242, 254, 0.1), transparent);
        }
    `;
    document.head.appendChild(style);
}
