# Generated by Django 3.1.5 on 2021-11-17 14:05

import ckeditor.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
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
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=500, verbose_name='عنوان')),
                ('excerpt', models.TextField(null=True, verbose_name='خلاصه مطلب')),
                ('content', ckeditor.fields.RichTextField()),
                ('date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='تاریخ انتشار')),
                ('status', models.CharField(choices=[('draft', 'Draft'), ('published', 'Published')], default='published', max_length=10, verbose_name='وضعیت')),
                ('slug', models.SlugField(help_text='The name of the page as it will appear in URLs e.g http://domain.com/blog/[my-slug]/', max_length=200, unique_for_date='date')),
                ('autor', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL, verbose_name='نویسنده')),
                ('category', models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.PROTECT, to='Blog.category', verbose_name='دسته بندی')),
            ],
            options={
                'ordering': ('-date',),
            },
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img', models.CharField(max_length=300, null=True, verbose_name='آدرس تصویر')),
                ('post', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='Blog.post')),
            ],
        ),
    ]