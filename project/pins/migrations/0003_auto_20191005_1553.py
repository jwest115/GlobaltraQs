# Generated by Django 2.2.6 on 2019-10-05 22:53

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pins', '0002_auto_20191005_1542'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pin',
            name='latitude',
            field=models.DecimalField(decimal_places=6, max_digits=9, validators=[django.core.validators.MinValueValidator(-90), django.core.validators.MaxValueValidator(90)]),
        ),
        migrations.AlterField(
            model_name='pin',
            name='longitude',
            field=models.DecimalField(decimal_places=6, max_digits=9, validators=[django.core.validators.MinValueValidator(-90), django.core.validators.MaxValueValidator(90)]),
        ),
    ]
