from django.db import models
from django.conf import settings

# Create your models here.


class pin(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              null=True, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField()
    latitude = models.CharField(max_length=50)
    longitude = models.CharField(max_length=50)
    category = models.ForeignKey(
        "categoryType", on_delete=models.CASCADE, null=True)
    # 1 is community, 2: historical, 3: personal


class categoryType(models.Model):
    categoryName = models.CharField(max_length=50)

    def __str__(self):
        """String for representing the Model object."""
        return self.categoryName