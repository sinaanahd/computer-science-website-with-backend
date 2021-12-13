from django.shortcuts import render , get_object_or_404
from django.http import Http404
from . import models
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
# from rest_framework import status
from . import serializers

    
# class PostsViewSet(viewsets.ModelViewSet):
    
#     queryset = models.Post.postobjects.all()
#     serializer_class = serializers.PostSerializer

def index(request):

    return render(request , 'index.html')

def posts(request):

    return render(request , 'posts.html')

def post_detail(request , slug):

    return render(request , 'post.html' )

def about_us(request):

    return render(request,'about_us.html')

def photo_gallery(request):
    
    return render(request , 'photo_gallery.html')

def newsew(request):

    return render(request , 'newses.html')

def news_detail(request , slug):

    return render(request , 'news_detail.html')


class PostList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        posts = models.Post.postobjects.all()
        serializer = serializers.PostSerializer(posts , many=True)
        return Response(serializer.data)

    # def post(self, request, format=None):
    #     serializer = serializers.PostSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostDetail(APIView):

    """
    Retrieve, update or delete a post instance.
    """

    def get_object(self, slug):
        try:
            return models.Post.postobjects.get(slug=slug)
        except models.Post.DoesNotExist:
            raise Http404

    def get(self, request, slug, format=None):
        post = self.get_object(slug)
        serializer = serializers.PostSerializer(post)
        return Response(serializer.data)

    # def put(self, request, pk, format=None):
    #     snippet = self.get_object(pk)
    #     serializer = SnippetSerializer(snippet, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def delete(self, request, pk, format=None):
    #     snippet = self.get_object(pk)
    #     snippet.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)

class Gallery(APIView):

    def get(self, request, format=None):
        photos = models.GalleryImage.objects.all()
        serializer = serializers.GallerySerializer(photos , many=True)
        return Response(serializer.data)