def validate_required_fields(data, required_fields):
    missing_fields = [field for field in required_fields if not data.get(field)]
    if missing_fields:
        raise Exception(
            f"Please provide all required fields: {', '.join(missing_fields)}"
        )


def check_existing_object(model, filter_kwargs, error_message):
    if model.objects.filter(**filter_kwargs).exists():
        raise Exception(error_message)
