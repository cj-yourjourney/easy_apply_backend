# Generated by Django 5.0.2 on 2024-04-30 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_product_num_reviews_product_rating'),
    ]

    operations = [
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=225)),
                ('company_name', models.CharField(max_length=225)),
                ('description', models.TextField()),
                ('apply_job_link', models.CharField(max_length=400)),
            ],
        ),
    ]