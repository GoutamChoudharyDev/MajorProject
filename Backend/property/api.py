from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from .models import Property
from .serializers import PropertyListSerializer

@api_view(['GET'])
@permission_classes([])
@authentication_classes([])
def properties_list(request):
    """
    List all properties.
    """
    properties = Property.objects.all()
    serializer = PropertyListSerializer(properties, many=True)
    return JsonResponse({
        'data': serializer.data
        })
