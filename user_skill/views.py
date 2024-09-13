from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Skill
from .serializers import SkillSerializer
from utils.validation import (
    validate_required_fields,
    get_or_create_profile,
    create_error_response,
    CustomValidationError,
)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_user_skills(request):
    data = request.data

    try:
        profile = get_or_create_profile(request.user)
        validate_required_fields(data, ["skills"])

        if not isinstance(data["skills"], list):
            raise CustomValidationError("Skills must be a list of strings")

        skills = [
            Skill.objects.get_or_create(name=skill_name)[0]
            for skill_name in data["skills"]
        ]

        profile.skills.set(skills)
        profile.save()

        skill_names = [skill.name for skill in skills]

        response_data = {"username": request.user.username, "skills": skill_names}

        return Response(response_data, status=status.HTTP_201_CREATED)

    except Exception as e:
        return create_error_response(e)
