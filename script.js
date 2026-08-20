// Suman Kumar Sardar — Interactive Script & Theme Toggle Logic

(function () {
  // Safe localStorage helper
  const getStorage = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  };

  const setStorage = (key, val) => {
    try {
      localStorage.setItem(key, val);
    } catch (e) {}
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    if (document.body) {
      document.body.setAttribute('data-theme', theme);
    }
    setStorage('portfolio-theme', theme);
  };

  // Initialize theme as early as possible
  const initialTheme = getStorage('portfolio-theme') || 'dark';
  setTheme(initialTheme);

  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('[data-header]');
    const menuButton = document.querySelector('[data-menu-toggle]');
    const nav = document.querySelector('[data-nav]');
    const yearElement = document.querySelector('[data-year]');
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Ensure theme is set on DOM ready
    const activeTheme = getStorage('portfolio-theme') || 'dark';
    setTheme(activeTheme);

    // Auto-update Footer Copyright Year
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }

    // Toggle Theme Click Event
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
      });
    }

    // Header Scroll Effect
    const updateHeaderState = () => {
      if (header) {
        header.classList.toggle('is-scrolled', window.scrollY > 20);
      }
    };
    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });

    // Mobile Navigation Toggle
    if (menuButton && nav) {
      menuButton.addEventListener('click', () => {
        const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', String(!isOpen));
        nav.classList.toggle('is-open', !isOpen);
      });

      nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          nav.classList.remove('is-open');
          menuButton.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Reveal Observer for Scroll Animations
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
      );
      revealElements.forEach((el) => revealObserver.observe(el));
    } else {
      revealElements.forEach((el) => el.classList.add('is-visible'));
    }
  });
})();
