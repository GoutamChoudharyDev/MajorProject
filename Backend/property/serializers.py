from rest_framework import serializers
from .models import Property, PropertyImage, Booking

# -------------------- PropertyImageSerializer --------------------
class PropertyImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = PropertyImage
        fields = ['id', 'image']

    def get_image(self, obj):
        return obj.image.url 


# -------------------- PropertyListSerializer --------------------
class PropertyListSerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = ['id', 'title', 'location', 'price', 'description', 'images']


# -------------------- BookingSerializer --------------------
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

