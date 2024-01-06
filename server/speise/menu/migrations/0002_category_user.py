# Generated by Django 5.0.1 on 2024-01-06 05:51

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='user',
            field=models.ForeignKey(default=1, help_text='Select a User', on_delete=django.db.models.deletion.CASCADE, related_name='categoriess', to=settings.AUTH_USER_MODEL, verbose_name='Category Creator'),
            preserve_default=False,
        ),
    ]
