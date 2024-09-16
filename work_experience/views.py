# backend/work_experience/views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import WorkExperience
from .serializers import WorkExperienceSerializer
from utils.validation import (
    validate_required_fields,
    get_existing_profile,
    create_error_response,
    CustomValidationError,
)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_work_experience(request):
    data = request.data

    try:
        # Validate that required fields are present
        validate_required_fields(
            data, ["job_title", "company_name", "start_year", "job_description"]
        )

        # Get or create profile of the user
        profile = get_existing_profile(request.user)

        # Create a new work experience object
        work_experience = WorkExperience.objects.create(
            profile=profile,
            job_title=data["job_title"],
            company_name=data["company_name"],
            start_year=data["start_year"],
            end_year=data.get("end_year"),  # Optional field
            job_description=data["job_description"],
        )

        # Serialize the new work experience
        serializer = WorkExperienceSerializer(work_experience)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        return create_error_response(e)
