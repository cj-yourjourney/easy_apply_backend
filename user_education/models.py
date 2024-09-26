from django.db import models
from user_profile.models import Profile


class Education(models.Model):
    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="educations"
    )
    school_name = models.CharField(max_length=255)
    degree = models.CharField(max_length=255)
    start_year = models.IntegerField()
    end_year = models.IntegerField(blank=True, null=True)


    def __str__(self):
        return f"{self.school_name} - {self.degree} ({self.start_year} - {self.end_year or 'Present'})"
