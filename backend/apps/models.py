from django.db import models
from django.contrib.auth.models import AbstractUser
from shortuuid.django_fields import ShortUUIDField

class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length = 255, unique = True)
    first_name = models.CharField(max_length = 100)
    last_name = models.CharField(max_length = 100)
    profile = models.ImageField(verbose_name="Photo de Profil", upload_to="profile", default="user.png")
    
    REQUIRED_FIELDS = [
        'first_name',
        'last_name',
        'email'
    ]

    class Meta:
        verbose_name = "Utilisateur"

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Category(models.Model):
    uuid = ShortUUIDField(unique=True , length=10, max_length=30 , prefix='cat' , alphabet='abcdefgh12345678')
    title = models.CharField(max_length=500)
    description = models.TextField(null = True, blank = True)
    thumbnail = models.ImageField(upload_to='image' , default='category.jpg')
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now = True)
    
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.title      
      
class Notes(models.Model):
    uuid = ShortUUIDField(unique=True , length=10, max_length=30 , prefix='note' , alphabet='abcdefgh12345678')
    content = models.TextField(max_length=1000)
    description = models.TextField(null = True, blank = True)
    is_task = models.BooleanField(default = False)
    status = models.BooleanField(default = False)
    category = models.ForeignKey(Category, on_delete = models.CASCADE , related_name="fk_NoteCategory")
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name="fk_NoteUser")
    bgColor = models.CharField(max_length=40, default="rgb(249 115 22 / var(--tw-bg-opacity))")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now = True)
    
    class Meta:
        verbose_name = 'Note'
        verbose_name_plural = 'Notes'
        
    def __str__(self):
        return self.content

