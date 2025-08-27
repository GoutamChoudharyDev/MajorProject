from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Property, PropertyImage
from .serializers import PropertyListSerializer
import json

@csrf_exempt
def properties_list(request):
    """
    GET: Return all properties with images
    """
# <<<<<<< HEAD
#     properties = Property.objects.all()
#     serializer = PropertyListSerializer(properties, many=True)
#     return JsonResponse({
#         'data': serializer.data
#         })
# =======
    if request.method == "GET":
        properties = Property.objects.all()
        serializer = PropertyListSerializer(properties, many=True)
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def property_create(request):
    """
    POST: Create a new property with multiple images
    """
    if request.method == "POST":
        title = request.POST.get("title")
        location = request.POST.get("location")
        price = request.POST.get("price")
        description = request.POST.get("description")
        images = request.FILES.getlist("images")

        if len(images) < 3:
            return JsonResponse({"error": "Please upload at least 3 images."}, status=400)

        property_instance = Property.objects.create(
            title=title,
            location=location,
            price=price,
            description=description
        )

        for img in images:
            PropertyImage.objects.create(property=property_instance, image=img)

        serializer = PropertyListSerializer(property_instance)
        return JsonResponse(serializer.data, safe=False, status=201)