/* ============================================
   PHASE 3: NAVIGATION INTERACTIVITY
   ============================================ */

// Wait for the HTML to fully load before running any code
document.addEventListener('DOMContentLoaded', function () {

    // ===== GET REFERENCES TO ELEMENTS =====
    // We grab the elements we need to work with
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const allNavLinks = document.querySelectorAll('.nav-links a');


    // ===== 1. SCROLL EFFECT =====
    // When user scrolls down, add dark background to navbar
    // When at top, make it transparent again

    window.addEventListener('scroll', function () {
        // If we've scrolled more than 50 pixels from the top
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            // This adds the CSS class '.scrolled' to the header
        } else {
            header.classList.remove('scrolled');
            // Remove it when we're back at the top
        }
    });


    // ===== 2. MOBILE MENU TOGGLE =====
    // When hamburger icon is clicked, open/close the menu

    hamburger.addEventListener('click', function () {
        // Toggle means: add if not there, remove if there
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');

        // The CSS handles what happens visually
        // We just flip the classes on and off
    });


    // ===== 3. CLOSE MENU WHEN A LINK IS CLICKED =====
    // Better user experience on mobile:
    // After clicking a section link, close the menu automatically

    allNavLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            // Remove the active classes
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            // Now the menu closes after you click a section
        });
    });

    
    // ==========================================
    // PHASE 10: SCROLL REVEAL ANIMATIONS
    // Elements fade in and slide up as you scroll
    // ==========================================

    // Select all elements we want to animate
    const revealElements = document.querySelectorAll(
        'section, .skill-card, .service-card, .project-card, .about-container, form, .social-links'
    );

    // Create the Intersection Observer
    // This watches for elements entering the viewport
    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                // If the element is visible in the viewport
                if (entry.isIntersecting) {
                    // Add the 'revealed' class to trigger animation
                    entry.target.classList.add('revealed');
                    // Stop watching this element (it only animates once)
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            // Trigger when element is 15% visible
            threshold: 0.15,
            // Slight delay before triggering for smoother feel
            rootMargin: '0px 0px -50px 0px'
        }
    );

    // Start observing all reveal elements
    revealElements.forEach(function (element) {
        observer.observe(element);
    });


    // ==========================================
    // PHASE 10: ACTIVE NAV LINK HIGHLIGHTING
    // Lights up the nav link for current section
    // ==========================================

    // Get all sections and nav links
    const allSections = document.querySelectorAll('section[id]');
    const navLinkItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function () {
        let currentSection = '';

        // Check each section's position
        allSections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // If we've scrolled past this section's top minus offset
            if (window.scrollY >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });

        // Update active class on nav links
        navLinkItems.forEach(function (link) {
            // Remove active class from all links
            link.classList.remove('active');

            // Add active class to the link matching current section
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });


    // ==========================================
    // PHASE 10: FORM VALIDATION
    // Checks fields before submission
    // ==========================================

    const contactForm = document.querySelector('#contact form');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');

    contactForm.addEventListener('submit', function (event) {
        // Prevent the form from actually submitting (no backend yet)
        event.preventDefault();

        // Clear any previous error states
        clearErrors();

        let isValid = true;

        // Validate Name (must not be empty)
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Please enter your name');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'Name must be at least 2 characters');
            isValid = false;
        }

        // Validate Email (must be valid format)
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate Message (must not be empty)
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Please enter your message');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Message must be at least 10 characters');
            isValid = false;
        }

        // If everything is valid, show success message
        if (isValid) {
            showSuccess();
        }
    });

    // Helper function: Show error on a field
    function showError(inputElement, message) {
        // Add error styling to the input
        inputElement.style.borderBottomColor = '#e74c3c';  // Red border

        // Find the parent form-group
        const formGroup = inputElement.closest('.form-group');

        // Create error message element
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        errorSpan.textContent = message;
        errorSpan.style.cssText = `
            display: block;
            color: #e74c3c;
            font-size: 0.78rem;
            margin-top: 6px;
        `;

        // Add error message after the input
        formGroup.appendChild(errorSpan);
    }

    // Helper function: Clear all errors
    function clearErrors() {
        // Reset all input borders
        const allInputs = contactForm.querySelectorAll('input, textarea');
        allInputs.forEach(function (input) {
            input.style.borderBottomColor = '';
        });

        // Remove all error messages
        const errorMessages = contactForm.querySelectorAll('.error-message');
        errorMessages.forEach(function (error) {
            error.remove();
        });

        // Remove success message if exists
        const successMsg = contactForm.querySelector('.success-message');
        if (successMsg) {
            successMsg.remove();
        }
    }

    // Helper function: Validate email format
    function isValidEmail(email) {
        // Simple email regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Helper function: Show success message
    function showSuccess() {
        // Clear the form
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';

        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        successDiv.style.cssText = `
            background-color: rgba(46, 204, 113, 0.15);
            color: #2ecc71;
            padding: 16px;
            border-radius: 8px;
            text-align: center;
            margin-top: 20px;
            font-weight: 500;
            animation: fadeInUp 0.5s ease-out;
        `;

        // Add success message after the form
        contactForm.insertAdjacentElement('afterend', successDiv);

        // Remove success message after 5 seconds
        setTimeout(function () {
            successDiv.style.opacity = '0';
            successDiv.style.transition = 'opacity 0.5s ease';
            setTimeout(function () {
                successDiv.remove();
            }, 500);
        }, 5000);
    }

    // Clear errors when user starts typing again
    const allFormInputs = contactForm.querySelectorAll('input, textarea');
    allFormInputs.forEach(function (input) {
        input.addEventListener('input', function () {
            // Reset this specific input's border
            input.style.borderBottomColor = '';
            // Remove error message for this field only
            const formGroup = input.closest('.form-group');
            const errorMsg = formGroup.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    });

});