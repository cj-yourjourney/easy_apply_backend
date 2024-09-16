from django.urls import path
from .views import create_work_experience

urlpatterns = [
    path("create/", create_work_experience, name="create-work-experience"),
]
