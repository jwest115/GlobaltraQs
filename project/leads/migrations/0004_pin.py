# Generated by Django 2.2.4 on 2019-10-15 04:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0003_story_category'),
    ]

    operations = [
        migrations.CreateModel(
            name='pin',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('latitude', models.CharField(max_length=50)),
                ('longitude', models.CharField(max_length=50)),
            ],
        ),
    ]
