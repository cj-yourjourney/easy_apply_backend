# backend/user_profile/views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ProfileSerializer
from utils.validation import validate_and_create_profile, create_error_response
from .models import Profile


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_user_profile(request):
    try:
        profile = validate_and_create_profile(request.user, request.data)
        serializer = ProfileSerializer(profile)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Exception as e:
        return create_error_response(e)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    try:
        profile = Profile.objects.get(user=request.user)
        serializer = ProfileSerializer(profile)

        return Response(serializer.data, status=status.HTTP_200_OK)
    except Profile.DoesNotExist:
        return Response(
            {"detail": "Profile not found"}, status=status.HTTP_404_NOT_FOUND
        )
