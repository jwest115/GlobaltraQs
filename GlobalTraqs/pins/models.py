from django.db import models
from django.conf import settings
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