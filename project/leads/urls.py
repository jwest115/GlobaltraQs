from django.urls import path
from . import views
urlpatterns = [
    path('api/pins/', views.PinListCreate.as_view()),
]
