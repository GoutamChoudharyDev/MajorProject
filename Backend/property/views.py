from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Property, PropertyImage
from .serializers import PropertySerializer

class PropertyCreateView(APIView):
    def post(self, request):
        title = request.data.get("title")
        location = request.data.get("location")
        price = request.data.get("price")
        description = request.data.get("description")
        images = request.FILES.getlist("images")

        if len(images) < 3:
            return Response({"error": "Please upload at least 3 images."}, status=status.HTTP_400_BAD_REQUEST)

        property_instance = Property.objects.create(
            title=title,
            location=location,
            price=price,
            description=description
        )

        for img in images:
            PropertyImage.objects.create(property=property_instance, image=img)

        serializer = PropertyListSerializer(property_instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
