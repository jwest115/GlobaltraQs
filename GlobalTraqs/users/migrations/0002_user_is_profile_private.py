# Generated by Django 3.0.2 on 2020-02-09 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_profile_private',
            field=models.BooleanField(default=False),
        ),
    ]