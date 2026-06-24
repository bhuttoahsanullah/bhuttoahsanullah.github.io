
        // Navbar scroll effect
        const navbar = document.getElementById("navbar");
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("scrolled", window.scrollY > 40);
        });

        // Mobile nav toggle
        const toggle = document.getElementById("nav-toggle");
        const navLinks = document.getElementById("nav-links");
        toggle.addEventListener("click", () => navLinks.classList.toggle("open"));
        navLinks
            .querySelectorAll("a")
            .forEach((a) =>
                a.addEventListener("click", () => navLinks.classList.remove("open")),
            );

        // Typing effect
        const roles = [
            "Full-Stack Developer",
            "MERN Stack Developer",
            "CS Undergrad",
        ];
        let roleIdx = 0,
            charIdx = 0,
            deleting = false;
        const typedEl = document.getElementById("typed-role");
        function typeLoop() {
            const current = roles[roleIdx];
            if (!deleting) {
                typedEl.textContent = current.slice(0, ++charIdx);
                if (charIdx === current.length) {
                    deleting = true;
                    setTimeout(typeLoop, 1800);
                    return;
                }
            } else {
                typedEl.textContent = current.slice(0, --charIdx);
                if (charIdx === 0) {
                    deleting = false;
                    roleIdx = (roleIdx + 1) % roles.length;
                }
            }
            setTimeout(typeLoop, deleting ? 60 : 90);
        }
        typeLoop();

        // Scroll reveal
        const reveals = document.querySelectorAll(".reveal");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("visible");
                        observer.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.1 },
        );
        reveals.forEach((el) => observer.observe(el));

        // Contact Form Handler - Formspree
        async function handleFormSubmit(event) {
            event.preventDefault();
            const form = document.getElementById("contact-form");
            const submitBtn = document.getElementById("submit-btn");
            const formStatus = document.getElementById("form-status");
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Sending...';
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                    formStatus.style.backgroundColor = 'rgba(104, 211, 145, 0.12)';
                    formStatus.style.color = '#68d391';
                    formStatus.style.borderLeft = '3px solid #68d391';
                    formStatus.display = 'block';
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                formStatus.textContent = '✗ Error sending message. Please try again or email me directly.';
                formStatus.style.backgroundColor = 'rgba(252, 129, 74, 0.12)';
                formStatus.style.color = '#fc814a';
                formStatus.style.borderLeft = '3px solid #fc814a';
                formStatus.display = 'block';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message &nbsp;<i class="fas fa-paper-plane"></i>';
            }
            
            return false;
        }
