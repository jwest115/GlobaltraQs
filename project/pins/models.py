from django.conf import settings
from django.db import models


# Create your models here.

class Pin(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField()
    latitude = models.CharField(max_length=50)
    longitude = models.CharField(max_length=50)
    # latitude = models.DecimalField(max_digits=50, decimal_places=50)
    # longitude = models.DecimalField(max_digits=50, decimal_places=50)
