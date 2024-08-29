from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Profile
from .serializers import ProfileSerializer
from utils.validation import (
    validate_required_fields,
    check_existing_object,
    create_error_response,
   
)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_user_profile(request):
    data = request.data

    try:
        validate_required_fields(data, ["first_name", "last_name", "phone"])

        profile = Profile.objects.create(
            user=request.user,
            first_name=data["first_name"],
            last_name=data["last_name"],
            phone=data["phone"],
        )
        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        return create_error_response(e)
