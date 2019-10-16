from django.urls import path

from . import views

urlpatterns = [
    path('map/', views.display_map, name='display_map'),
    path('freemap/', views.display_map2, name='display_map2'),
    path('test/', views.test, name='test'),
    path('stories/', views.stories, name='stories'),
    # ex: /stories/5/
    path('stories/<int:pin_id>/', views.detail, name='detail'),

]