from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
    path('notes/', views.NotesViews, name='Notes'),
    path('notes/<str:pk>', views.NotesViews, name="Notes"),
    path('categories/', views.CategoryViews, name="Categories"),
    path('categories/<str:pk>', views.CategoryViews, name="Categories"),
]
