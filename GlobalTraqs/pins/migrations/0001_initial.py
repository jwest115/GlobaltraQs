# Generated by Django 3.0.4 on 2020-03-29 23:34

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import pins.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='aboutUs',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('aboutDesc', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='categoryType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('categoryName', models.CharField(max_length=50)),
                ('image_url', models.ImageField(null=True, upload_to=pins.models.categoryType.upload_photo_dir)),
            ],
        ),
        migrations.CreateModel(
            name='commentStory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_anonymous_comment', models.BooleanField(default=False)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Faq',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('faqQuestionDesc', models.TextField()),
                ('faqAnswerDesc', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='FlagComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('flagged', models.BooleanField(default=False)),
                ('reportType', models.PositiveIntegerField(default=1, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(4)])),
                ('reason', models.TextField(null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='flagStory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('flagged', models.BooleanField(default=False)),
                ('reportType', models.PositiveIntegerField(default=1, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(4)])),
                ('reason', models.TextField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='photo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('image_url', models.ImageField(null=True, upload_to=pins.models.photo.upload_photo_dir)),
            ],
        ),
        migrations.CreateModel(
            name='pin',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('latitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('longitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('upVotes', models.PositiveSmallIntegerField(default=0)),
                ('startDate', models.DateField(blank=True, null=True, verbose_name='startDate')),
                ('endDate', models.DateField(blank=True, null=True, verbose_name='endDate')),
                ('is_anonymous_pin', models.BooleanField(default=False)),
                ('postDate', models.DateField(blank=True, null=True, verbose_name='postDate')),
                ('lastEditDate', models.DateField(blank=True, null=True, verbose_name='lastEditDate')),
            ],
            options={
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='upVoteStory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('upvote', models.BooleanField(default=False)),
                ('pinId', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='updotes', to='pins.pin')),
            ],
        ),
    ]
