from django.urls import path
from rest_framework import routers
from .api import AboutUsViewSet
from . import views

router = routers.DefaultRouter()
router.register('aboutUs', AboutUsViewSet, 'AboutUs')
urlpatterns = router.urls
