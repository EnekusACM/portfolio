document.addEventListener('DOMContentLoaded', () => {
    const toggleMenuButton = document.getElementById('toggleMenu');
    const sidebar = document.getElementById('sidebar');

    if (toggleMenuButton && sidebar) {
        toggleMenuButton.addEventListener('click', () => {
            sidebar.classList.toggle('open'); // Alternar la clase 'open' en el contenedor #sidebar
        });
    } else {
        console.error('No se encontraron los elementos #toggleMenu o #sidebar en el DOM.');
    }
});