from django.db import models
<<<<<<< Updated upstream
from django.conf import settings
# Create your models here.


class pin (models.Model):
=======
from django.contrib.auth.models import User

# Create your models here.


class Pin(models.Model):
>>>>>>> Stashed changes
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             null=True, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField()
    latitude = models.CharField(max_length=50)
    longitude = models.CharField(max_length=50)
