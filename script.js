document.addEventListener('DOMContentLoaded', () => {
  // Mac window controls (still functional)
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

  // All scrolling-related behavior is disabled for testing.
  // This allows you to test native anchor scrolling via CSS alone.
});
