//menu

const burgerIcon = document.querySelector('.burgerIcon');
const closeMenu = document.querySelector('.menuCloser');
const mainMenu = document.querySelector('.main-menu-container');
//menu

burgerIcon.addEventListener("click", e => {
    mainMenu.style.transform = "translateX(0)";
    closeMenu.classList.add('menu-actived');
    document.querySelector('body').style.overflowY = "hidden";
});
closeMenu.addEventListener("click", () => {
    mainMenu.style.transform = "translateX(-100vw)";
    closeMenu.classList.remove('menu-actived');
    document.querySelector('body').style.overflowY = "unset";
});