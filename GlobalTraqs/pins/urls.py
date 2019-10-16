from django.urls import path
from rest_framework import routers
from .api import PinViewSet
from . import views

router = routers.DefaultRouter()
router.register('api/pins', PinViewSet, 'pin')
urlpatterns = router.urls
