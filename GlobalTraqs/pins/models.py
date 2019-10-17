from django.db import models
from django.conf import settings
# Create your models here.


class pin (models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             null=True, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField()
    latitude = models.CharField(max_length=50)
    longitude = models.CharField(max_length=50)
    category = models.CharField(max_length=50, null=True)
    # 1 is community, 2: historical, 3: personal
