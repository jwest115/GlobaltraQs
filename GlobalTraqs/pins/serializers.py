from rest_framework import serializers
from pins.models import pin, categoryType, upVoteStory, flagStory, countUpvoteFlag
from django_restql.mixins import DynamicFieldsMixin


class PinSerializer(serializers.ModelSerializer):
    categoryName = serializers.CharField(
        source="category.categoryName", read_only=True)

    class Meta:
        model = pin
        fields = '__all__'


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


class CountFlagStorySerializer(DynamicFieldsMixin, serializers.ModelSerializer):

    class Meta:
        model = countUpvoteFlag
        fields = '__all__'
