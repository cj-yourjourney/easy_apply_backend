from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Skill
from user_profile.models import Profile
from user_profile.serializers import ProfileSerializer
from utils.validation import (
    validate_required_fields,
    CustomValidationError,
)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_user_skills(request):
    user = request.user
    data = request.data
    try:
        # Ensure the user is authenticated
        if not user:
            raise CustomValidationError("User not authenticated")

        # Retrieve the user's profile
        try:
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            raise CustomValidationError("Profile does not exist for this user")

        # Ensure 'skills' field is provided in the request
        validate_required_fields(data, ["skills"])

        # Extract the list of skill names from the request data
        skills_data = data.get("skills", [])

        if not isinstance(skills_data, list) or not all(
            isinstance(skill, str) for skill in skills_data
        ):
            raise CustomValidationError("Skills must be a list of strings")

        # Get or create Skill objects and associate them with the profile
        skills = []
        for skill_name in skills_data:
            skill, created = Skill.objects.get_or_create(name=skill_name)
            skills.append(skill)

        # Set the skills for the profile
        profile.skills.set(skills)
        profile.save()

        # Serialize the updated profile
        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except CustomValidationError as e:
        return Response({"detail": e.message}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
