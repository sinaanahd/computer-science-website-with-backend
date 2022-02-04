const postsWrapper = document.querySelector('.postwarpper');
document.addEventListener('DOMContentLoaded', () => {
    HeaderFooter.renderHeader();
    HeaderFooter.renderFooter();
    openMenu();
    closeMenuFunc();
    axios
        .get("http://127.0.0.1:8000/api/posts/")
        .then((res) => {
            const allPosts = res.data;
            console.log(allPosts);
            allPosts.forEach(post => {
                renderPost(post);
            });
        })
        .catch((err) => console.log(err))
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