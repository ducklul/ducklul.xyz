//javascript
document.addEventListener('DOMContentLoaded', () => {
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
  
  
   document.addEventListener('DOMContentLoaded', () => {
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



  const headerOffset = 80;
  const navLinks = document.querySelectorAll('nav.nav-box a[href^="#"]');
  let isAnimating = false; 
  let animationFrameId;

  function smoothScrollTo(targetY) {
    cancelAnimationFrame(animationFrameId);
    isAnimating = true;

    function animate() {
      const currentY = window.scrollY;
      const distance = targetY - currentY;
      const step = distance * 0.15; 

      if (Math.abs(distance) < 1) {
        window.scrollTo(0, targetY);
        isAnimating = false;
        return;
      }

      window.scrollTo(0, currentY + step);
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const scrollToPosition = elementPosition - headerOffset;

      smoothScrollTo(scrollToPosition);
    });
  });

  window.addEventListener('wheel', () => {
    if (isAnimating) {
      cancelAnimationFrame(animationFrameId);
      isAnimating = false;
    }
  }, { passive: true });

  window.addEventListener('touchstart', () => {
    if (isAnimating) {
      cancelAnimationFrame(animationFrameId);
      isAnimating = false;
    }
  }, { passive: true });

  window.addEventListener('keydown', (e) => {

    const keysToCancel = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'];
    if (keysToCancel.includes(e.key) && isAnimating) {
      cancelAnimationFrame(animationFrameId);
      isAnimating = false;
    }
  }, { passive: true });

});

