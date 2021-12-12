from django.contrib import admin
from . import models



class ImageInLine(admin.TabularInline):
    model = models.Image

class VideoInLine(admin.TabularInline):
    model = models.Video

@admin.register(models.Post)
class PostAdmin(admin.ModelAdmin):
    inlines = [ImageInLine , VideoInLine]
    prepopulated_fields = {'slug': ('title',), }
    

    class Meta:
        model = models.Post

@admin.register(models.Image)
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