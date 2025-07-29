document.addEventListener('DOMContentLoaded', () => {
  // Mac window controls
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
    dropdown.addEventListener(
      'animationend',
      () => {
        dropdown.classList.add('hidden');
        macControls.style.display = 'flex';
        dropdown.classList.remove('slide-up');
      },
      { once: true }
    );
  }

  closeBtn.addEventListener('click', showDropdown);
  dropdownCloseBtn.addEventListener('click', hideDropdown);
  maximizeBtn.addEventListener('click', () => {
    window.open(window.location.href, '_blank');
  });

  // Smooth scroll for nav links
  const headerOffset = 80;
  const navLinks = document.querySelectorAll('nav.nav-box a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();

      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      // Calculate position accounting for sticky header offset
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      // Scroll smoothly using native behavior
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
});
