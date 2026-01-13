// Add smooth animations on page load
document.addEventListener('DOMContentLoaded', function() {
    const content = document.querySelector('.content');
    const imageContainer = document.querySelector('.image-container');
    
    // Fade in animation
    content.style.opacity = '0';
    imageContainer.style.opacity = '0';
    
    setTimeout(() => {
        content.style.transition = 'opacity 1s ease-in';
        content.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        imageContainer.style.transition = 'opacity 1s ease-in';
        imageContainer.style.opacity = '1';
    }, 300);
    
    // Add parallax effect to image on mouse move
    const rightSection = document.querySelector('.right-section');
    
    rightSection.addEventListener('mousemove', (e) => {
        const rect = rightSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 50;
        const rotateY = (centerX - x) / 50;
        
        imageContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    rightSection.addEventListener('mouseleave', () => {
        imageContainer.style.transform = 'perspective(1000px) rotateY(-5deg)';
    });
});

// ========== SECOND SECTION ANIMATIONS ==========

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all service cards
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Observe section header
const sectionHeader = document.querySelector('.section-header');
if (sectionHeader) {
    observer.observe(sectionHeader);
}

// Observe company description
const companyDesc = document.querySelector('.company-description');
if (companyDesc) {
    observer.observe(companyDesc);
}

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    .service-card,
    .section-header,
    .company-description {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .service-card.animate-in,
    .section-header.animate-in,
    .company-description.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .service-card:nth-child(1) { transition-delay: 0.1s; }
    .service-card:nth-child(2) { transition-delay: 0.2s; }
    .service-card:nth-child(3) { transition-delay: 0.3s; }
`;
document.head.appendChild(style);

// ========== THIRD SECTION - PORTFOLIO FILTER ==========

// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get filter value
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                card.classList.remove('hide');
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.classList.add('hide');
            }
        });
    });
});

// Add fade-in animation
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(fadeInStyle);

// Scroll animation for portfolio cards
const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1
});

// Initial state for cards
projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    portfolioObserver.observe(card);
});

// ========== FOURTH SECTION - SKILLS ANIMATIONS ==========

// Intersection Observer for skills cards
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}, {
    threshold: 0.2
});

// Observe all skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    skillsObserver.observe(card);
});

// Observe skills header
const skillsHeader = document.querySelector('.skills-header');
if (skillsHeader) {
    skillsHeader.style.opacity = '0';
    skillsHeader.style.transform = 'translateX(-30px)';
    skillsHeader.style.transition = 'all 0.8s ease';
    skillsObserver.observe(skillsHeader);
}

// Observe skills left content
const skillsLeft = document.querySelector('.skills-left');
if (skillsLeft) {
    skillsLeft.style.opacity = '0';
    skillsLeft.style.transform = 'translateX(-30px)';
    skillsLeft.style.transition = 'all 0.8s ease';
    skillsObserver.observe(skillsLeft);
}

// ========== FIFTH SECTION - EDUCATION ANIMATIONS ==========

// Intersection Observer for timeline items
const educationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 200);
        }
    });
}, {
    threshold: 0.2
});

// Observe all timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'all 0.6s ease';
    educationObserver.observe(item);
});

// Observe education header
const educationHeader = document.querySelector('.education-header');
if (educationHeader) {
    educationHeader.style.opacity = '0';
    educationHeader.style.transform = 'translateY(-30px)';
    educationHeader.style.transition = 'all 0.8s ease';
    educationObserver.observe(educationHeader);
}

// Animate certification cards on hover
document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('i').style.transform = 'rotate(360deg)';
        this.querySelector('i').style.transition = 'transform 0.6s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('i').style.transform = 'rotate(0deg)';
    });
});

// ========== SIXTH SECTION - CONTACT ANIMATIONS & FORM ==========

// Intersection Observer for contact elements
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.2
});

// Observe contact header
const contactHeader = document.querySelector('.contact-header');
if (contactHeader) {
    contactHeader.style.opacity = '0';
    contactHeader.style.transform = 'translateY(-30px)';
    contactHeader.style.transition = 'all 0.8s ease';
    contactObserver.observe(contactHeader);
}

// Observe info cards
document.querySelectorAll('.info-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-30px)';
    card.style.transition = 'all 0.6s ease';
    contactObserver.observe(card);
});

// Observe contact social
const contactSocial = document.querySelector('.contact-social');
if (contactSocial) {
    contactSocial.style.opacity = '0';
    contactSocial.style.transform = 'translateX(-30px)';
    contactSocial.style.transition = 'all 0.6s ease';
    contactObserver.observe(contactSocial);
}

// Observe form wrapper
const formWrapper = document.querySelector('.contact-form-wrapper');
if (formWrapper) {
    formWrapper.style.opacity = '0';
    formWrapper.style.transform = 'translateX(30px)';
    formWrapper.style.transition = 'all 0.8s ease';
    contactObserver.observe(formWrapper);
}

// ========== SIXTH SECTION - CONTACT FORM WITH WEB3FORMS ==========

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        const formData = new FormData(this);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });
            
            const result = await response.json();
            
            if (result.success) {
                console.log('Success:', result);
                
                // Show success message
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)';
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)';
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error(result.message || 'Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            
            // Show error message
            submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed to send';
            submitBtn.style.background = 'linear-gradient(135deg, #ff4757 0%, #ff6348 100%)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// Add floating animation to form inputs
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.querySelector('label').style.color = '#00d4ff';
        this.parentElement.querySelector('label').style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.querySelector('label').style.color = '#ffffff';
        this.parentElement.querySelector('label').style.transform = 'translateY(0)';
    });
});