from django.urls import path
from .views import create_user_educations

urlpatterns = [
    path("create/", create_user_educations, name="create-user-educations"),
]
