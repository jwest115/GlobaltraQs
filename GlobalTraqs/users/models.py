from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.db import models
from PIL import Image
from django.core.files import File


class User(AbstractUser):
    """Define the extra fields related to User here"""
    first_name = models.CharField('First Name', blank=True, max_length=30)
    last_name = models.CharField('Last Name', blank=True, max_length=30)
    username = models.CharField(
        'Username', unique=True, blank=False, max_length=20)
    email = models.CharField('Email', unique=True, blank=True, max_length=70)
    is_moderator = models.BooleanField(default=False)
    is_administrator = models.BooleanField(default=False)
    is_anonymous_active = models.BooleanField(default=False)
    accessibility_mode_active = models.BooleanField(default=False)
    bio = models.CharField(blank=True, max_length=300)
    is_profile_private = models.BooleanField(default=False)


    def upload_photo_dir(self, filename):
        path = './profile/{}'.format(self.username + filename)
        # datetime.today().strftime(
        # '%Y_%m_%d_%H_%M_%S_') + '_' + self.title + '_' + self.uploader.username + '.jpg')
        return path
    image_url = models.ImageField(null=True, upload_to=upload_photo_dir)

    #  - - - Some more User fields according to your needs

    # This is the most important part to look upon to  define the custom permissions related to User.
    class Meta:
        permissions = (("can_add_stories", "Can add stories"),
                       ("can_edit_their_stories", "Can edit their stories"),
                       ("can_delete_their_stories", "Can delete their stories"),
                       ("can_delete_other_stories",
                        "Can delete other user stories"),
                       ("can_edit_other_stories", "Can edit other user stories"),
                       ("can_ban_users", "Can ban users"),
                       ("can_ban_moderators", "Can ban moderators"),
                       ("can_add_moderators", "Can add moderators"),
                       ("can_add_admin", "Can add administrators"),
                       ("can_add_personal_stories", "Can add personal stories"))
