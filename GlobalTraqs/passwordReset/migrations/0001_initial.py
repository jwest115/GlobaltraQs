# Generated by Django 3.0.2 on 2020-02-04 05:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ResetPasswordToken',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='When was this token generated')),
                ('key', models.CharField(db_index=True, max_length=64, unique=True, verbose_name='Key')),
                ('ip_address', models.GenericIPAddressField(blank=True, default='', null=True, verbose_name='The IP address of this session')),
                ('user_agent', models.CharField(blank=True, default='', max_length=256, verbose_name='HTTP User Agent')),
            ],
            options={
                'verbose_name': 'Password Reset Token',
                'verbose_name_plural': 'Password Reset Tokens',
            },
        ),
    ]
