class CustomValidationError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)


def validate_required_fields(data, required_fields):
    missing_fields = [field for field in required_fields if not data.get(field)]
    if missing_fields:
        error_message = (
            f"Please provide all required fields: {', '.join(missing_fields)}"
        )
        raise CustomValidationError(error_message)


def check_existing_object(model, filter_kwargs, error_message):
    if model.objects.filter(**filter_kwargs).exists():
        raise CustomValidationError(error_message)
