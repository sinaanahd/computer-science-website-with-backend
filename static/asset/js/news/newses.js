import { HeaderFooter } from "../main/template.js";

const newsWrapper = document.querySelector('.newses-wrapper');
document.addEventListener('DOMContentLoaded', () => {
    HeaderFooter.renderHeader();
    HeaderFooter.renderFooter();
    openMenu();
    closeMenuFunc();
    axios
        .get("http://127.0.0.1:8000/api/")
        .then((res) => {
            const allAPIdata = res.data;
            const lastNewsTag = document.querySelector('.last-news-content');
            let newses = allAPIdata.filter((post) => post.cat.name === "news");
            lastNewsTag.innerHTML = newses[0].title;
            newses.forEach(news => {
                renderNews(news);
            });
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
function renderNews(news) {
    const changedDate = changeDate(news.datetime);
    const singleNewsTag = document.createElement('div');
    singleNewsTag.classList.add('single-news');
    const singleNewsContent = `
    <img src="${news.images[0].image}" alt="تصویر برای اخبار">
                <h2 class="news-title">${news.title}</h2>
                <span class="news-date">${changedDate}</span>
                <p class="news-content">
                    ${news.excerpt}
                </p>
                <a href="http://127.0.0.1:8000/posts/${news.slug}" target="_blank" class="show-more"> ادامه ... </a>
    `;
    singleNewsTag.innerHTML = singleNewsContent;

    newsWrapper.appendChild(singleNewsTag);

}