from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from PIL import Image
from datetime import datetime
from io import BytesIO
from django.core.files import File


class pin(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              null=True, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField()
    latitude = models.CharField(max_length=50)
    longitude = models.CharField(max_length=50)
    category = models.ForeignKey(
        "categoryType", on_delete=models.CASCADE, null=True, related_name='selected_category')
    # 1 is community, 2: historical, 3: personal
    upVotes = models.PositiveSmallIntegerField(default=0)
    startDate = models.DateField('Date', blank=True, null=True)
    endDate = models.DateField('Date', blank=True, null=True)
    is_anonymous_pin = models.BooleanField(default=False, blank=False)

    def __str__(self):
        """String for representing the Model object."""
        return self.title


class categoryType(models.Model):
    categoryName = models.CharField(max_length=50)

    def upload_photo_dir(self, filename):
        path = './category/{}'.format(filename)
        return path

    image_url = models.ImageField(null=True, upload_to=upload_photo_dir)

    def __str__(self):
        """String for representing the Model object."""
        return self.categoryName


class upVoteStory(models.Model):
    pinId = models.ForeignKey(
        "pin", on_delete=models.CASCADE, null=True, related_name='updotes')
    upVoter = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    upvote = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['pinId', 'upVoter'], name="upvoter-pin")


        ]


class aboutUs(models.Model):
    aboutDesc = models.TextField()


class Faq(models.Model):
    faqQuestionDesc = models.TextField()
    faqAnswerDesc = models.TextField()


class flagStory(models.Model):
    pinId = models.ForeignKey(
        "pin", on_delete=models.CASCADE, null=True,  related_name='flaggerstory')
    flagger = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    flagged = models.BooleanField(default=False)


class commentStory(models.Model):
    pin = models.ForeignKey(
        "pin", on_delete=models.CASCADE, null=True,  related_name='commentstory')
    is_anonymous_comment = models.BooleanField(default=False)
    commenter = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    description = models.TextField()


class photo(models.Model):

    title = models.CharField(max_length=100)
    uploader = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    # or upload_to="images", which would result in your images being at "http://127.0.0.1:8000/media/images/Capture1.PNG"
  #  image_url = models.ImageField(upload_to="pins", null=True,)

    def upload_photo_dir(self, filename):
        path = './pins/{}'.format(datetime.today().strftime(
            '%Y_%m_%d_%H_%M_%S_') + '_' + self.title + '_' + self.uploader.username + '.jpg')
        return path
    image_url = models.ImageField(null=True, upload_to=upload_photo_dir)

    # def save(self, *args, **kwargs):
    #     new_image = (self.image_url)
    #     self.image_url = new_image
    #     super().save(*args, **kwargs)

    # def compress(image):
    #     im = Image.open(image)
    #     im = image.resize((x, y), Image.ANTIALIAS)  # LANCZOS as of Pillow 2.7
    #     quality_val = 90
    #     im.save(image, 'JPEG', quality=quality_val)
    # create a BytesIO object
    # im_io = BytesIO()
    # save image to BytesIO object
    # im.save(im_io, 'JPEG', quality=30)
    # create a django-friendly Files object
    #new_image = File(im_io, name=image.name)

    # return new_image
    # return im
