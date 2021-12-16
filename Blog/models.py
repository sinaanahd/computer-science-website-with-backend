from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField
from jalali_date import datetime2jalali


class Category(models.Model):

    name = models.CharField(max_length=200 , verbose_name='نام')

    def __str__(self):
        return self.name


class Post(models.Model):

    # create custom manager
    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    options = (
        ('draft' , 'Draft'),
        ('published' , 'Published'),
    )
    
    title = models.CharField(verbose_name='عنوان'  ,max_length=500)
    excerpt = models.TextField(null=True , verbose_name='خلاصه مطلب',max_length=500)
    content = RichTextField(config_name='full')
    category = models.ForeignKey(Category , on_delete=models.PROTECT , default=1 , verbose_name='دسته بندی' , null=True)
    date = models.DateTimeField(verbose_name='تاریخ انتشار')
    autor = models.ForeignKey(User , on_delete=models.PROTECT , verbose_name='نویسنده')
    status = models.CharField(max_length=10 , choices=options , default='published' , verbose_name='وضعیت')
    slug = models.SlugField(
        unique_for_date='date' ,
        allow_unicode=True ,
        max_length=200 ,
        help_text=("The name of the page as it will appear in URLs e.g http://domain.com/blog/[my-slug]/"),
        )

    def get_jalali_date(self):
        return datetime2jalali(self.date)

    objects = models.Manager()     # default manager
    postobjects = PostObjects()    # custom manager


    class Meta:
        ordering=('-date',)


    def __str__(self):
        return self.title



class PostImage(models.Model):
    
    image = models.ImageField(upload_to='PostImage' , blank=True , verbose_name='تصاویر')
    post = models.ForeignKey(Post , on_delete=models.PROTECT , default=1)
    desc = models.CharField(max_length=1000 , verbose_name='توضیحات' , null=True , blank=True)

class GalleryImage(models.Model):

    image = models.ImageField(upload_to='Gallery' , verbose_name='تصویر')
    desc = models.CharField(max_length=200 , verbose_name='عکس نوشت' , null=True , blank=True)


class Video(models.Model):

    video = models.FileField(upload_to='videos' , verbose_name='ویدیو', blank=True)
    post = models.ForeignKey(Post , on_delete=models.PROTECT , default=1)


class Profile(models.Model):

    user = models.ForeignKey(User , on_delete=models.PROTECT , )
    image = models.ImageField(verbose_name='تصویر' , blank=True , upload_to='profile')
    desc = models.TextField(max_length=5000 , verbose_name='توضیحات' , )