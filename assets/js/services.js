// Theme toggle functionality
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('i');
        
        // Check for saved theme preference or respect OS preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const navMenu = document.getElementById('nav-menu');
        
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('#nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Create traveling objects
        function createTravelingObjects() {
            const container = document.getElementById('traveling-objects-bg');
            const types = ['plane', 'car', 'ship', 'suitcase'];
            
            // Create 15 traveling objects
            for (let i = 0; i < 15; i++) {
                const object = document.createElement('div');
                const type = types[Math.floor(Math.random() * types.length)];
                const direction = Math.random() > 0.5 ? '' : 'reverse';
                
                object.className = `traveling-object ${type} ${direction}`;
                object.innerHTML = `<i class="fas fa-${type}"></i>`;
                
                // Random position and delay
                const topPos = Math.random() * 80 + 10; // 10% to 90%
                const delay = Math.random() * 20; // 0s to 20s
                
                object.style.top = `${topPos}%`;
                object.style.animationDelay = `-${delay}s`;
                
                // Random speed variation
                const duration = 15 + Math.random() * 25; // 15s to 40s
                object.style.animationDuration = `${duration}s`;
                
                container.appendChild(object);
            }
        }
        
        // Initialize traveling objects after page loads
        window.addEventListener('load', createTravelingObjects);

        document.addEventListener('DOMContentLoaded', function() {
            const track = document.querySelector('.categories-track');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const cardWidth = document.querySelector('.category-card').offsetWidth;
            const gap = 30; // 30px gap
            const scrollAmount = cardWidth + gap;
            
            // Manual navigation
            nextBtn.addEventListener('click', () => {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
            
            prevBtn.addEventListener('click', () => {
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
            
            // Auto-scroll with pause on hover
            let autoScroll = setInterval(() => {
                track.scrollBy({ left: 1, behavior: 'auto' });
            }, 20);
            
            const carouselContainer = document.querySelector('.carousel-container');
            
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(autoScroll);
            });
            
            carouselContainer.addEventListener('mouseleave', () => {
                autoScroll = setInterval(() => {
                    track.scrollBy({ left: 1, behavior: 'auto' });
                }, 20);
            });
            
            // Reset position for seamless looping
            track.addEventListener('scroll', () => {
                // When we reach the duplicated content, reset position seamlessly
                if (track.scrollLeft >= track.scrollWidth / 2) {
                    track.scrollLeft = track.scrollLeft - (track.scrollWidth / 2);
                }
            });
        });