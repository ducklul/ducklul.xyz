document.addEventListener('DOMContentLoaded', () => {
  // Mac window controls (your existing code)
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

  closeBtn.addEventListener('click', showDropdown);
  dropdownCloseBtn.addEventListener('click', hideDropdown);
  maximizeBtn.addEventListener('click', () => {
    window.open(window.location.href, '_blank');
  });

  // Smooth scroll for nav links with offset for sticky header
  const headerOffset = 80;
  const navLinks = document.querySelectorAll('nav.nav-box a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });

  // Custom smooth scroll on desktop mouse wheel only
  // Detect if device is touch-capable
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

  if (!isTouchDevice) {
    let targetScroll = window.scrollY;
    let currentScroll = window.scrollY;
    const ease = 0.1;

    window.addEventListener('wheel', e => {
      e.preventDefault();

      targetScroll += e.deltaY;
      targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));
    }, { passive: false });

    function smoothScroll() {
      currentScroll += (targetScroll - currentScroll) * ease;
      window.scrollTo(0, currentScroll);
      requestAnimationFrame(smoothScroll);
    }

    smoothScroll();
  }
});



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
