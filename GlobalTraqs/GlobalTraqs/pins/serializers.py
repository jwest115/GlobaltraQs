from rest_framework import serializers
from pins.models import pin


class PinSerializer(serializers.ModelSerializer):
    class Meta:
        model = pin
        fields = '__all__'
