# Generated by Django 3.1.3 on 2021-02-27 05:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_auto_20210227_1035'),
    ]

    operations = [
        migrations.RenameField(
            model_name='professor',
            old_name='professor',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='students',
            old_name='studentname',
            new_name='name',
        ),
    ]