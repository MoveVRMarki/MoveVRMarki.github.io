document.addEventListener('DOMContentLoaded', () => {
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
});

// Handle preloader
function implementPreloader(): void {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    
    // Hide preloader after page loadss
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Remove preloader from DOM after animation completes
            setTimeout(() => {
                (preloader as HTMLElement).style.display = 'none';
            }, 500);
        }, 1000); // Show preloader for at least 1 second
    });
}

function implementSmoothScrolling(): void {
    const navLinks = document.querySelectorAll('.nav-links a');
    const navHeight = document.querySelector('.vr-nav')?.clientHeight || 80;
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href') || '';
            
            if (targetId.charAt(0) === '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: targetPosition - navHeight,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page reload
                    history.pushState(null, '', targetId);
                    
                    // Update active state in navigation
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    (e.currentTarget as HTMLElement).classList.add('active');
                }
            }
        });
    });
}

function implementParallaxEffect(): void {
    const header = document.querySelector('.vr-header') as HTMLElement;
    const profileImage = document.querySelector('.profile-image') as HTMLElement;
    const profileInfo = document.querySelector('.profile-info') as HTMLElement;
    
    window.addEventListener('scroll', () => {
        if (header) {
            const scrollPosition = window.pageYOffset;
            // Parallax for background
            header.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
            
            // Parallax for profile elements
            if (scrollPosition < window.innerHeight) {
                const translateY = scrollPosition * 0.3;
                const opacity = 1 - (scrollPosition / (window.innerHeight * 0.8));
                
                if (profileImage) {
                    profileImage.style.transform = `translateY(${translateY * 0.5}px)`;
                    profileImage.style.opacity = Math.max(0.2, opacity).toString();
                }
                
                if (profileInfo) {
                    profileInfo.style.transform = `translateY(${translateY * 0.7}px)`;
                    profileInfo.style.opacity = Math.max(0.2, opacity).toString();
                }
            }
        }
    });
}

function implementScrollSpy(): void {
    const sections = document.querySelectorAll('.vr-section, .vr-header, #youtube');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionElement = section as HTMLElement;
            const sectionTop = sectionElement.offsetTop - 100;
            const sectionHeight = sectionElement.clientHeight;
            
            if (window.pageYOffset >= sectionTop) {
                current = sectionElement.getAttribute('id') || '';
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

function implementScrollAnimations(): void {
    // Initialize animation for elements when they come into view
    const animatedElements = document.querySelectorAll('.card, .about-content, .contact-container, .equipment-content, .section-title, .stats');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add different animations based on element type
                if (entry.target.classList.contains('card')) {
                    const cards = entry.target.parentElement?.querySelectorAll('.card') || [];
                    Array.prototype.slice.call(cards).forEach((card: Element, index: number) => {
                        setTimeout(() => {
                            card.classList.add('fade-in-up');
                        }, index * 150); // Staggered animation
                    });
                } else if (entry.target.classList.contains('section-title')) {
                    entry.target.classList.add('fade-in-down');
                } else if (entry.target.classList.contains('stats')) {
                    const stats = entry.target.querySelectorAll('.stat');
                    Array.prototype.slice.call(stats).forEach((stat: Element, index: number) => {
                        setTimeout(() => {
                            stat.classList.add('fade-in-right');
                        }, index * 200); // Staggered animation
                    });
                } else {
                    entry.target.classList.add('fade-in');
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        // Remove default animation to control via JS
        element.classList.remove('fadeIn');
        observer.observe(element);
    });
    
    // Add CSS for various animations if not already defined
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeIn 1s ease forwards;
        }
        .fade-in-up {
            opacity: 0;
            transform: translateY(40px);
            animation: fadeInUp 0.8s ease forwards;
        }
        .fade-in-down {
            opacity: 0;
            transform: translateY(-30px);
            animation: fadeInDown 0.8s ease forwards;
        }
        .fade-in-right {
            opacity: 0;
            transform: translateX(-30px);
            animation: fadeInRight 0.8s ease forwards;
        }
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @keyframes fadeInDown {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @keyframes fadeInRight {
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
}

function implementHoverEffects(): void {
    // Add 3D tilt effect to cards on hover
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e: Event) => {
            const mouseEvent = e as MouseEvent;
            const cardElement = card as HTMLElement;
            const rect = cardElement.getBoundingClientRect();
            const x = mouseEvent.clientX - rect.left;
            const y = mouseEvent.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            // Add glare effect
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            
            cardElement.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
            
            // Update or create glare element
            let glare = cardElement.querySelector('.card-glare') as HTMLElement;
            if (!glare) {
                glare = document.createElement('div');
                glare.className = 'card-glare';
                cardElement.appendChild(glare);
            }
            
            glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`;
        });
        
        card.addEventListener('mouseleave', () => {
            const cardElement = card as HTMLElement;
            cardElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            cardElement.style.transition = 'transform 0.5s ease';
            
            // Remove glare
            const glare = cardElement.querySelector('.card-glare') as HTMLElement;
            if (glare) {
                glare.style.background = 'none';
            }
        });
    });
    
    // Add hover effect to equipment images
    const equipmentImages = document.querySelectorAll('.equipment-image');
    equipmentImages.forEach(image => {
        image.addEventListener('mouseenter', () => {
            const caption = image.querySelector('.image-caption') as HTMLElement;
            if (caption) {
                caption.style.transform = 'translateY(0)';
                caption.style.opacity = '1';
            }
        });
        
        image.addEventListener('mouseleave', () => {
            const caption = image.querySelector('.image-caption') as HTMLElement;
            if (caption) {
                caption.style.transform = 'translateY(100%)';
                caption.style.opacity = '0';
            }
        });
    });
    
    // Add CSS for glare and caption effects
    const style = document.createElement('style');
    style.textContent = `
        .card {
            position: relative;
            overflow: hidden;
        }
        .card-glare {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
        }
        .image-caption {
            transform: translateY(100%);
            opacity: 0;
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

function trackBookingButtonClicks(): void {
    const bookingButtons = document.querySelectorAll('#booking-btn, #booking-btn-footer');
    
    bookingButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            console.log('Booking button clicked - redirecting to booksy.pl');
            
            // Optional: Add fancy transition effect before redirect
            const btnElement = e.currentTarget as HTMLElement;
            btnElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Przekierowuję...';
            
            // You could add analytics tracking here in a real application
            
            // Redirect happens via the href attribute in the anchor tag
        });
    });
}

// Add mobile navigation toggle functionality for responsive design
document.addEventListener('DOMContentLoaded', () => {
    // Create mobile menu button
    const nav = document.querySelector('.vr-nav') as HTMLElement;
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    nav.appendChild(mobileMenuBtn);
    
    // Add menu toggle functionality
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Toggle between hamburger and close icon
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                mobileMenuBtn.classList.add('active');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
    
    // Close menu when clicking on a link
    const menuLinks = navLinks.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                mobileMenuBtn.classList.remove('active');
            }
        });
    });
    
    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 1001;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .mobile-menu-btn.active {
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 10px rgba(0, 242, 254, 0.3);
        }
        
        body.menu-open {
            overflow: hidden;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: flex;
            }
            
            .nav-links {
                position: fixed;
                top: 0;
                right: -100%;
                width: 80%;
                max-width: 300px;
                height: 100vh;
                background: rgba(18, 18, 18, 0.95);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                transition: right 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: -5px 0 30px rgba(0, 0, 0, 0.3);
            }
            
            .nav-links.active {
                right: 0;
            }
            
            .nav-links li {
                margin: 1.2rem 0;
                opacity: 0;
                transform: translateX(20px);
                transition: all 0.3s ease;
            }
            
            .nav-links.active li {
                opacity: 1;
                transform: translateX(0);
                transition-delay: calc(0.1s * var(--item-index, 0));
            }
            
            .nav-links li:nth-child(1) { --item-index: 1; }
            .nav-links li:nth-child(2) { --item-index: 2; }
            .nav-links li:nth-child(3) { --item-index: 3; }
            .nav-links li:nth-child(4) { --item-index: 4; }
            .nav-links li:nth-child(5) { --item-index: 5; }
        }
    `;
    document.head.appendChild(style);
    
    // Add index to nav items for staggered animation
    const navItems = document.querySelectorAll('.nav-links li');
    navItems.forEach((item, index) => {
        (item as HTMLElement).style.setProperty('--item-index', (index + 1).toString());
    });
});

// Add nav shrink effect on scroll
function implementNavShrink(): void {
    const nav = document.querySelector('.vr-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
    });
}

// Add particle background effect to header
function implementParticleBackground(): void {
    const header = document.querySelector('.vr-header');
    if (!header) return;
    
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    canvas.className = 'particles-canvas';
    canvas.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;';
    header.insertBefore(canvas, header.firstChild); // Insert at beginning to avoid covering content
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    interface Particle {
        x: number;
        y: number;
        radius: number;
        color: string;
        speedX: number;
        speedY: number;
        life: number;
    }
    
    let particles: Particle[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    
    // Track mouse position for interactive particles
    header.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent;
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
        clearTimeout(window.setTimeout(() => {}, 0));
        window.setTimeout(() => {
            isMouseMoving = false;
        }, 100);
    });
    
    function resizeCanvas(): void {
        if (header) {
            canvas.width = header.clientWidth;
            canvas.height = header.clientHeight;
            createParticles();
        }
    }
    
    function createParticles(): void {
        particles = [];
        const particleCount = Math.min(Math.floor(canvas.width * canvas.height / 8000), 120);
        
        for (let i = 0; i < particleCount; i++) {
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
    
    function drawParticles(): void {
        if (!ctx) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Filter out dead particles
        particles = particles.filter(p => p.life > 0);
        
        particles.forEach(particle => {
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
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
            }
            
            // Interactive effect: particles move toward mouse when it's moving
            if (isMouseMoving && Math.random() > 0.95 && particle.life === Infinity) {
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 200) {
                    particle.speedX += dx / distance * 0.2;
                    particle.speedY += dy / distance * 0.2;
                    
                    // Limit speed
                    const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
                    if (speed > 2) {
                        particle.speedX = (particle.speedX / speed) * 2;
                        particle.speedY = (particle.speedY / speed) * 2;
                    }
                }
            } else {
                // Gradually return to normal speed
                particle.speedX *= 0.99;
                particle.speedY *= 0.99;
            }
        });
        
        // Draw connections between nearby particles
        particles.forEach((particle, i) => {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particle.x - particles[j].x;
                const dy = particle.y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100 && ctx) {
                    ctx.beginPath();
                    
                    // Special color for connections to mouse particles
                    if (particle.life !== Infinity || particles[j].life !== Infinity) {
                        ctx.strokeStyle = 'rgba(0, 242, 254, ' + (0.3 - distance / 500) + ')';
                    } else {
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
function implementTypingEffect(): void {
    const tagline = document.querySelector('.tagline');
    if (!tagline) return;
    
    const originalText = tagline.textContent || '';
    tagline.textContent = '';
    (tagline as HTMLElement).style.borderRight = '2px solid var(--accent-color)';
    
    let charIndex = 0;
    
    function typeText(): void {
        if (!tagline) return;
        
        if (charIndex < originalText.length) {
            tagline.textContent += originalText.charAt(charIndex);
            charIndex++;
            
            // Random typing speed for more natural effect
            const typingSpeed = Math.random() * 30 + 30; // 30-60ms
            setTimeout(typeText, typingSpeed);
        } else {
            (tagline as HTMLElement).style.borderRight = 'none';
            // Add blinking cursor at the end
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            cursor.textContent = '|';
            tagline.appendChild(cursor);
            
            // Add CSS for blinking cursor
            const style = document.createElement('style');
            style.textContent = `
                .typing-cursor {
                    color: var(--accent-color);
                    animation: blink 1s infinite;
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeText, 1000);
}

// Implement back to top button
function implementBackToTop(): void {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Implement counter animation
function implementCounterAnimation(): void {
    const counters = document.querySelectorAll('.counter-number');
    if (!counters.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target as HTMLElement;
                const target = parseInt(counter.getAttribute('data-count') || '0');
                let count = 0;
                const duration = 2000; // 2 seconds
                const frameDuration = 1000 / 60; // 60fps
                const totalFrames = Math.round(duration / frameDuration);
                const increment = target / totalFrames;
                
                const updateCount = (): void => {
                    count += increment;
                    if (count < target) {
                        counter.textContent = Math.ceil(count).toString();
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target.toString();
                    }
                };
                
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Animate skill bars
function animateSkillBars(): void {
    const skillLevels = document.querySelectorAll('.skill-level');
    if (!skillLevels.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target as HTMLElement;
                const width = skillLevel.style.width;
                
                // Reset width to 0 first
                skillLevel.style.width = '0';
                
                // Animate to target width
                setTimeout(() => {
                    skillLevel.style.width = width;
                }, 200);
                
                observer.unobserve(skillLevel);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillLevels.forEach(skillLevel => {
        observer.observe(skillLevel);
    });
}
