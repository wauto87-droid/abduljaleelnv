document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header .container');
    const nav = document.querySelector('.nav-links');

    // Create Hamburger Button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
    hamburger.setAttribute('aria-label', 'Toggle Menu');

    // Insert before nav
    header.insertBefore(hamburger, nav);

    // Toggle Logic
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = hamburger.querySelector('i');

        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close on Link Click
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });
});
