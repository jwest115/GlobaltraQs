from rest_framework import serializers
from pins.models import pin, categoryType, upVoteStory, flagStory, commentStory, aboutUs, Faq, photo, FlagComment
from django_restql.mixins import DynamicFieldsMixin
from django.contrib.auth.models import User
import datetime


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = categoryType
        fields = '__all__'


class AboutUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = aboutUs
        fields = '__all__'


class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faq
        fields = '__all__'


class upVoteStorySerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = upVoteStory
        fields = '__all__'


class FlagStorySerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = flagStory
        fields = '__all__'


class FlagCommentSerializer(DynamicFieldsMixin, serializers.ModelSerializer):

    class Meta:
        model = FlagComment
        fields = '__all__'


class CommentStorySerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    username = serializers.CharField(
        source="commenter.username", read_only=True)
    flaggingComment = FlagCommentSerializer(many=True, read_only=True)
    flagscore = serializers.IntegerField(read_only=True)

    class Meta:
        model = commentStory
        fields = '__all__'


class PinSerializer(DynamicFieldsMixin, serializers.ModelSerializer):
  #  updoot = serializers.IntegerField()

    username = serializers.CharField(
        source="owner.username", read_only=True)
    categoryName = serializers.CharField(
        source="category.categoryName", read_only=True)
    categoryImage = serializers.ImageField(
        source="category.image_url",
        read_only=True)
    # pinsUpvote = serializers.StringRelatedField(many=True)
    # pinsUpvote = upVoteStorySerializer(many=True, read_only=True)
    # pinsUpvoted = upVoteStorySerializer(many=True, read_only=True)
    updooots = serializers.IntegerField(read_only=True)
    flagscore = serializers.IntegerField(read_only=True)
    flaggerstory = FlagStorySerializer(many=True, read_only=True)
    updotes = upVoteStorySerializer(many=True, read_only=True)
    commentstory = CommentStorySerializer(many=True, read_only=True)

    class Meta:
        model = pin
        fields = '__all__'


class PinFlaggedSerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    username = serializers.CharField(
        source="owner.username", read_only=True)
    flagscore = serializers.IntegerField(read_only=True)
    flaggerstory = FlagStorySerializer(many=True, read_only=True)

    class Meta:
        model = pin
        fields = ['id', 'owner', 'title',
                  'username', 'flagscore', 'flaggerstory']


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = photo
        fields = '__all__'
