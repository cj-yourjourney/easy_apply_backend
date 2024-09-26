# user_education/serializers.py
from rest_framework import serializers
from .models import Education


class UserEducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ["id", "school_name", "degree", "start_year", "end_year"]
