# Create your models here.
from django.db import models
from user_profile.models import Profile


class WorkExperience(models.Model):
    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="work_experiences"
    )
    job_title = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)
    start_year = models.PositiveIntegerField()
    end_year = models.PositiveIntegerField(
        blank=True, null=True
    )  # Optional, for current jobs
    job_description = models.TextField()

    def __str__(self):
        return f"{self.job_title} at {self.company_name} ({self.start_year} - {self.end_year if self.end_year else 'Present'})"
