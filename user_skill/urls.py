from django.urls import path
from .views import create_user_skills, update_user_skills

urlpatterns = [
    path("create/", create_user_skills, name="create-skill"),
    path("update/", update_user_skills, name="update-user-skills"),
]
