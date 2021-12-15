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

function renderPost(post) {
    const singlePost = document.createElement("div");
    singlePost.classList.add("single-post");
    const singlePostContent = `
        <div class="single-post">
                <img src="${images[0].image}" alt="${images[0].desc}">
                <h2> ${post.title}</h2>
                <span class="post-deatials">
                    <p class="date">
                        ${post.date}
                    </p>
                    <a href="#" class="author">
                        ${post.user.username}
                    </a>
                </span>
                <p class="post-content">
                    ${post.excerpt}    
                </p>
                <a href="post/${post.slug}" class="show-more">
                    ادامه ...
                </a>
            </div>
        `;
    singlePost.innerHTML = singlePostContent;
}