from .serializers import AboutUsSerializer
from management.models import AboutUs
from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend


class AboutUsViewSet(viewsets.ModelViewSet):
    queryset = AboutUs.objects.all()
    permission_classes = [
        permissions.AllowAny
        # permissions.IsAuthenticated,
    ]
    serializer_class = AboutUsSerializer

