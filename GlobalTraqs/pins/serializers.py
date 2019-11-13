from rest_framework import serializers
<<<<<<< HEAD
from pins.models import pin
=======
from pins.models import pin, categoryType, upVoteStory, flagStory
from django_restql.mixins import DynamicFieldsMixin
>>>>>>> sidebar-part2


class PinSerializer(serializers.ModelSerializer):
    class Meta:
        model = pin
        fields = '__all__'


<<<<<<< HEAD
# class CategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = categoryType
#         fields = '__all__'
=======
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
>>>>>>> sidebar-part2
