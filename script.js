// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAgendaTabs();
    initializeModal();
    initializeFormHandling();
    initializeAnimations();
    initializeDropdownMenu();
    // Remove smooth scrolling for multi-page setup
});

// Navigation Functions
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a:not(.dropbtn)');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Animate hamburger icon
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');

            // Reset hamburger icon
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        });
    });

    // Highlight current page in navigation
    highlightCurrentPage();
}

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active-page');
        }
    });
}

// Dropdown Menu Functions
function initializeDropdownMenu() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        // Handle mobile dropdown clicks
        if (window.innerWidth <= 768) {
            dropbtn.addEventListener('click', function(e) {
                e.preventDefault();
                dropdownContent.style.display = 
                    dropdownContent.style.display === 'block' ? 'none' : 'block';
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            const dropdownContents = document.querySelectorAll('.dropdown-content');
            dropdownContents.forEach(content => {
                if (window.innerWidth <= 768) {
                    content.style.display = 'none';
                }
            });
        }
    });
}

// Agenda Tab Functions
function initializeAgendaTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const daySchedules = document.querySelectorAll('.day-schedule');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetDay = this.getAttribute('data-day');

            // Remove active class from all tabs and schedules
            tabButtons.forEach(btn => btn.classList.remove('active'));
            daySchedules.forEach(schedule => schedule.classList.remove('active'));

            // Add active class to clicked tab and corresponding schedule
            this.classList.add('active');
            document.getElementById(targetDay).classList.add('active');

            // Add animation
            const activeSchedule = document.getElementById(targetDay);
            activeSchedule.style.opacity = '0';
            activeSchedule.style.transform = 'translateY(20px)';

            setTimeout(() => {
                activeSchedule.style.transition = 'all 0.3s ease';
                activeSchedule.style.opacity = '1';
                activeSchedule.style.transform = 'translateY(0)';
            }, 50);
        });
    });
}

// Modal Functions
function initializeModal() {
    const modal = document.getElementById('registrationModal');
    const closeBtn = document.querySelector('.close');

    // Close modal when clicking the X
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

function openRegistration(type) {
    const modal = document.getElementById('registrationModal');
    const registrationTypeSelect = document.getElementById('registrationType');

    // Set the registration type based on the button clicked
    if (type === 'early-bird') {
        registrationTypeSelect.value = 'early-bird';
    } else if (type === 'standard') {
        registrationTypeSelect.value = 'standard';
    } else if (type === 'late') {
        registrationTypeSelect.value = 'late';
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Focus on first input field
    setTimeout(() => {
        document.getElementById('firstName').focus();
    }, 100);
}

function closeModal() {
    const modal = document.getElementById('registrationModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Smooth Scrolling Functions
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function scrollToRegister() {
    const registerSection = document.getElementById('register');
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = registerSection.offsetTop - headerHeight - 20;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Form Handling Functions
function initializeFormHandling() {
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleRegistrationSubmit();
    });

    // Add real-time form validation
    const inputs = registrationForm.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();

    // Remove existing error styling
    field.classList.remove('error');

    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }

    // Phone validation (basic)
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }

    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');

    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Add error message
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.style.display = 'block';

    field.parentNode.appendChild(errorElement);
}

function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('error');

    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function handleRegistrationSubmit() {
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);

    // Validate all fields
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });

    if (!isValid) {
        showNotification('Please correct the errors in the form', 'error');
        return;
    }

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;

        // Show success message
        showNotification('Registration submitted successfully! You will receive a confirmation email shortly.', 'success');

        // Close modal and reset form
        closeModal();
        form.reset();

        // Log registration data (in real app, this would be sent to server)
        console.log('Registration Data:', Object.fromEntries(formData));

    }, 2000);
}

// Notification Functions
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Styling
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '3000',
        maxWidth: '400px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });

    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Animation Functions
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.speaker-card, .pricing-card, .stat, .schedule-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        .error {
            border-color: #ef4444 !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
        }
    `;
    document.head.appendChild(style);
}

// Utility Functions
function downloadBrochure() {
    // In a real application, this would trigger a file download
    showNotification('Brochure download will be available soon!', 'info');

    // Simulate download
    console.log('Downloading conference brochure...');

    // In real implementation, you might do:
    // const link = document.createElement('a');
    // link.href = '/path/to/brochure.pdf';
    // link.download = 'conference-brochure-2025.pdf';
    // link.click();
}

// Newsletter Subscription (if needed)
function subscribeNewsletter(email) {
    if (!email) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        console.log('Newsletter subscription:', email);
    }, 1000);
}

// Contact Form Handler (if contact form is added)
function handleContactSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    showNotification('Thank you for your message. We will get back to you soon!', 'success');
    event.target.reset();

    console.log('Contact form data:', Object.fromEntries(formData));
}

// Search Functionality (for future enhancement)
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        // Implement search logic here
        console.log('Searching for:', query);
    });
}

// Print Functionality
function printPage() {
    window.print();
}

// Social Share Functions
function shareOnSocial(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Professional Conference 2025');
    const text = encodeURIComponent('Join us for the Professional Conference 2025!');

    let shareUrl = '';

    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        default:
            console.log('Unknown platform:', platform);
            return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Error Handling
window.addEventListener('error', function(event) {
    console.error('JavaScript Error:', event.error);
    // In production, you might want to send this to an error reporting service
});

// Performance Monitoring
window.addEventListener('load', function() {
    // Log page load time
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});

// Accessibility Enhancements
document.addEventListener('keydown', function(event) {
    // Enable keyboard navigation for modal
    if (event.key === 'Tab' && document.getElementById('registrationModal').style.display === 'block') {
        trapFocus(event);
    }
});

function trapFocus(event) {
    const modal = document.getElementById('registrationModal');
    const focusableElements = modal.querySelectorAll('input, select, button, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
    }
}