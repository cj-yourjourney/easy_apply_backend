# Generated by Django 5.0.2 on 2024-11-01 22:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0005_alter_profile_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='image',
        ),
    ]
