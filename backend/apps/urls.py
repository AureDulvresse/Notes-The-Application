from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
    path('notes/', views.NotesViews, name='getNotes'),
]
