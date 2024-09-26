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
)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_user_educations(request):
    try:
        profile = get_existing_profile(request.user)

        # Extract the education data from the request
        educations_data = request.data.get("educations", [])

        # Check if the incoming data is a list
        if not isinstance(educations_data, list) or not educations_data:
            raise CustomValidationError("Please provide a list of educations.")

        # Validate each education object in the list
        required_fields = ["school_name", "degree", "start_year"]
        for edu in educations_data:
            validate_required_fields(edu, required_fields)

        # Prepare data for bulk creation
        education_objects = [
            Education(
                profile=profile,
                school_name=edu["school_name"],
                degree=edu["degree"],
                start_year=edu["start_year"],
                end_year=edu.get("end_year"),  # Optional field
            )
            for edu in educations_data
        ]

        # Use bulk_create for optimized insertion
        Education.objects.bulk_create(education_objects)

        # Query the newly created objects for the response
        created_educations = Education.objects.filter(profile=profile)
        serializer = UserEducationSerializer(created_educations, many=True)

        # Wrap the response data in a dictionary
        return Response({"educations": serializer.data}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return create_error_response(e)
