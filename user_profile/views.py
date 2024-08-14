from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Profile
from .serializers import ProfileSerializer
from utils.validation import (
    validate_required_fields,
    check_existing_object,
    CustomValidationError,
)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_user_profile(request):
    user = request.user
    data = request.data
    try:
        if not user:
            raise CustomValidationError("User not authenticated")

        validate_required_fields(data, ["first_name", "last_name", "phone"])

        check_existing_object(
            Profile, {"user": user}, "Profile already exists for this user"
        )

        profile_data = {
            "first_name": data.get("first_name", ""),
            "last_name": data.get("last_name", ""),
            "phone": data.get("phone", ""),
        }
        profile = Profile.objects.create(user=user, **profile_data)
        profile.save()

        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except CustomValidationError as e:
        return Response({"detail": e.message}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
