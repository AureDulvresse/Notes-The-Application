from django.urls import path
from .import views
apps_name = 'authenticateUser'

urlpatterns = [
    path('/login' , views.login , name='login')
]
