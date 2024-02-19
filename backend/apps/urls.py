from django.urls import path
from .import views

app_name = 'apps'

urlpatterns = [
    path('index/', views.index , name='index'),
]
