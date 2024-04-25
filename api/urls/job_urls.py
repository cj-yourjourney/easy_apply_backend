from django.urls import path
from api.views import job_views as views

urlpatterns = [
    path("", views.job_listings_test, name="job-listing"),
]
