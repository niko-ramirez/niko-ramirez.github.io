document.addEventListener('DOMContentLoaded', function() {
    // Get all sections
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#colorlib-main-menu ul li a');
    const navbarToggle = document.querySelector('.js-colorlib-nav-toggle');
    const navbar = document.querySelector('#colorlib-main-menu');

    // Mobile navbar toggle functionality
    if (navbarToggle && navbar) {
        navbarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navbar.classList.toggle('active');
            navbarToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && !navbarToggle.contains(e.target)) {
                navbar.classList.remove('active');
                navbarToggle.classList.remove('active');
            }
        });
    }

    // Function to show a specific section and hide others
    function showSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            
            // Update active state
            navLinks.forEach(link => link.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');

            // Close mobile menu after clicking a link
            if (navbar && navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                navbarToggle.classList.remove('active');
            }
        });
    });

    // Show the first section by default
    if (sections.length > 0) {
        showSection(sections[0].id);
        navLinks[0].parentElement.classList.add('active');
    }
}); 