# backend/user_profile/views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ProfileSerializer
from utils.validation import validate_and_create_profile, create_error_response


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_user_profile(request):
    try:
        profile = validate_and_create_profile(request.user, request.data)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Exception as e:
        return create_error_response(e)
