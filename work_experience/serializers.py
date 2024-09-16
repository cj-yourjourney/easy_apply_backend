from rest_framework import serializers
from .models import WorkExperience


class WorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkExperience
        fields = [
            "id",
            "job_title",
            "company_name",
            "start_year",
            "end_year",
            "job_description",
        ]
