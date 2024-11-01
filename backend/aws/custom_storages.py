# custom_storages.py
from storages.backends.s3boto3 import S3Boto3Storage


class StaticStorage(S3Boto3Storage):
    location = "static"  # All static files will be stored in the "static" folder
    


class PublicMediaStorage(S3Boto3Storage):
    location = "media"  # All media files will be stored in the "media" folder
    file_overwrite = False  # Prevents overwriting files with the same name
