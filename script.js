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
    const ease = 0.20; // Lower = smoother/slower easing
    const scrollStep = 80; // Pixels to scroll per key press

    let touchStartY = 0; // To track touch start position for mobile scrolling

    // Handle wheel scroll for desktop
    window.addEventListener('wheel', e => {
      e.preventDefault(); // Prevent native scroll
      targetScroll += e.deltaY;
      targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));
    }, { passive: false });

    // Handle keyboard scroll for desktop
    window.addEventListener('keydown', e => {
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                targetScroll = Math.max(0, targetScroll - scrollStep);
                break;
            case 'ArrowDown':
                e.preventDefault();
                targetScroll = Math.min(document.body.scrollHeight - window.innerHeight, targetScroll + scrollStep);
                break;
            case 'PageUp':
                e.preventDefault();
                targetScroll = Math.max(0, targetScroll - window.innerHeight);
                break;
            case 'PageDown':
                e.preventDefault();
                targetScroll = Math.min(document.body.scrollHeight - window.innerHeight, targetScroll + window.innerHeight);
                break;
            case 'Home':
                e.preventDefault();
                targetScroll = 0;
                break;
            case 'End':
                e.preventDefault();
                targetScroll = document.body.scrollHeight - window.innerHeight;
                break;
        }
    });

    // Handle touch start for mobile
    window.addEventListener('touchstart', e => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true }); // Use passive: true as we won't be preventing default here

    // Handle touch move for mobile
    window.addEventListener('touchmove', e => {
        const touchCurrentY = e.touches[0].clientY;
        const deltaY = touchStartY - touchCurrentY; // Calculate scroll direction and amount
        touchStartY = touchCurrentY; // Update for next touchmove event

        targetScroll += deltaY;
        targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));
        // You might want to consider e.preventDefault() here if the native scroll is still interfering
        // but test without it first, as it can make scrolling feel less natural.
        // e.preventDefault();
    }, { passive: false }); // Needs to be false if you decide to use preventDefault()

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
