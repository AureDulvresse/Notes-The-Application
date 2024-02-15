from django.urls import path
from .import views

apps_name = 'apps'

urlpatterns = [
    path('', views.index , name='index'),
]
