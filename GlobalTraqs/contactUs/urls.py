from django.urls import path
from .views import email
from django.conf.urls import url, include

urlpatterns = [
    url(r'^', email)
]
