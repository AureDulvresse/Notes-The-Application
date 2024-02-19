from django.db import models
from django.contrib.auth.models import AbstractUser

#for the system of authentication

class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    def __str__(self):
        return self.username
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete= models.CASCADE)
    full_name = models.CharField(max_length=450 )
    bio  = models.CharField(max_length=500, blank=True)
    image = models.ImageField(upload_to='image')
    phone = models.CharField(max_length=55)
    verified = models.BooleanField(default=False)
    image = models.ImageField(upload_to='image')
    def __str__(self):
        return self.full_name



