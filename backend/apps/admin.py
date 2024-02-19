from django.contrib import admin
from .models import Libel , Category , Notes
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['title' , 'image_category']
    
@admin.register(Notes)
class NotesAdmin(admin.ModelAdmin):
    list_display = ['content' , 'image']
    
@admin.register(Libel)
class LibelAdmin(admin.ModelAdmin):
    list_display = ['title']
