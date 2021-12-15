from django.contrib import admin
from . import models
from django_jalali.admin.filters import JDateFieldListFilter
import django_jalali.admin as jadmin



class ImageInLine(admin.TabularInline):
    model = models.PostImage

class VideoInLine(admin.TabularInline):
    model = models.Video

@admin.register(models.Post)
class PostAdmin(admin.ModelAdmin):
    inlines = [ImageInLine , VideoInLine]
    prepopulated_fields = {'slug': ('title',), }
    list_filter = (
        ('datetime', JDateFieldListFilter),
        ('date', JDateFieldListFilter),
    )
    

    class Meta:
        model = models.Post

@admin.register(models.PostImage)
class ImageAdmin(admin.ModelAdmin):
    pass

@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    pass

@admin.register(models.Video)
class VideoAdmin(admin.ModelAdmin):
    pass

@admin.register(models.Profile)
class ProfileAdmin(admin.ModelAdmin):
    pass