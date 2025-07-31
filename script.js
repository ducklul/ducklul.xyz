document.addEventListener('DOMContentLoaded', () => {
    // --- Mac window controls code ---
    const macControls = document.querySelector('.mac-window-controls');
    const closeBtn = document.querySelector('.control-btn.close');
    const maximizeBtn = document.querySelector('.control-btn.maximize');
    const dropdown = document.querySelector('.close-dropdown');
    const dropdownCloseBtn = document.querySelector('.dropdown-close-btn');

    function showDropdown() {
      macControls.style.display = 'none';
      dropdown.classList.remove('hidden', 'slide-up');
      dropdown.classList.add('slide-down');
    }

    function hideDropdown() {
      dropdown.classList.remove('slide-down');
      dropdown.classList.add('slide-up');
      dropdown.addEventListener('animationend', () => {
        dropdown.classList.add('hidden');
        macControls.style.display = 'flex';
        dropdown.classList.remove('slide-up');
      }, { once: true });
    }

    closeBtn.addEventListener('click', () => {
      showDropdown();
    });

    dropdownCloseBtn.addEventListener('click', () => {
      hideDropdown();
    });

    maximizeBtn.addEventListener('click', () => {
      window.open(window.location.href, '_blank');
    });

    // --- Scroll-triggered animations ---
    const sections = document.querySelectorAll('.section');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Intersection Observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Intersection Observer for timeline items
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger the animation of timeline items
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 200);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -30px 0px'
    });

    // Observe sections
    sections.forEach(section => {
      if (section.id !== 'home') { // Skip home section as it has its own animation
        sectionObserver.observe(section);
      }
    });

    // Observe timeline items
    timelineItems.forEach(item => {
      timelineObserver.observe(item);
    });

    // --- Enhanced navigation interactions ---
    const navLinks = document.querySelectorAll('.nav-box a');
    
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', (e) => {
        // Add a subtle scale effect
        e.target.style.transform = 'scale(1.05)';
      });
      
      link.addEventListener('mouseleave', (e) => {
        e.target.style.transform = 'scale(1)';
      });
    });

    // --- Smooth scroll enhancement ---
    function smoothScrollTo(target) {
      const element = document.getElementById(target);
      if (element) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }

    // Update the global scrollToSection function
    window.scrollToSection = smoothScrollTo;

    // --- Enhanced form interactions ---
    const contactForm = document.querySelector('.contact-form');
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    const submitBtn = document.querySelector('.contact-form button');

    if (contactForm) {
      // Add focus animations to form inputs
      formInputs.forEach(input => {
        input.addEventListener('focus', () => {
          input.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', () => {
          input.parentElement.style.transform = 'translateY(0)';
        });
      });

      // Enhanced submit button interaction
      if (submitBtn) {
        submitBtn.addEventListener('mouseenter', () => {
          submitBtn.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        submitBtn.addEventListener('mouseleave', () => {
          submitBtn.style.transform = 'translateY(0) scale(1)';
        });
      }
    }

    // --- Social button enhancements ---
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        // Add a subtle bounce effect
        btn.style.animation = 'socialBounce 0.3s ease-out';
      });
      
      btn.addEventListener('animationend', () => {
        btn.style.animation = '';
      });
    });

    // --- Project card enhancements ---
    const projectBoxes = document.querySelectorAll('.project-box');
    
    projectBoxes.forEach(box => {
      box.addEventListener('mouseenter', () => {
        // Add a subtle glow effect
        box.style.boxShadow = '0 0 30px rgba(255, 140, 0, 0.4)';
      });
      
      box.addEventListener('mouseleave', () => {
        box.style.boxShadow = '';
      });
    });

    // --- Timeline item enhancements ---
    timelineItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        // Add a subtle scale effect to the timeline dot
        const dot = item.querySelector('::before');
        if (dot) {
          item.style.setProperty('--dot-scale', '1.3');
        }
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.setProperty('--dot-scale', '1');
      });
    });

    // --- Page load animations ---
    // Trigger entrance animations after a short delay
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);

    // --- Parallax effect for gradient text ---
    const gradientText = document.querySelector('.gradient-text');
    if (gradientText) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        gradientText.style.transform = `translateY(${rate}px)`;
      });
    }

    // --- Add CSS animation for social button bounce ---
    const style = document.createElement('style');
    style.textContent = `
      @keyframes socialBounce {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-6px) scale(1.1); }
      }
    `;
    document.head.appendChild(style);
});