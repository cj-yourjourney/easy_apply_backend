# backend/utils/profile_utils.py
from rest_framework.response import Response
from rest_framework import status
from .validation import create_error_response


def update_profile_data(profile, data, serializer_class):
    """
    Handles the logic for updating a profile with given data.

    Args:
        profile: The profile instance to update.
        data: The data to update the profile with.
        serializer_class: The serializer class to validate and update the profile.

    Returns:
        Response object containing the updated data or errors.
    """
    serializer = serializer_class(profile, data=data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
