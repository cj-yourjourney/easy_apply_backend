# user_profile/serializers.py

from rest_framework import serializers
from .models import Skill


class SkillSerializer(serializers.ModelSerializer):

    class Meta:
        model = Skill
        fields = ["name"]

    # Override to_representation to change the structure of the response
    def to_representation(self, instance):
        return instance.name  # Return only the name field as a string
