from django.urls import path
from .views import create_user_profile, get_user_profile, update_user_profile


urlpatterns = [
    path("create/", create_user_profile, name="create-profile"),
    path("details/", get_user_profile, name="get_user_profile"),
    path('update/', update_user_profile, name='update-user-profile')
]

