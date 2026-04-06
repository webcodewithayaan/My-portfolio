/**
 * Ayaan Portfolio Professional Script
 * Includes: Smooth Scroll, Sticky Header, Reveal Animations, and Hire Me PDF Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. STICKY HEADER & NAV HIGHLIGHT
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('sticky', window.scrollY > 100);
    });

    // 2. SMOOTH SCROLL FOR NAV LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 3. REVEAL SECTIONS ON SCROLL (Intersection Observer)
    const revealSections = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Specific logic for Skills Section (Restarting animations)
                    if (entry.target.id === 'skills') {
                        animateSkills();
                    }
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.reveal').forEach(section => {
            observer.observe(section);
        });
    };

    // 4. SKILLS ANIMATION TRIGGER
    const animateSkills = () => {
        const progressBars = document.querySelectorAll('.progress-line');
        progressBars.forEach(bar => {
            // Force reflow to restart CSS animation if needed
            bar.style.animation = 'none';
            bar.offsetHeight; 
            bar.style.animation = null;
        });
    };

    // 5. HIRE ME & PDF UPLOAD LOGIC
    const hireBtn = document.getElementById('hireMeBtn');
    const pdfInput = document.getElementById('pdfUpload');

    if (hireBtn && pdfInput) {
        hireBtn.addEventListener('click', () => {
            // Professional alert then trigger upload
            const confirmUpload = confirm("Would you like to upload your Requirements/Project Brief (PDF)?");
            if (confirmUpload) {
                pdfInput.click();
            }
        });

        pdfInput.addEventListener('change', (e) => {
            const fileName = e.target.files[0]?.name;
            if (fileName) {
                alert(`Success! File "${fileName}" has been attached. Ayaan will review it soon.`);
                // Yahan aap backend logic ya email integration add kar sakte hain
            }
        });
    }

    // 6. CONTACT FORM HANDLING
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Adding a loading effect to the button
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            // Simulate server delay
            setTimeout(() => {
                alert("Thank you, Ayaan has received your message!");
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2000);
        });
    }

    // Initialize Animations
    revealSections();
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Element selection (Line 84 aur 85 ki IDs)
    const downloadBtn = document.getElementById('downloadCvBtn');
    const clientInput = document.getElementById('clientpdf'); 

    if (downloadBtn && clientInput) {
        downloadBtn.addEventListener('click', () => {
            // Click animation (Chota sa effect)
            downloadBtn.style.transform = "scale(0.95)";
            setTimeout(() => { downloadBtn.style.transform = "scale(1)"; }, 100);

            // 1 Second ke baad upload ka option dena
            setTimeout(() => {
                const confirmUpload = confirm("Download started! Would you also like to upload your project brief (PDF) for Ayaan?");
                if (confirmUpload) {
                    clientInput.click(); // File explorer khulega
                }
            }, 1000);
        });

        // Jab client file select kar le to confirmation dena
        clientInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                alert("Success! Your brief '" + file.name + "' has been attached to Ayaan's portal.");
            }
        });
    }
});