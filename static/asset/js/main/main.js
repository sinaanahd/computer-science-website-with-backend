/* -------- imports --------*/
import { allNews } from "../news/news-data.js";
import { HeaderFooter } from "./template.js";

// let date = new Date(1995, 11, 17)
// let neededDate = date.toLocaleDateString('fa-IR');
// console.log(neededDate);
/* -------- variables --------- */
//image gallery
const galleryWrapper = document.querySelector('.photo-wrapper');
const galleryImagesArray = [...document.querySelectorAll('.gallery-photo')];
//menu
// const burgerIcon = document.querySelector('.burgerIcon');
// const closeMenu = document.querySelector('.menuCloser');
// const mainMenu = document.querySelector('.main-menu-container')
//news
const allNewsData = allNews;
const newsWrapperTag = document.querySelector('.news-wrapper');
const lastNewsTag = document.querySelector('.last-news-content');
//posts
let allPostsData = [];
const postsWrapper = document.querySelector('.posts');
const categoryWrapper = document.querySelector('.filter-posts-ul');
let allCats = ["همه"];
let allCatsBtn = [];
/* -------- events --------- */
//image gallery
//http://127.0.0.1:8000/api/posts/
document.addEventListener('DOMContentLoaded', () => {
    HeaderFooter.renderFooter();
    HeaderFooter.renderHeader();
    openMenu();
    closeMenuFunc();
    axios
        .get("http://127.0.0.1:8000/api/posts/")
        .then((res) => {
            console.log(window.location.pathname);
            allPostsData = res.data;
            console.log(allPostsData);
            let posts = allPostsData.filter((post) => post.cat.name !== "news");
            const post = new Post();
            post.renderCatBtns(posts);
            post.filterPosts("همه", posts);
            allCatsBtn.forEach(btn => {
                btn.addEventListener("click", (e) => {
                    let clickedCat = btn.querySelector('.cat-name').textContent;
                    deactivateActive(allCatsBtn, "active");
                    btn.classList.add('active');
                    post.filterPosts(clickedCat, posts);
                })
            });
            let newses = allPostsData.filter(post => post.cat.name === "news");
            newses = lastThree(newses);
            newses.forEach(news => {
                post.renderNews(news);
            })
        })
        .catch((err) => console.log(err))
    // const news = new News();
    // const lastThreeNews = allNewsData.slice(allNewsData.length - 3, allNewsData.length);
    // news.lastNewsRender();
    // lastThreeNews.forEach(n => {
    //     news.renderNews(n);
    // });

});
galleryImagesArray.forEach(img => {
    img.addEventListener("mouseenter", e => {
        img.classList.add("hover");
        galleryWrapper.classList.add("blur");
    })
    img.addEventListener("mouseleave", e => {
        img.classList.remove("hover");
        galleryWrapper.classList.remove("blur");
    })
});



//menu

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
function lastThree(arr) {
    return arr.splice(0, 3);
}
function deactivateActive(arr, className) {
    arr.forEach(e => {
        e.classList.remove(className);
    })
}



//classes
// class News {
//     renderNews(news) {
//         const singleNews = document.createElement('div');
//         singleNews.classList.add('single-news');
//         const singleNewsContent = `<img src="${news.imageUrl}" alt="عکس اخبار" class="news-image">
//                 <div class="news-contentwrpaper">
//                     <h4>${news.title}</h4>
//                     <span class="news-date">${news.date}</span>
//                     <p class="news-content">
//                     ${news.content}
//                     </p>
//                     <a href="${news.link}" class="read-more-news-btn">
//                         بیشتر بخوانید ...
//                     </a>
//                 </div>`;
//         singleNews.innerHTML = singleNewsContent;
//         newsWrapperTag.appendChild(singleNews);
//     }
//     lastNewsRender() {
//         lastNewsTag.innerHTML = allNewsData[allNewsData.length - 1].title;
//     }
// }

class Post {
    renderPosts(post) {
        const changedDate = changeDate(post.datetime);
        const singlePostTag = document.createElement('div');
        singlePostTag.classList.add('single-post');
        const singlePostContent = `<div class="post-image">
        <img src="${post.images[0].image}" alt="عکس مقاله">
    </div>
    <div class="posts-content">
        <h4>${post.title}</h4>
        <div class="post-detail">
            <span>
                <a href="#" class="post-category">
                    ${post.cat.name}
                </a>
            </span>
            <span class="post-date">${changedDate}</span>
        </div>
        <p class="post-text">
        ${post.excerpt} ... 
        </p>
        <a href="posts/${post.slug}" class="post-more-btn">
            بیشتر بخوانید...
        </a>
    </div>`;
        singlePostTag.innerHTML = singlePostContent;
        postsWrapper.appendChild(singlePostTag);

    }
    renderNews(news) {
        const changedDate = changeDate(news.datetime);
        const singleNewsTag = document.createElement('div');
        singleNewsTag.classList.add('single-news');
        const singleNewsContent = `<img src="${news.images[0].image}" alt="عکس اخبار" class="news-image">
                <div class="news-contentwrpaper">
                    <h4>${news.title}</h4>
                    <span class="news-date">${changedDate}</span>
                    <p class="news-content">
                    ${news.excerpt}
                    </p>
                    <a href="${news.slug}" class="read-more-news-btn">
                        بیشتر بخوانید ...
                    </a>
                </div>`;
        singleNewsTag.innerHTML = singleNewsContent;
        newsWrapperTag.appendChild(singleNewsTag);
    }
    renderCatBtns(allPosts) {
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
    filterPosts(cat, allposts) {
        this.clearDom();
        let thisCatPosts = [];
        allposts.forEach(post => {
            if (cat === "همه") {
                thisCatPosts.push(post);
            }
            else if (post.cat.name === cat) {
                thisCatPosts.push(post);
            }
        })
        thisCatPosts = lastThree(thisCatPosts);
        thisCatPosts.forEach(post => {
            this.renderPosts(post);
        })
    }
    clearDom() {
        postsWrapper.innerHTML = "";
    }
}
