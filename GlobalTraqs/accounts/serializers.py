from pins.models import pin, FlagComment
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
User = get_user_model()
# User Serializer


class PinSerializer(serializers.ModelSerializer):

    class Meta:
        model = pin
        fields = ['id', 'title', 'description', 'is_anonymous_pin']


class FlagCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = FlagComment
        fields = ['id', 'comment']


class UserSerializer(serializers.ModelSerializer):
    userStories = PinSerializer(many=True, read_only=True)
    flaggerComment = FlagCommentSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = '__all__'

# Register Serializer


class UserProfileSerializer(serializers.ModelSerializer):
    userStories = PinSerializer(many=True, read_only=True)
    flaggerComment = FlagCommentSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'userStories', 'date_joined', 'first_name',
                  'last_name', 'username', 'email', 'is_profile_private', 'image_url']


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
