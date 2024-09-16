# Generated by Django 5.0.2 on 2024-09-16 17:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user_profile', '0003_delete_skill_alter_profile_skills'),
    ]

    operations = [
        migrations.CreateModel(
            name='WorkExperience',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_title', models.CharField(max_length=100)),
                ('company_name', models.CharField(max_length=100)),
                ('start_year', models.PositiveIntegerField()),
                ('end_year', models.PositiveIntegerField(blank=True, null=True)),
                ('job_description', models.TextField()),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='work_experiences', to='user_profile.profile')),
            ],
        ),
    ]
