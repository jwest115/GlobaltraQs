from leads.models import Lead, Story, pin
from leads.serializers import LeadSerializer, StorySerializer, PinSerializer
from rest_framework import generics


class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer


class StoryListCreate(generics.ListCreateAPIView):
    queryset = Story.objects.all()
    serializer_class = StorySerializer


class PinListCreate(generics.ListCreateAPIView):
    queryset = pin.objects.all()
    serializer_class = PinSerializer
