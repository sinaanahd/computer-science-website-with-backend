# from os import name
# from django.contrib import auth
from django.contrib import admin
from django.urls import path , include
from Blog import views
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static
from django.urls import re_path


urlpatterns = [
    path('home/' , views.index , name='index'),
    path('login/' , auth_views.LoginView.as_view(template_name='login.html') , name='login'),
    path('posts/' , views.posts , name='posts'),
    path('posts/<slug:slug>/' , views.post_detail , name='post_detail'),
    path('admin/', admin.site.urls),
    path('gallery/' , views.photo_gallery , name='gallery'),
    path('about-us/' , views.about_us , name='about_us'),
    path('newses/' , views.newsew , name='newses'),
    path('newses/<slug:slug>' , views.news_detail , name='news_detail'),

    # api address
    re_path('api/posts/(?P<slug>[-\w]+)/', views.PostDetail.as_view()),
    path('api/posts/', views.PostList.as_view()),
    path('api/gallery/' , views.Gallery.as_view()),
    
    path('ckeditor/', include('ckeditor_uploader.urls')),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
