from pins.models import pin, categoryType
from rest_framework import viewsets, permissions
from .serializers import PinSerializer, CategorySerializer
from django.contrib.auth.models import User
# catalog viewset


class PinViewSet(viewsets.ModelViewSet):
    queryset = pin.objects.all()
    permission_classes = [
        permissions.AllowAny
        # permissions.IsAuthenticated,
    ]
    serializer_class = PinSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = categoryType.objects.all()
    permission_classes = [
        permissions.AllowAny
        # permissions.IsAuthenticated,
    ]
    serializer_class = CategorySerializer


"""     def get_queryset(self):
        return self.request.user.pins.all()
    def perform_create(self, serializer):  # saves user id
        serializer.save(owner=self.request.user) """