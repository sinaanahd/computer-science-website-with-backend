/* -------- imports --------*/
import { allNews } from "../news/news-data.js";
/* -------- variables --------- */
let today = new Date().toLocaleDateString('fa-IR');
console.log(today);

//image gallery
const galleryWrapper = document.querySelector('.photo-wrapper');
const galleryImagesArray = [...document.querySelectorAll('.gallery-photo')];
//menu
const burgerIcon = document.querySelector('.burgerIcon');
const closeMenu = document.querySelector('.menuCloser');
const mainMenu = document.querySelector('.main-menu-container')
//news
const allNewsData = allNews;
const newsWrapperTag = document.querySelector('.news-wrapper');
const lastNewsTag = document.querySelector('.last-news-content');
//posts
let allPostsData = [];
const postsWrapper = document.querySelector('.posts');
const allCatsBtns = [...document.querySelectorAll('.post-cats-btns')];
/* -------- events --------- */
//image gallery
//http://127.0.0.1:8000/api/posts/
document.addEventListener('DOMContentLoaded', () => {
    axios
        .get("http://127.0.0.1:8000/api/posts/")
        .then((res) => {
            allPostsData = res.data;
            const post = new Post();
            post.activeCatIdentifier();
            post.filterPosts(allPostsData[0].cat.name);
            allCatsBtns.forEach(btn => {
                const posts = new Post();
                btn.addEventListener('click', () => {
                    post.activeCatIdentifier(btn);
                    switch (eval(btn.dataset.id)) {
                        case 1: {
                            posts.filterPosts("ai");
                            break;
                        }
                        case 2: {
                            posts.filterPosts("دسته بندی ۲");
                            break;
                        }
                        case 3: {
                            posts.filterPosts("دسته بندی ۳");
                            break;
                        }
                        case 4: {
                            posts.filterPosts("دسته بندی ۴");
                            break;
                        }
                        case 5: {
                            posts.filterPosts("دسته بندی ۵");
                            break;
                        }
                        case 6: {
                            posts.filterPosts("دسته بندی ۶");
                            break;
                        }
                        case 7: {
                            posts.filterPosts("دسته بندی ۷");
                            break;
                        }
                        case 8: {
                            posts.filterPosts("دسته بندی ۸");
                            break;
                        }
                        default: {
                            console.log('defualt')
                            break;
                        }
                    }
                })
            });
        })
        .catch((err) => console.log(err))
    const news = new News();
    const lastThreeNews = allNewsData.slice(allNewsData.length - 3, allNewsData.length);
    news.lastNewsRender();
    lastThreeNews.forEach(n => {
        news.renderNews(n);
    });

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

//classes
class News {
    renderNews(news) {
        const singleNews = document.createElement('div');
        singleNews.classList.add('single-news');
        const singleNewsContent = `<img src="${news.imageUrl}" alt="عکس اخبار" class="news-image">
                <div class="news-contentwrpaper">
                    <h4>${news.title}</h4>
                    <span class="news-date">${news.date}</span>
                    <p class="news-content">
                    ${news.content}
                    </p>
                    <a href="${news.link}" class="read-more-news-btn">
                        بیشتر بخوانید ...
                    </a>
                </div>`;
        singleNews.innerHTML = singleNewsContent;
        newsWrapperTag.appendChild(singleNews);
    }
    lastNewsRender() {
        lastNewsTag.innerHTML = allNewsData[allNewsData.length - 1].title;
    }
}

class Post {
    renderPosts(post) {
        //console.log(post);
        const singlePostTag = document.createElement('div');
        singlePostTag.classList.add('single-post');
        const singlePostContent = `<div class="post-image">
        <img src="${post.imageUrl}" alt="عکس مقاله">
    </div>
    <div class="posts-content">
        <h4>${post.title}</h4>
        <div class="post-detail">
            <span>
                <a href="#" class="post-category">
                    ${post.cat.name}
                </a>
            </span>
            <span class="post-date">${post.date}</span>
        </div>
        <p class="post-text">
        ${post.excerpt}
        </p>
        <a href="post/${post.slug}" class="post-more-btn">
            بیشتر بخوانید...
        </a>
    </div>`;
        singlePostTag.innerHTML = singlePostContent;
        postsWrapper.appendChild(singlePostTag);

    }
    filterPosts(category) {
        this.clearDom();
        const lastTwoPosts = [];
        allPostsData.forEach(post => {
            if (post.cat.name === category) {
                lastTwoPosts.push(post);
            }
        });
        lastTwoPosts.slice(lastTwoPosts.length - 2, lastTwoPosts.length).forEach(lastPost => {
            this.renderPosts(lastPost);
        })
    }
    clearDom() {
        postsWrapper.innerHTML = "";
    }
    activeCatIdentifier(btn = allCatsBtns[0]) {
        allCatsBtns.forEach(b => {
            b.classList.remove('active');
        });
        btn.classList.add("active");
    }
}
