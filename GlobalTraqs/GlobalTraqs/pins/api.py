from pins.models import pin
from rest_framework import viewsets, permissions
from .serializers import PinSerializer
from django.contrib.auth.models import User
# catalog viewset


class PinViewSet(viewsets.ModelViewSet):
    queryset = pin.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PinSerializer
