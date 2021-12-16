# Generated by Django 4.0 on 2021-12-15 18:58

import ckeditor.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, verbose_name='نام')),
            ],
        ),
        migrations.CreateModel(
            name='GalleryImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='Gallery', verbose_name='تصویر')),
                ('desc', models.CharField(blank=True, max_length=200, null=True, verbose_name='عکس نوشت')),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=500, verbose_name='عنوان')),
                ('excerpt', models.TextField(max_length=500, null=True, verbose_name='خلاصه مطلب')),
                ('content', ckeditor.fields.RichTextField()),
                ('date', models.DateTimeField(verbose_name='تاریخ انتشار')),
                ('status', models.CharField(choices=[('draft', 'Draft'), ('published', 'Published')], default='published', max_length=10, verbose_name='وضعیت')),
                ('slug', models.SlugField(allow_unicode=True, help_text='The name of the page as it will appear in URLs e.g http://domain.com/blog/[my-slug]/', max_length=200, unique_for_date='date')),
                ('autor', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='auth.user', verbose_name='نویسنده')),
                ('category', models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.PROTECT, to='Blog.category', verbose_name='دسته بندی')),
            ],
            options={
                'ordering': ('-date',),
            },
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('video', models.FileField(blank=True, upload_to='videos', verbose_name='ویدیو')),
                ('post', models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='Blog.post')),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, upload_to='profile', verbose_name='تصویر')),
                ('desc', models.TextField(max_length=5000, verbose_name='توضیحات')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='auth.user')),
            ],
        ),
        migrations.CreateModel(
            name='PostImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, upload_to='PostImage', verbose_name='تصاویر')),
                ('desc', models.CharField(blank=True, max_length=1000, null=True, verbose_name='توضیحات')),
                ('post', models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='Blog.post')),
            ],
        ),
    ]
