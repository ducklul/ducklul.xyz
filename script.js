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
  
    // --- Custom smooth scroll inertia ---
  
    let currentScroll = window.scrollY;
    let targetScroll = currentScroll;
    const ease = 0.07; // Lower = smoother/slower easing
  
    // Handle wheel scroll to update target scroll position smoothly
    window.addEventListener('wheel', e => {
      e.preventDefault(); // Prevent native scroll
  
      // Update target scroll, limit to scroll bounds
      targetScroll += e.deltaY;
      targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));
    }, { passive: false });
  
    // Animate smooth scroll toward targetScroll
    function smoothScroll() {
      currentScroll += (targetScroll - currentScroll) * ease;
      window.scrollTo(0, currentScroll);
      requestAnimationFrame(smoothScroll);
    }
  
    smoothScroll();
  
    // --- Smooth scroll on nav link clicks ---
  
    const headerOffset = 80; // height of sticky header
    const navLinks = document.querySelectorAll('nav.nav-box a[href^="#"]');
  
    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
  
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
  
        // Calculate position adjusted for header offset
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        targetScroll = elementPosition - headerOffset;
      });
    });
  });
  