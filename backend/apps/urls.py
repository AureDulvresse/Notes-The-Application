from django.urls import path
from .import views

app_name = 'api'

urlpatterns = [
    path('index/', views.index , name='index'),
]
