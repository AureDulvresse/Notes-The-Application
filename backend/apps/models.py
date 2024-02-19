from django.db import models
from shortuuid.django_fields import ShortUUIDField
from usersauths.models import User

CHOICES_COLORS = {
    ("blue" , "Blue"),
    ('black' , 'Black'),
    ('white' , 'White'),
    ("orange" , "Orange"),
    ('pink' , 'Pink'),
    ('green' , 'Green'),
}
class Category(models.Model):
    categoryId = ShortUUIDField(unique=True , length=10, max_length=30 , prefix='cat' , alphabet='abcdefgh12345')
    title = models.CharField(max_length=500)
    description_of_category = models.TextField(max_length=10000)
    date_of_create = models.DateTimeField(auto_now_add=True)
    updated_of_category = models.DateTimeField(null=True  , blank=True)
    image_category = models.ImageField(upload_to='image' , default='category.jpg')
    
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
    def __str__(self):
        return self.title        
class Libel(models.Model): #By default this models is defined par adminstrators 
    title = models.CharField(max_length=500)
    description_of_libel = models.TextField(max_length=1000)
    colors_choice_for_libel = models.CharField(choices = CHOICES_COLORS , max_length=10 , default='white')
    class Meta:
        verbose_name = 'Libel'
        verbose_name_plural = 'libels'
    def __str__(self):
        return f'{self.title} {self.description_of_libel}'
    
class Notes(models.Model):
    content = models.TextField(max_length=1000)
    image = models.ImageField(upload_to='image' , default='note.jpg')
    is_tasks = models.BooleanField()
    libel = models.ForeignKey(Libel , on_delete = models.CASCADE , blank=True, null=True )
    category = models.ForeignKey(Category, on_delete = models.SET_NULL , null=True, related_name="category")
    date_of_create = models.DateTimeField(auto_now_add=True)
    updated_of_note = models.DateTimeField(null=True  , blank=True)
    
    class Meta:
        verbose_name = 'Note'
        verbose_name_plural = 'Notes'
        
    def __str__(self):
        return self.content

