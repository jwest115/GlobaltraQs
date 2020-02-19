from django.db import models
from django.conf import settings
from django.contrib.auth.models import User


class AboutUs(models.Model):
    about_us = models.CharField(max_length=10000)

    def __str__(self):
        """String for representing the Model object."""
        return self.about_us
