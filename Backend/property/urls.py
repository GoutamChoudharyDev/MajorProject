from django.urls import path
from . import views 

urlpatterns = [
    # Properties
    path('', views.PropertiesListView.as_view(), name='api_properties-list'),
    path('create/', views.PropertyCreateView.as_view(), name='property-create'),

    # My Listings
    path('mylistings/', views.MyListingsView.as_view(), name='my-listings'),
    path('mylistings/<int:pk>/', views.MyListingDetailView.as_view(), name='delete-my-listing'),

    # Bookings
    path('bookings/', views.BookingCreateView.as_view(), name='create-booking'),
    path('bookings/list/', views.BookingListView.as_view(), name='list-bookings'),       # GET list
    path('bookings/<int:pk>/', views.BookingDeleteView.as_view(), name='cancel-booking'), # DELETE
]
