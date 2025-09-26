from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from django.conf import settings

from .models import Property, PropertyImage
from .serializers import PropertyListSerializer, BookingSerializer


# -------------------- List all properties --------------------
class PropertiesListView(APIView):
    permission_classes = []
    """List all properties (for homepage or browse page)"""

    def get(self, request):
        properties = Property.objects.all().order_by("-created_at")
        serializer = PropertyListSerializer(properties, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


# -------------------- Create properties --------------------
class PropertyCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        title = request.data.get("title")
        location = request.data.get("location")
        price = request.data.get("price")
        description = request.data.get("description")
        images = request.FILES.getlist("images")

        if len(images) < 3:
            return Response(
                {"error": "Please upload at least 3 images."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create property
        property_instance = Property.objects.create(
            owner=request.user,
            title=title,
            location=location,
            price=price,
            description=description,
        )

        # Attach images
        for img in images:
            PropertyImage.objects.create(property=property_instance, image=img)

        # Serialize the single property
        serializer = PropertyListSerializer(property_instance, context={"request": request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# -------------------- Booking properties --------------------
class BookingCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            booking = serializer.save()  # Save booking in DB
            property_obj = booking.property
            owner_email = property_obj.owner.email

            # Email to User
            send_mail(
                subject="Booking Confirmation",
                message=(
                    f"Hello {booking.name},\n\nYour booking for '{property_obj.title}' "
                    f"from {booking.check_in} to {booking.check_out} for {booking.guests} guests "
                    f"has been confirmed.\n\nThank you!"
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[booking.email],
                fail_silently=False,
            )

            # Email to Owner
            send_mail(
                subject="Your Property Has Been Booked",
                message=(
                    f"Hello {property_obj.owner.username},\n\nYour property '{property_obj.title}' "
                    f"has been booked by {booking.name} ({booking.email}, {booking.phone}) "
                    f"from {booking.check_in} to {booking.check_out} for {booking.guests} guests."
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[owner_email],
                fail_silently=False,
            )

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -------------------- My Listings --------------------
class MyListingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Fetch properties owned by the logged-in user"""
        properties = Property.objects.filter(owner=request.user).order_by("-created_at")
        serializer = PropertyListSerializer(properties, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


# -------------------- My Listing Details --------------------
class MyListingDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        """Delete property if owned by the logged-in user"""
        try:
            property_instance = Property.objects.get(id=pk, owner=request.user)
        except Property.DoesNotExist:
            return Response(
                {"error": "Property not found or not owned by you"},
                status=status.HTTP_404_NOT_FOUND,
            )

        property_instance.delete()
        return Response(
            {"message": "Property deleted successfully "},
            status=status.HTTP_204_NO_CONTENT,
        )
