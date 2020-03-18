from django.urls import path
from . import views
from django.conf.urls import url, include

urlpatterns = [
    url(r'^', views.email),
    url(r'support/', views.supportEmail)
]
