from django.urls import path
from .import views

app_name = 'api'

urlpatterns = [
    path('notes/', views.index , name='index'),
]
