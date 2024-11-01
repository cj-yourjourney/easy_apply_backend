# aws_s3_settings.py
import os 
from django.conf import settings

# AWS S3 Settings
AWS_STORAGE_BUCKET_NAME = "easy-apply-media-bucket"
AWS_QUERYSTRING_AUTH = False
AWS_S3_REGION_NAME = "us-west-1"


# DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
MEDIA_URL = f"https://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/"

# Static files (CSS, JavaScript, Images)
STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(
    settings.BASE_DIR, "staticfiles"
)  # Directory where collected static files will be stored
STATICFILES_DIRS = [os.path.join(settings.BASE_DIR, "static")]  # Additional dire


STORAGES = {
    # Media file (image) management
    "default": {
        "BACKEND": "storages.backends.s3boto3.S3StaticStorage",
    },
    # CSS and JS file management
    "staticfiles": {
        "BACKEND": "storages.backends.s3boto3.S3StaticStorage",
    },
}
