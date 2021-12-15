# Generated by Django 3.1.5 on 2021-12-13 09:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Blog', '0005_auto_20211212_1614'),
    ]

    operations = [
        migrations.CreateModel(
            name='GalleryImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='Gallery', verbose_name='تصویر')),
                ('desc', models.CharField(blank=True, max_length=200, null=True, verbose_name='عکس نوشت')),
            ],
        ),
        migrations.AlterField(
            model_name='post',
            name='slug',
            field=models.SlugField(allow_unicode=True, help_text='The name of the page as it will appear in URLs e.g http://domain.com/blog/[my-slug]/', max_length=200, unique_for_date='date'),
        ),
        migrations.AlterField(
            model_name='postimage',
            name='desc',
            field=models.CharField(blank=True, max_length=1000, null=True, verbose_name='توضیحات'),
        ),
    ]
