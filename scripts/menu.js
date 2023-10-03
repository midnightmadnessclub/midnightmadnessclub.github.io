document.addEventListener('DOMContentLoaded', function () {
    const mainNav = document.getElementById('main-nav');
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');

    menuToggle.onclick = () => mainNav.style.display = 'block';
    menuClose.onclick = () => mainNav.style.display = 'none';
});
