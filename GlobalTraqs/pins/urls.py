from django.urls import path
from rest_framework import routers
<<<<<<< HEAD
from .api import PinViewSet
=======
from .api import PinViewSet, CategoryViewSet, upVoteStoryViewSet, FlagStoryViewSet
>>>>>>> sidebar-part2
from . import views

router = routers.DefaultRouter()
router.register('api/pins', PinViewSet, 'pin')
<<<<<<< HEAD
# router.register('api/category', CategoryViewSet, 'category')
=======
router.register('api/category', CategoryViewSet, 'category')
router.register('api/upVoteStory', upVoteStoryViewSet, 'upvotestory')
router.register('api/flagStory', FlagStoryViewSet, 'flagstory')
>>>>>>> sidebar-part2
urlpatterns = router.urls
