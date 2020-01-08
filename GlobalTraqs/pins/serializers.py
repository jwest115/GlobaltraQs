from rest_framework import serializers
from pins.models import pin, categoryType, upVoteStory, flagStory, commentStory
from django_restql.mixins import DynamicFieldsMixin
from django.contrib.auth.models import User
import datetime


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = categoryType
        fields = '__all__'


class upVoteStorySerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = upVoteStory
        fields = '__all__'


class FlagStorySerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = flagStory
        fields = '__all__'


class CommentStorySerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    username = serializers.CharField(
        source="commenter.username", read_only=True)

    class Meta:
        model = commentStory
        fields = '__all__'


class PinSerializer(DynamicFieldsMixin, serializers.ModelSerializer):
  #  updoot = serializers.IntegerField()

    username = serializers.CharField(
        source="owner.username", read_only=True)
    categoryName = serializers.CharField(
        source="category.categoryName", read_only=True)
    #pinsUpvote = serializers.StringRelatedField(many=True)
    # pinsUpvote = upVoteStorySerializer(many=True, read_only=True)
    #pinsUpvoted = upVoteStorySerializer(many=True, read_only=True)
    updooots = serializers.IntegerField(read_only=True)
    flagscore = serializers.IntegerField(read_only=True)
    flaggerstory = FlagStorySerializer(many=True, read_only=True)
    updotes = upVoteStorySerializer(many=True, read_only=True)
    commentstory = CommentStorySerializer(many=True, read_only=True)
    start_date = serializers.DateField(
        initial=datetime.date.today, required=False)
    end_date = serializers.DateField(
        initial=datetime.date.today, required=False)

    class Meta:
        model = pin
        fields = '__all__'
