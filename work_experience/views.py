from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import WorkExperience
from .serializers import WorkExperienceSerializer
from utils.validation import (
    # validate_work_experience_list,
    validate_payload_list,
    get_existing_profile,
    create_error_response,
    CustomValidationError
)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_work_experiences(request):
    try:
        profile = get_existing_profile(request.user)

        validated_work_experiences = validate_payload_list(
            request.data.get("workExperiences", []),
            ["job_title", "company_name", "start_year", "job_description"],
            item_name="work experiences",
        )

        batch_size = 1000  # Adjust based on expected load and AWS RDS capacity
        created_work_experiences = WorkExperience.objects.bulk_create(
            [
                WorkExperience(
                    profile=profile,
                    job_title=data["job_title"],
                    company_name=data["company_name"],
                    start_year=data["start_year"],
                    end_year=data.get("end_year"),
                    job_description=data["job_description"],
                )
                for data in validated_work_experiences
            ],
            batch_size=batch_size,
        )

        serializer = WorkExperienceSerializer(created_work_experiences, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    except CustomValidationError as e:  
        return create_error_response(e)
    except Exception as e:
        return create_error_response(e)
