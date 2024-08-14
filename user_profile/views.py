from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Profile
from .serializers import ProfileSerializer
from utils.validation import validate_required_fields, check_existing_object
from rest_framework.exceptions import NotFound


from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from django.core.exceptions import ValidationError


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_user_profile(request):
    user = request.user
    data = request.data
    try:
        # Validate that the user is authenticated
        if not user:
            raise NotFound("User not authenticated")

        # Validate required fields
        validate_required_fields(data, ["first_name", "last_name", "phone"])

        # Check if the profile already exists for the user
        check_existing_object(
            Profile, {"user": user}, "Profile already exists for this user"
        )

        # Create the profile
        profile_data = {
            "first_name": data.get("first_name", ""),
            "last_name": data.get("last_name", ""),
            "phone": data.get("phone", ""),
        }
        profile = Profile.objects.create(user=user, **profile_data)
        profile.save()

        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except ValidationError as e:
        # If the error is a list, join it into a single string
        error_message = (
            e.message if isinstance(e.message, str) else ", ".join(e.message)
        )
        return Response({"detail": error_message}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
