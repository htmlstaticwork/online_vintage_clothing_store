document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Toggle logic for Dark Mode and RTL
    const themeBtn = document.getElementById('theme-toggle');
    const rtlBtn = document.getElementById('rtl-toggle');

    // Initialize from LocalStorage
    initTheme();
    initRtl();

    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
    
    if (rtlBtn) {
        rtlBtn.addEventListener('click', toggleRtl);
    }
});

function initTheme() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    }
}

function updateThemeIcon(isDark) {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        if (isDark) {
            themeBtn.innerHTML = '☀️'; // Sun icon for switching back to light
        } else {
            themeBtn.innerHTML = '🌙'; // Moon for dark mode
        }
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    updateThemeIcon(isDark);
}

function initRtl() {
    const isRtl = localStorage.getItem('rtlMode') === 'true';
    if (isRtl) {
        document.documentElement.setAttribute('dir', 'rtl');
    }
}

function toggleRtl() {
    const currentDir = document.documentElement.getAttribute('dir');
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem('rtlMode', newDir === 'rtl');
}
