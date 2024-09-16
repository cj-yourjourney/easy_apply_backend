# utils/validation.py
from user_profile.models import Profile
from rest_framework import status
from rest_framework.response import Response


class CustomValidationError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)


def validate_required_fields(data, required_fields):
    missing_fields = [field for field in required_fields if not data.get(field)]
    if missing_fields:
        raise CustomValidationError(
            f"Please provide all required fields: {', '.join(missing_fields)}"
        )


def check_existing_object(model, filter_kwargs, error_message):
    if model.objects.filter(**filter_kwargs).exists():
        raise CustomValidationError(error_message)


def get_existing_profile(user):
    try:
        profile = Profile.objects.get(user=user)
        return profile
    except Profile.DoesNotExist:
        raise CustomValidationError("Profile does not exist for this user")


def create_error_response(error, status_code=status.HTTP_400_BAD_REQUEST):
    detail = str(error)
    if isinstance(error, CustomValidationError):
        detail = error.message
    return Response({"detail": detail}, status=status_code)
