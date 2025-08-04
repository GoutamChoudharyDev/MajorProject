from rest_framework import serializers
from accounts.models import User


class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['username','email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True},
        }   
    
    # validate password and password2 match
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("Passwords do not match")
        return attrs
    # create user
    def create(self, validate_data):
        return User.objects.create_user(**validate_data)
    

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255) 
    class Meta:
        model = User
        fields = ['email', 'password']
