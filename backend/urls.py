"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/jobs/", include("api.urls.job_urls")),
    path("api/products/", include("api.urls.product_urls")),
    path("api/users/", include("api.urls.user_urls")),
    path("api/orders/", include("api.urls.order_urls")),
    path("api/profile/", include("user_profile.urls")),
    path("api/skills/", include("user_skill.urls")),
    path("api/educations/", include("user_education.urls")),
    path("api/work-experiences/", include("work_experience.urls")),
    # re_path(r"^.*$", TemplateView.as_view(template_name="index.html")),
]
