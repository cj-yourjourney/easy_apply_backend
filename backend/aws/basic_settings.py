import environ
import os
from django.conf import settings

# Initialize the environ object
env = environ.Env()

# Ensure the correct path to the .env file in the backend root folder
env.read_env(os.path.join(settings.BASE_DIR, ".env"))

# AWS Basic Settings
AWS_ACCESS_KEY_ID = env("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = env("AWS_SECRET_ACCESS_KEY")

# You can print the variables to verify if they are loaded correctly
# print("AWS_ACCESS_KEY_ID:", AWS_ACCESS_KEY_ID)
# print("AWS_SECRET_ACCESS_KEY:", AWS_SECRET_ACCESS_KEY)
