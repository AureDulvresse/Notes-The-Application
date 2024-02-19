# Generated by Django 4.2.5 on 2024-02-16 21:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apps', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='libel',
            name='colors_choice_for_libel',
            field=models.CharField(choices=[('pink', 'Pink'), ('green', 'Green'), ('orange', 'Orange'), ('white', 'White'), ('black', 'Black'), ('blue', 'Blue')], default='white', max_length=10),
        ),
    ]