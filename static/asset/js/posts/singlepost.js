import { HeaderFooter } from "../main/template.js";

const newsWrapper = document.querySelector('.newses-wrapper');

document.addEventListener('DOMContentLoaded', () => {
    HeaderFooter.renderHeader();
    HeaderFooter.renderFooter();
    openMenu();
    closeMenuFunc();
    const postSlug = window.location.pathname;
    console.log(postSlug);
    axios
        .get(`http://127.0.0.1:8000/api/posts`)
        .then((res) => {
            console.log(res.data[4] == postSlug);
        })
        .catch((err) => console.log(err))
});
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
function changeDate(dateArray) {
    let splitedDate = dateArray.split('T');
    let splitedDigits = splitedDate[0].split('-');
    let date = new Date(splitedDigits[0], splitedDigits[1], splitedDigits[2]);
    //console.log(date.toLocaleDateString('fa-IR'));
    let finalDate = date.toLocaleDateString('fa-IR');
    return finalDate;
}
function renderPost(news) {
    const changedDate = changeDate(news.datetime);


}