# from django.shortcuts import render

from rest_framework.response import Response 
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from accounts.serializers import UserRegistrationSerializer
from accounts.serializers import UserLoginSerializer
from django.contrib.auth import authenticate
# Create your views here.

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import AuthenticationFailed

# changes...1
from rest_framework.permissions import AllowAny

def get_tokens_for_user(user):
    if not user.is_active:
      raise AuthenticationFailed("User is not active")
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class UserRegistrationView(APIView):

    # changes..2
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        # Logic for user registration
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({"token":token,"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserLoginView(APIView):

    # changes..3
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({"token":token,"message": "User logged in successfully"}, status=status.HTTP_200_OK)
            else:
                return Response({'error':{'non_field_error':['Email and password is not valid']}}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogoutView(APIView):
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]
    
    def post(self, request, format=None):
        try:
            refresh_token = request.data.get('refresh_token')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response({"message": "User logged out successfully"}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Refresh token is required'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        