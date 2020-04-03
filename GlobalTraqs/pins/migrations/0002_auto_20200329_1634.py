# Generated by Django 3.0.4 on 2020-03-29 23:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pins', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='upvotestory',
            name='upVoter',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='pin',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='selected_category', to='pins.categoryType'),
        ),
        migrations.AddField(
            model_name='pin',
            name='lastPersonEdit',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='pin',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='userStories', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='photo',
            name='uploader',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='flagstory',
            name='flagger',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='flagstory',
            name='pinId',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='flaggerstory', to='pins.pin'),
        ),
        migrations.AddField(
            model_name='flagcomment',
            name='comment',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='flaggingComment', to='pins.commentStory'),
        ),
        migrations.AddField(
            model_name='flagcomment',
            name='flagger',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='flaggerComment', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='commentstory',
            name='commenter',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='commentstory',
            name='pin',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='commentstory', to='pins.pin'),
        ),
        migrations.AddConstraint(
            model_name='upvotestory',
            constraint=models.UniqueConstraint(fields=('pinId', 'upVoter'), name='upvoter-pin'),
        ),
        migrations.AddConstraint(
            model_name='flagstory',
            constraint=models.UniqueConstraint(fields=('pinId', 'flagger'), name='flagger-pin'),
        ),
    ]
