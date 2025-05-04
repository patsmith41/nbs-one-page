document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
            
            if (navList.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    
                    // Update the icon
                    const icon = otherItem.querySelector('.faq-icon i');
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
            
            // Update the icon
            const icon = item.querySelector('.faq-icon i');
            if (item.classList.contains('active')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });
    
    // Scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight * 0.85;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    };
    
    // Apply fade-in class to elements
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialize animations on page load
    animateOnScroll();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header shadow on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.style.boxShadow = 'var(--shadow-lg)';
        } else {
            header.style.boxShadow = 'var(--shadow-md)';
        }
    });
    
    // Add subtle parallax effect to hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition < hero.offsetHeight) {
                hero.style.backgroundPositionY = `calc(50% + ${scrollPosition * 0.4}px)`;
            }
        });
    }
    
    // Add to cart functionality (placeholder for Ecwid integration)
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Store product info for Ecwid integration
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // Animation feedback
            this.innerHTML = '<i class="fas fa-check"></i> Added';
            this.classList.add('added');
            
            setTimeout(() => {
                this.innerHTML = 'Add to Cart';
                this.classList.remove('added');
            }, 2000);
            
            // This will be replaced with actual Ecwid integration
            console.log(`Added to cart: ${productTitle} - ${productPrice}`);
        });
    });
    
    // Form validation for the quote form (if it exists on this page)
    const quoteForm = document.querySelector('.quote-form');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = quoteForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            const emailField = quoteForm.querySelector('input[type="email"]');
            if (emailField && !validateEmail(emailField.value)) {
                isValid = false;
                emailField.classList.add('error');
            }
            
            if (isValid) {
                // Submit form (will be implemented with actual backend)
                const submitButton = quoteForm.querySelector('button[type="submit"]');
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Simulate form submission
                setTimeout(() => {
                    quoteForm.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><h3>Thank you for your request!</h3><p>We\'ll get back to you shortly.</p></div>';
                }, 1500);
            }
        });
        
        // Live validation on input
        const formInputs = quoteForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.hasAttribute('required') && this.value.trim()) {
                    this.classList.remove('error');
                }
                if (this.type === 'email' && validateEmail(this.value)) {
                    this.classList.remove('error');
                }
            });
        });
    }
    
    // Email validation helper
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Add CSS fade-in animation classes to the stylesheet
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .btn.added {
            background: linear-gradient(135deg, #2e7d32, #388e3c);
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .success-message {
            text-align: center;
            padding: 2rem;
            animation: fadeIn 0.5s ease-out forwards;
        }
        
        .success-message i {
            font-size: 3rem;
            color: #2e7d32;
            margin-bottom: 1rem;
        }
    `;
    document.head.appendChild(style);
});


// Add this to your existing app.js file
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Ecwid with better checkout behavior
    if (typeof Ecwid !== 'undefined') {
        Ecwid.OnAPILoaded.add(function() {
            // Scroll to checkout when it appears
            Ecwid.OnPageLoaded.add(function(page) {
                if (page.type == "CHECKOUT_PAGE") {
                    setTimeout(function() {
                        const checkoutEl = document.querySelector('.ecwid-checkout');
                        if (checkoutEl) {
                            checkoutEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 300);
                }
            });
            
            // Show mini cart when product is added
            Ecwid.OnCartChanged.add(function(cart) {
                if (cart.productsQuantity > 0) {
                    // Update cart count
                    const cartCountEl = document.querySelector('.cart-count');
                    if (cartCountEl) {
                        cartCountEl.textContent = cart.productsQuantity;
                    }
                }
            });
        });
    }
});