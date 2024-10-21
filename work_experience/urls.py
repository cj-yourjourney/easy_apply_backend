from django.urls import path
from .views import create_work_experiences, update_work_experiences

urlpatterns = [
    path("create/", create_work_experiences, name="create-work-experiences"),
    path('update/', update_work_experiences, name='update-work-experiences'),
]
