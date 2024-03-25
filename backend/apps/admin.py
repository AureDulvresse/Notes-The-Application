from django.contrib import admin
from .models import Category, Notes
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass
    
@admin.register(Notes)
class NotesAdmin(admin.ModelAdmin):
       pass
