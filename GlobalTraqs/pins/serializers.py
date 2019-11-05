
from rest_framework import serializers
from pins.models import pin, categoryType


class PinSerializer(serializers.ModelSerializer):
    class Meta:
        model = pin
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = categoryType
        fields = '__all__'