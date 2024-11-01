import os
from django.conf import settings

# AWS S3 Settings
AWS_STORAGE_BUCKET_NAME = "easy-apply-media-bucket"
AWS_QUERYSTRING_AUTH = False
AWS_S3_REGION_NAME = "us-west-1"

# For static files
STATICFILES_STORAGE = (
    "backend.aws.custom_storages.StaticStorage"  # Replace with your actual app name
)
STATIC_URL = f"https://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/static/"

# For media files (e.g., user-uploaded content)
DEFAULT_FILE_STORAGE = "backend.aws.custom_storages.PublicMediaStorage"  # Replace with your actual app name
MEDIA_URL = f"https://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/media/"

# Local static file settings (for development/testing)
STATIC_ROOT = os.path.join(settings.BASE_DIR, "staticfiles")
STATICFILES_DIRS = [os.path.join(settings.BASE_DIR, "static")]
