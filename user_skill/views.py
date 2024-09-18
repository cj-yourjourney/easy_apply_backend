# backend/user_skill/views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from utils.validation import (
    validate_user_skills,
    get_existing_profile,
    create_error_response,
)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_user_skills(request):
    try:
        profile = get_existing_profile(request.user)
        skills = validate_user_skills(request.data)

        profile.skills.set(skills)
        profile.save()

        response_data = {
            "username": request.user.username,
            "skills": [skill.name for skill in skills],
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
    except Exception as e:
        return create_error_response(e)
