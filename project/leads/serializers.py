from rest_framework import serializers
from leads.models import Lead, Story, pin


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ('id', 'name', 'email', 'message')  # or can do fields = '__all__'


class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ('id', 'title', 'description', 'latitude', 'longitude')


class PinSerializer(serializers.ModelSerializer):
    class Meta:
        model = pin
        fields = ('title', 'description', 'latitude', 'longitude', 'category')
