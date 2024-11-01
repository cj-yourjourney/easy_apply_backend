# user_profile/models.py
from django.db import models
from django.contrib.auth.models import User
from user_skill.models import Skill


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    phone = models.CharField(max_length=15, blank=True)
    skills = models.ManyToManyField(Skill, related_name="profiles", blank=True)

    # Set upload_to correctly to ensure images go into the media folder
    image = models.ImageField(upload_to="profile_images/", blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} Profile"
