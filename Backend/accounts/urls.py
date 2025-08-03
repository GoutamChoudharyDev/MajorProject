

from django.urls import path
from django.urls import include
from accounts.views import UserRegistrationView, UserLoginView


urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
]