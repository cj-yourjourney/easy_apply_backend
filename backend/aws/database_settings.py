# backend/backend/aws/database_settings.py

from django.conf import settings
from .basic_settings import env
import os 

# env = environ.Env()

# # AWS Aurora Postgresql Serverless database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv(
            "EA_DATABASE_NAME"
        ),  # Use the database name you specified or created
        "USER": os.getenv("EA_DATABASE_USER"),  # Master username from RDS setup
        "PASSWORD": os.getenv("EA_DATABASE_PASSWORD"),  # Master password from RDS setup
        "HOST": os.getenv("EA_DATABASE_HOST"),  # Writer Endpoint URL
        "PORT": "5432",
    }
}

# # Local/default database

# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.sqlite3",
#         "NAME": settings.BASE_DIR / "db.sqlite3",
#     }
# }
