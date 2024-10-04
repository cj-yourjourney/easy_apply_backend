from rest_framework import serializers
from .models import Profile
from user_skill.serializers import SkillSerializer
from user_education.serializers import UserEducationSerializer
from work_experience.serializers import WorkExperienceSerializer

class ProfileSerializer(serializers.ModelSerializer):
    work_experiences = WorkExperienceSerializer(many=True, read_only=True)
    educations = UserEducationSerializer(many=True, read_only=True)
    skills = SkillSerializer(many=True, read_only=True)
    class Meta:
        model = Profile
        fields = [
            "user",
            "first_name",
            "last_name",
            "phone",
            "skills",
            "work_experiences",
            "educations",
        ]
        read_only_fields = ["user"]



    def to_representation(self, instance):
           
            data = super().to_representation(instance)

            data['skills'] = data.get('skills', [])
            data['work_experiences'] = data.get('work_experiences', [])
            data['educations'] = data.get('educations', [])

            return data