// Переключение активной ссылки на основе текущего URL
function setActiveLink() {
    // Получаем текущий путь страницы
    const path = window.location.pathname;
    
    // Убираем класс 'active-link' у всех элементов навигации
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => link.classList.remove('active-link'));

    // Определяем, какой элемент нужно сделать активным в зависимости от текущего пути
    const activeLink = document.querySelector(`.nav__link[href="${path}"]`);
    if (activeLink) {
        activeLink.classList.add('active-link');
    }
}

// Вызываем функцию при загрузке страницы
window.addEventListener('DOMContentLoaded', setActiveLink);

// Также можно вызывать при изменении URL, если используете SPA (Single Page Application)
window.addEventListener('popstate', setActiveLink);






