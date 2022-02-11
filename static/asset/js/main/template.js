export class HeaderFooter {
    static renderHeader() {
        const headerTag = document.querySelector('.header');
        headerTag.innerHTML = `<div class="firts-row">
            <div class="contact-info">
                <div>
                    <span class="contact-info-icon">
                        <i class="fa fa-phone"></i>
                    </span>
                    <span class="info-content">
                        تماس با ما : <a href="tel:+98131111111">013-11111111</a>
                    </span>
                </div>
                <div>
                    <span class="contact-info-icon">
                        <i class="fa fa-envelope"></i>
                    </span>
                    <span class="info-content">
                        ایمیل انجمن : <a href="mailto:info@guilan.ac.ir">info@guilan.ac.ir</a>
                    </span>
                </div>
                <div class="latest-news">
                    <span class="last-news">اخبار</span>
                    <span class="last-news-content"></span>
                </div>
            </div>
            <div class="social-icons">
                <ul>
                    <li><a href="#"><i class="fa fa-telegram"></i></a></li>
                    <li><a href="#"><i class="fa fa-instagram"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                </ul>
            </div>
        </div>
        <div class="main-header">
            <div class="logo">
                <a href="http://127.0.0.1:8000/">
                    <img src="../../static/asset/images/logo-big-02.png" alt="لوگوی انجمن"/>
                </a>
            </div>
            <div class="main-menu-container">
                <p class="show-in-small">منوی وب سایت انجمن</p>
                <nav class="main-menu">
                    <ul>
                        <li><a href="http://127.0.0.1:8000/"  ${document.title === "انجمن علوم کامپیوتر دانشگاه" ? 'class="active"' : " "}>خانه</a></li>
                        <li><a href="http://127.0.0.1:8000/about-us/" ${document.title === "درباره انجمن علمی علوم کامپیوتر" ? 'class="active"' : " "} target="_blank">درباره انجمن</a></li>
                        <li><a href="http://127.0.0.1:8000/gallery/" ${document.title === "گالری تصاویر" ? 'class="active"' : " "} target="_blank">گالری تصاویر</a></li>
                        <li><a href="http://127.0.0.1:8000/posts" ${document.title === "مقالات انجمن علوم کامپیوتر دانشگاه گیلان" ? 'class="active"' : " "} target="_blank">مقالات</a></li>
                        <li><a href="http://127.0.0.1:8000/newses" ${document.title === "اخبار انجمن علمی علوم کامپیوتر دانشگاه گیلان" ? 'class="active"' : " "} target="_blank">اخبار</a></li>
                    </ul>
                </nav>
            </div>
            <div class="burgerIcon">
                <i class="fa fa-bars"></i>
                </div>
                </div>`;
    }
    static renderFooter() {
        const footerTag = document.querySelector('.footer')
        footerTag.innerHTML = `<div class="footer-col">
            <img src="../../static/asset/images/logo-big-02.png" class="footer-logo"/>
            <p>
                متن نمونه برای قرار دهی در قسمت پاورقی برای توضیح کوتاه انجمن علوم کامپیوتر دانشگاه گیلان
            </p>
            <span class="foooter-call-links">
                <a href="tel:+98111111111"><bdi>+۹۸ ۱۳ ۱۱۱۱۱۱</bdi><i class="fa fa-phone"></i></a>
                <a href="tel:+98111111111"><bdi>+۹۸ ۱۳ ۱۱۱۱۱۱</bdi><i class="fa fa-phone"></i></a>
            </span>
        </div>
        <div class="footer-col">
            <h4>
                لینک های کاربردی
            </h4>
            <ul>
                <li><a href="#">لینک کاربردی ۱</a></li>
                <li><a href="#">لینک کاربردی ۲</a></li>
                <li><a href="#">لینک کاربردی ۳</a></li>
                <li><a href="#">لینک کاربردی ۴</a></li>
                <li><a href="#">لینک کاربردی ۵</a></li>
            </ul>
        </div>
        <div class="footer-col">
            <h4>
                درباره انجمن
            </h4>
            <ul>
                <li><a href="http://127.0.0.1:8000/about-us/">درباره ما</a></li>
                <li><a href="http://127.0.0.1:8000/gallery/">گالری تصاویر</a></li>
                <li><a href="http://127.0.0.1:8000/newses">اخبار</a></li>
                <li><a href="http://127.0.0.1:8000/posts">مقالات</a></li>
            </ul>
        </div>
        <div class="footer-col">
            <a href="#" class="login-btn">
                ورود به داشبورد 
            </a>
            <ul class="social-footer">
                <li>
                    <a href="#"><i class="fa fa-instagram"></i></a>
                </li>
                <li>
                    <a href="#"><i class="fa fa-telegram"></i></a>
                </li>
                <li>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                </li>
            </ul>
        </div>`;
    }
}