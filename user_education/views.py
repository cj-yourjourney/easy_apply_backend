from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Education
from .serializers import UserEducationSerializer
from utils.validation import (
    validate_required_fields,
    get_existing_profile,
    create_error_response,
    CustomValidationError,
    validate_payload_list,
)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_user_educations(request):
    try:
        profile = get_existing_profile(request.user)

        validated_educations_data = validate_payload_list(
            request.data.get("educations", []),
            ["school_name", "degree", "start_year"],
            item_name="educations",
        )

        batch_size = 1000  # Adjust based on expected load and AWS RDS capacity
        created_educations = Education.objects.bulk_create(
            [
                Education(
                    profile=profile,
                    school_name=edu["school_name"],
                    degree=edu["degree"],
                    start_year=edu["start_year"],
                    end_year=edu.get("end_year"),  
                )
                for edu in validated_educations_data
            ],
            batch_size=batch_size, 
        )

        serializer = UserEducationSerializer(created_educations, many=True)

        return Response({"educations": serializer.data}, status=status.HTTP_201_CREATED)

    except CustomValidationError as e:  # Specific validation errors
        return create_error_response(e)
    except Exception as e:
        return create_error_response(e)
