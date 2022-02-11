import { HeaderFooter } from "../main/template.js";

//menu

document.addEventListener('DOMContentLoaded', () => {
    HeaderFooter.renderHeader();
    HeaderFooter.renderFooter();
    openMenu();
    closeMenuFunc();
    axios
        .get("http://127.0.0.1:8000/api/")
        .then((res) => {
            let relatedPosts = res.data;
            relatedPosts = relatedPosts.filter((post) => post.cat.name === "news");
            const lastNewsTag = document.querySelector('.last-news-content');
            lastNewsTag.innerHTML = relatedPosts[0].title;
        })
})

function openMenu() {
    const burgerIcon = document.querySelector('.burgerIcon');
    const closeMenu = document.querySelector('.menuCloser');
    const mainMenu = document.querySelector('.main-menu-container')
    burgerIcon.addEventListener("click", e => {
        mainMenu.style.transform = "translateX(0)";
        closeMenu.classList.add('menu-actived');
        document.querySelector('body').style.overflowY = "hidden";
    });
}
function closeMenuFunc() {
    const closeMenu = document.querySelector('.menuCloser');
    const mainMenu = document.querySelector('.main-menu-container')
    closeMenu.addEventListener("click", () => {
        mainMenu.style.transform = "translateX(-100vw)";
        closeMenu.classList.remove('menu-actived');
        document.querySelector('body').style.overflowY = "unset";
    });
}