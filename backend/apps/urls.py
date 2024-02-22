from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
    path('statistiques/<str:id_user>', views.StatistiquesViews, name="Statistiques")
    path('notes/', views.NotesViews, name='Notes'),
    path('notes/<str:pk>', views.NotesViews, name="Notes"),
    path('categories/<str:id_user>', views.CategoryViews, name="Categories"),
]
