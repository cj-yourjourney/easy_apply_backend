# backend/utils/validation.py
from user_profile.models import Profile
from rest_framework import status
from rest_framework.response import Response
from user_skill.models import Skill


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


def validate_and_create_profile(user, data):
    validate_required_fields(data, ["first_name", "last_name", "phone"])
    return Profile.objects.create(
        user=user,
        first_name=data["first_name"],
        last_name=data["last_name"],
        phone=data["phone"],
    )


# Optimized work experience validation to batch validate fields
def validate_work_experience_list(data):
    if not isinstance(data, list) or not data:
        raise CustomValidationError("Please provide a list of work experiences.")

    required_fields = ["job_title", "company_name", "start_year", "job_description"]
    for work_experience in data:
        validate_required_fields(work_experience, required_fields)

    return data


def validate_user_skills(data):
    validate_required_fields(data, ["skills"])

    if not isinstance(data["skills"], list):
        raise CustomValidationError("Skills must be a list of strings.")

    # Ensure that each skill is fetched or created in the correct database
    skills = []
    for skill_name in data["skills"]:
        skill, created = Skill.objects.get_or_create(name=skill_name)
        skills.append(skill)

    return skills


def create_error_response(error, status_code=status.HTTP_400_BAD_REQUEST):
    detail = str(error)
    if isinstance(error, CustomValidationError):
        detail = error.message
    return Response({"detail": detail}, status=status_code)
