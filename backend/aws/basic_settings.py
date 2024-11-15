import os
from dotenv import load_dotenv

load_dotenv()

# AWS Basic Settings
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")

SECRET_KEY = os.getenv("DJANGO_EASY_APPLY_SECRET_KEY")


# You can print the variables to verify if they are loaded correctly
print("AWS_ACCESS_KEY_ID:", AWS_ACCESS_KEY_ID)
print("AWS_SECRET_ACCESS_KEY:", AWS_SECRET_ACCESS_KEY)
