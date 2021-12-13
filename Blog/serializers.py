from django.db.models import fields
from rest_framework import serializers
from .models import GalleryImage, Post,Profile,PostImage,Video,Category
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']

class ImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None)
    class Meta:
        model = PostImage
        fields = ['image' , 'desc']


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(source='autor')
    cat = CategorySerializer(source='category')
    images = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ['id' , 'title' , 'excerpt' , 'content' , 'cat' , 'date' , 'user' , 'slug' , 'images']

    def get_images(self, obj):
        images = PostImage.objects.filter(post=obj)
        return ImageSerializer(images , many=True).data

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['video']

class ProfileSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None)
    class Meta:
        model = Profile
        fields = ['user' , 'image' , 'desc']

class GallerySerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None)
    class Meta:
        model = GalleryImage
        fields = ['image' , 'desc']