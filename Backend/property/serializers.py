from rest_framework import serializers
from .models import Property, PropertyImage


class PropertyImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)  # ensures full URL
    # image = serializers.ImageField(use_url=True, many=True)  # ensures full URL

    
    class Meta:
        model = PropertyImage
        fields = ['id', 'image']

class PropertyListSerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = ['id', 'title', 'location', 'price', 'images_url', 'description']

