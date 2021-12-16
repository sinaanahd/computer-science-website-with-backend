from django.contrib import admin
from . import models
from jalali_date import datetime2jalali
from jalali_date.admin import ModelAdminJalaliMixin



class ImageInLine(admin.TabularInline):
    model = models.PostImage

class VideoInLine(admin.TabularInline):
    model = models.Video

@admin.register(models.Post)
class PostAdmin( ModelAdminJalaliMixin , admin.ModelAdmin):
    inlines = [ImageInLine , VideoInLine]
    prepopulated_fields = {'slug': ('title',), }

    def get_created_jalali(self, obj):
        return datetime2jalali(obj.date).strftime('%y/%m/%d _ %H:%M:%S')
	

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