import { HeaderFooter } from "../main/template.js";

const singlePostWrapper = document.querySelector('.single-post-wrapper');
const postsWrapper = document.querySelector('.postwarpper');
const otherPostsTitle = document.querySelector('.other-post-title');
document.addEventListener('DOMContentLoaded', () => {
    HeaderFooter.renderHeader();
    HeaderFooter.renderFooter();
    openMenu();
    closeMenuFunc();
    const postSlug = window.location.pathname;
    //console.log(postSlug.split('/')[2]);
    const requestedPost = postSlug.split('/')[2];
    const singlePostApi = "http://127.0.0.1:8000/api/" + requestedPost;
    axios
        .get(singlePostApi)
        .then((res) => {
            const clickedPost = res.data;
            renderPost(clickedPost);
            localStorage.setItem('clickedPost', JSON.stringify(clickedPost));

        })
        .catch((err) => console.log(err))
    axios
        .get("http://127.0.0.1:8000/api/")
        .then((res) => {
            let relatedPosts = res.data;
            const clickedPost = JSON.parse(localStorage.getItem('clickedPost'));
            const lastNewsTag = document.querySelector('.last-news-content');
            lastNewsTag.innerHTML = relatedPosts.filter((post) => post.cat.name === "news")[0].title;
            if (clickedPost.cat.name === "news") {
                relatedPosts = relatedPosts.filter((post) => post.cat.name === "news");
                lastNewsTag.innerHTML = relatedPosts[0].title;
                document.title = "اخبار انجمن علمی علوم کامپیوتر";
            }
            else {
                relatedPosts = relatedPosts.filter((post) => post.cat.name !== "news");
                otherPostsTitle.innerHTML = "دیگر مقالات";
                document.title = "مقالات انجمن علمی علوم کامپیوتر";
            }
            //console.log(clickedPost);
            relatedPosts = relatedPosts.filter((post) => post.slug !== clickedPost.slug)
            relatedPosts = lastFour(relatedPosts);
            relatedPosts.forEach(post => {
                renderRelated(post);
            });
        })
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
function renderPost(post) {
    // console.log(post)
    const changedDate = changeDate(post.datetime);
    const postWrapper = document.createElement('article');
    postWrapper.classList.add('single-post');
    const postContent = `
        <h1>${post.title}</h1>
        <img src="${post.images[0].image}" alt="تصویر مقاله">
        <div class="singlepost-details">
        ${post.cat.name !== "news" ? `<span class="post-cat">
            ${post.cat.name}
        </span>` : ' '}
        <span class="post-author">${post.user.username}</span>
        <span>${changedDate}</span>
        </div>
        ${post.content}
    `;
    postWrapper.innerHTML = postContent;
    singlePostWrapper.appendChild(postWrapper);
}
function renderRelated(post) {
    const singlePost = document.createElement("div");
    singlePost.classList.add("single-post");
    const changedDate = changeDate(post.datetime);

    const singlePostContent = `
                <img src="../..${post.images[0].image}" alt="${post.images[0].desc}">
                <h2> ${post.title}</h2>
                <span class="post-deatials">
                    <p class="date">
                        ${changedDate}
                    </p>
                    ${post.cat.name !== "news" ? `<a href="#" class="category">
                        ${post.cat.name}
                    </a>` : ' '}
                    
                    <a href="#" class="author">
                        ${post.user.username}
                    </a>
                </span>
                <p class="post-content">
                    ${post.excerpt} ...   
                </p>
                <a href="http://127.0.0.1:8000/posts/${post.slug}" class="show-more">
                    ادامه ...
                </a>`;
    singlePost.innerHTML = singlePostContent;
    postsWrapper.appendChild(singlePost);
}
function lastFour(arr) {
    return arr.splice(0, 4);
}