# Generated by Django 5.0.1 on 2024-03-25 09:39

import django.db.models.deletion
import shortuuid.django_fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefgh12345678', length=10, max_length=30, prefix='cat', unique=True)),
                ('title', models.CharField(max_length=500)),
                ('description', models.TextField(blank=True, null=True)),
                ('thumbnail', models.ImageField(default='category.jpg', upload_to='image')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Category',
                'verbose_name_plural': 'Categories',
            },
        ),
        migrations.CreateModel(
            name='Notes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefgh12345678', length=10, max_length=30, prefix='note', unique=True)),
                ('content', models.TextField(max_length=1000)),
                ('description', models.TextField(blank=True, null=True)),
                ('is_task', models.BooleanField(default=False)),
                ('status', models.BooleanField(default=False)),
                ('bgColor', models.CharField(default='rgb(249 115 22 / var(--tw-bg-opacity))', max_length=40)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='fk_NoteCategory', to='apps.category')),
            ],
            options={
                'verbose_name': 'Note',
                'verbose_name_plural': 'Notes',
            },
        ),
    ]
