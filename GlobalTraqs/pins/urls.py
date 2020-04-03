from django.urls import path
from rest_framework import routers
from .api import PinViewSet, CategoryViewSet, upVoteStoryViewSet, FlagStoryViewSet, CommentStoryViewSet, \
    PinSearchViewSet, FlagCommentViewSet, FaqViewSet, PhotoViewSet, PinFlaggedViewSet, PinCoordViewSet, MinPinDate, \
    MaxPinDate
from . import views

router = routers.DefaultRouter()
router.register('api/pins', PinViewSet, 'pin')
# router.register('api/category', CategoryViewSet, 'category')
router.register('api/category', CategoryViewSet, 'category')
router.register('api/upVoteStory', upVoteStoryViewSet, 'upvotestory')
router.register('api/flagStory', FlagStoryViewSet, 'flagstory')
router.register('api/commentStory', CommentStoryViewSet, 'commentstory')
router.register('api/pinSearch', PinSearchViewSet, 'pin')
router.register('api/minPinDate', MinPinDate, 'pin')
router.register('api/maxPinDate', MaxPinDate, 'pin')
router.register('api/pinCoordFilter', PinCoordViewSet, 'pin')
router.register('api/pinFlagged', PinFlaggedViewSet, 'pinFlag')
router.register('api/faq', FaqViewSet, 'faqModel')
router.register('api/flagcomment', FlagCommentViewSet, 'flagcomment')
router.register('api/photo', PhotoViewSet, 'photo')
urlpatterns = router.urls
