from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
# Create your models here.


class pin (models.Model):
    """   user = models.ForeignKey(settings.AUTH_USER_MODEL,
                               null=True, on_delete=models.CASCADE) """
    owner = models.ForeignKey(
        User, related_name="pins", on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=50)
    description = models.TextField()
    latitude = models.CharField(max_length=50)
    longitude = models.CharField(max_length=50)
    # category = models.CharField(max_length=50, null=True)
    category = models.ForeignKey(
        "categoryType", on_delete=models.CASCADE, null=True)
    # 1 is community, 2: historical, 3: personal


class categoryType(models.Model):

    categoryName = models.CharField(max_length=50)


class upVoteStory(models.Model):
    pinId = models.ForeignKey(
        "pin", on_delete=models.CASCADE, null=True)
    upVoter = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True)
    upvote = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['pinId', 'upVoter'], name="upvoter-pin")
        ]

#
