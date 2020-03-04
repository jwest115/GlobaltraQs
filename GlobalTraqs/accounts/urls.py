
from django.urls import path, include
from rest_framework import routers
from rest_framework import viewsets, permissions
from .api import RegisterAPI, LoginAPI, UserAPI, UsersViewSet, UserSearchViewSet, UserViewProfileViewSet
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]


router = routers.DefaultRouter()
router.register('api/auth/users', UsersViewSet, 'user')
router.register('api/profile/users', UserViewProfileViewSet, 'userProfile')
router.register('api/auth/users/<int:pin_id>/', UsersViewSet, 'user')
router.register('api/auth/userSearch', UserSearchViewSet, 'user'),
urlpatterns += router.urls
