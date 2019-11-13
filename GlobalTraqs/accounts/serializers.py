from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
User = get_user_model()

# User Serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

# Register Serializer


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])

        return user

# Login Serializer


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

# Profile Serializer


# class ProfileCreateSerializer(serializers.ModelSerializer):
#    username = serializers.CharField(source='user.username')
#
#    class Meta:
#        model = Profile
#        fields = [
#        'username',
#        'language',
#        ]
#
#    def create (self, validated_data):
#     user = get_user_model().objects.create(username=validated_data['username'])
#     user.set_password(User.objects.make_random_password())
#     user.save()
#
#     profile = Profile.objects.create(user = user)
#
#     return profile

# class ProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Profile
#         fields = ('username', 'last_name', 'gender', 'zip_code',)