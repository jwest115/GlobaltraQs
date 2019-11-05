from django.urls import path
from rest_framework import routers
from .api import PinViewSet, CategoryViewSet
from . import views

router = routers.DefaultRouter()
router.register('api/pins', PinViewSet, 'pin')
router.register('api/category', CategoryViewSet, 'category')
urlpatterns = router.urls