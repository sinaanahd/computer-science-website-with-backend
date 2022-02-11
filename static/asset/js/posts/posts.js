import { HeaderFooter } from "../main/template.js";

//menu

//dynamic posts
const categoryWrapper = document.querySelector('.filter-posts-ul');
let allCats = ["همه"];
let allCatsBtn = [];
const postsWrapper = document.querySelector('.postwarpper');
document.addEventListener('DOMContentLoaded', () => {
    HeaderFooter.renderHeader();
    HeaderFooter.renderFooter();
    openMenu();
    closeMenuFunc();
    axios
        .get("http://127.0.0.1:8000/api/")
        .then((res) => {
            const allPosts = res.data;
            const lastNewsTag = document.querySelector('.last-news-content');
            let newses = allPosts.filter((post) => post.cat.name === "news");
            lastNewsTag.innerHTML = newses[0].title;
            let posts = allPosts.filter((post) => post.cat.name !== "news");
            posts.forEach(post => {
                renderPost(post);
            });
            filterPosts("همه", posts);
            renderCatBtns(posts);
            allCatsBtn.forEach(btn => {
                btn.addEventListener("click", (e) => {
                    let clickedCat = btn.querySelector('.cat-name').textContent;
                    deactivateActive(allCatsBtn, "active");
                    btn.classList.add('active');
                    filterPosts(clickedCat, posts);
                })
            })
        })
        .catch((err) => console.log(err))
})
function changeDate(dateArray) {
    let splitedDate = dateArray.split('T');
    let splitedDigits = splitedDate[0].split('-');
    let date = new Date(splitedDigits[0], splitedDigits[1], splitedDigits[2]);
    //console.log(date.toLocaleDateString('fa-IR'));
    let finalDate = date.toLocaleDateString('fa-IR');
    return finalDate;
}

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

function renderPost(post) {
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
                    <a href="#" class="category">
                        ${post.cat.name}
                    </a>
                    <a href="#" class="author">
                        ${post.user.username}
                    </a>
                </span>
                <p class="post-content">
                    ${post.excerpt} ...   
                </p>
                <a href="http://127.0.0.1:8000/posts/${post.slug}" class="show-more" traget="_blank">
                    ادامه ...
                </a>`;
    singlePost.innerHTML = singlePostContent;
    postsWrapper.appendChild(singlePost);
}
function deactivateActive(arr, className) {
    arr.forEach(e => {
        e.classList.remove(className);
    })
}
function filterPosts(cat, allposts) {
    clearDom();
    let thisCatPosts = [];
    allposts.forEach(post => {
        if (cat === "همه") {
            thisCatPosts.push(post);
        }
        else if (post.cat.name === cat) {
            thisCatPosts.push(post);
        }
    })
    thisCatPosts.forEach(post => {
        renderPost(post);
    })
}
function clearDom() {
    postsWrapper.innerHTML = " ";
}
function renderCatBtns(allPosts) {
    let btnId = 1;
    allPosts.forEach(post => {
        if (!allCats.some(element => element === post.cat.name)) {
            allCats.push(post.cat.name);
        }
    })
    allCats.forEach(cat => {
        const btn = document.createElement('li');
        btn.classList.add('post-cats-btns');
        btn.setAttribute("data-id", btnId);
        let btnContent = " ";
        if (btnId === 1) {
            btn.classList.add('active');
            btnContent = `
                    <span>
                    <i class="fa fa-cubes"></i>
                    <span class="cat-name">همه</span>
                    </span>
                `;
        }
        else {
            btnContent = `
                    <span>
                    <i class="fa fa-cubes"></i>
                        <span class="cat-name">${cat}</span>
                    </span>
                `;
        }
        btn.innerHTML = btnContent;
        categoryWrapper.appendChild(btn);
        btnId++;
        allCatsBtn = [...document.querySelectorAll('.post-cats-btns')];
    })
}