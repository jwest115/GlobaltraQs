from pins.models import pin
from rest_framework import viewsets, permissions
from .serializers import PinSerializer
from pins.models import pin, categoryType, upVoteStory, flagStory
from rest_framework import viewsets, permissions
from .serializers import PinSerializer, CategorySerializer, upVoteStorySerializer, FlagStorySerializer
from django.contrib.auth.models import User
# catalog viewset
from django_filters.rest_framework import DjangoFilterBackend


class PinViewSet(viewsets.ModelViewSet):
    queryset = pin.objects.all()
    permission_classes = [
        permissions.AllowAny
        # permissions.IsAuthenticated,
    ]
    serializer_class = PinSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = categoryType.objects.all()
    permission_classes = [
        permissions.AllowAny
        # permissions.IsAuthenticated,
    ]
    serializer_class = CategorySerializer


class upVoteStoryViewSet(viewsets.ModelViewSet):
    queryset = upVoteStory.objects.all()
    permission_classes = [
        permissions.AllowAny
        # permissions.IsAuthenticated,
    ]
    serializer_class = upVoteStorySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'


class FlagStoryViewSet(viewsets.ModelViewSet):
    queryset = flagStory.objects.all()
    permission_classes = [
        permissions.AllowAny
        # permissions.IsAuthenticated,
    ]
    serializer_class = FlagStorySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'


"""     def get_queryset(self):
        return self.request.user.pins.all()

    def perform_create(self, serializer):  # saves user id
        serializer.save(owner=self.request.user) """
