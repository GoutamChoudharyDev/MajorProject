from django.urls import path
from .import api

urlpatterns = [
    path('', api.properties_list, name='api_properties-list'),
    # Add more property-related endpoints here
    # path('property-detail/<int:id>/', api.property_detail, name='property-detail'),
    # path('property-create/', api.property_create, name='property-create'),
    ]