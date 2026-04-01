document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Mobile Toggle
    const sidebarToggles = document.querySelectorAll('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggles.length > 0 && sidebar) {
        sidebarToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });
        });
    }

    // Dynamic Section Switching
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.dashboard-section');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const sectionId = link.getAttribute('data-section');
            if (!sectionId) return;

            e.preventDefault();

            // Update Active Link
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Update Active Section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });

            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }

            // Scroll to top of content
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Logout Functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
});
