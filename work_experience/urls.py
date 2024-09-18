from django.urls import path
from .views import create_work_experiences

urlpatterns = [
    path("create/", create_work_experiences, name="create-work-experience"),
]
