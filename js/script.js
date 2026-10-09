
document.addEventListener("DOMContentLoaded", function () {
    // Typing animation
    const typingElement = document.getElementById("typing-text");
    const phrases = [
        "AI/ML Enthusiast",
        "Software Developer",
        "Problem Solver"
    ];

    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeText() {
        if (!typingElement) return;

        const phrase = phrases[phraseIndex];

        if (deleting) {
            characterIndex--;
        } else {
            characterIndex++;
        }

        typingElement.textContent = phrase.substring(0, characterIndex);

        let delay = deleting ? 45 : 85;

        if (!deleting && characterIndex === phrase.length) {
            deleting = true;
            delay = 1400;
        } else if (deleting && characterIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 350;
        }

        window.setTimeout(typeText, delay);
    }

    typeText();

    // Reveal elements when they enter the viewport
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }

    // Close mobile navigation after clicking a section link
    const navLinks = document.querySelectorAll(
        ".navbar-collapse .nav-link"
    );
    const navbarCollapse = document.getElementById("navbarContent");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (
                navbarCollapse &&
                navbarCollapse.classList.contains("show") &&
                window.bootstrap
            ) {
                window.bootstrap.Collapse
                    .getOrCreateInstance(navbarCollapse)
                    .hide();
            }
        });
    });

    // Current year in footer
    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Basic client-side contact form validation.
    // This does not send or store the message.
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            formStatus.textContent =
                "The form is valid, but message sending has not been connected yet.";
        });
    }
    // Circular glow that follows the mouse cursor
    const cursorGlow = document.querySelector(".cursor-glow");

    if (
        cursorGlow &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        document.addEventListener("mousemove", function (event) {
            cursorGlow.style.left = event.clientX + "px";
            cursorGlow.style.top = event.clientY + "px";
        });
    }

});
