# from django.urls import path
# from .import api

# urlpatterns = [
#     path('', api.properties_list, name='api_properties-list'),
#     path('create/', api.property_create, name='property-create'),
#     ] 

from django.urls import path, include
from rest_framework.routers import DefaultRouter
# from .views import PropertyViewSet
from . import api

# router = DefaultRouter()
# router.register(r'properties', PropertyViewSet)

urlpatterns = [
    # path('', include(router.urls)),
    path('', api.properties_list, name='api_properties-list'),
    path('create/', api.property_create, name='property-create'),
]