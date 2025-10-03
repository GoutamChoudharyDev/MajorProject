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
    booked = serializers.SerializerMethodField()   # ✅ new field

    class Meta:
        model = Property
        fields = ['id', 'title', 'location', 'price', 'description', 'images', 'booked']

    def get_booked(self, obj):
        # True if there is at least one booking for this property
        return Booking.objects.filter(property=obj).exists()

# -------------------- BookingSerializer --------------------
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

