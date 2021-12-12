from django.db.models import fields
from rest_framework import serializers
from .models import Post,Profile,Image,Video,Category
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(source='autor')
    cat = CategorySerializer(source='category')
    class Meta:
        model = Post
        fields = ['id' , 'title' , 'excerpt' , 'content' , 'cat' , 'date' , 'user' , 'slug']

class ImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None)
    class Meta:
        model = Image
        fields = ['image' , 'desc']

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['video']

class ProfileSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None)
    class Meta:
        model = Profile
        fields = ['user' , 'image' , 'desc']
