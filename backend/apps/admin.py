from django.contrib import admin
from .models import Category, Notes, User
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_filter = ('title',)
    fields = ('description' , 'user' , 'updated_at' ,)
    ordering = ('title' , 'description', 'created_at',)
    search_fields = ['description']
    
@admin.register(Notes)
class NotesAdmin(admin.ModelAdmin):
       list_filter = ('content',)
       fields = ('content' , 'status' , 'category' , 'created_at' , 'updated_at' ,)
       ordering = ('status' , 'content' , 'category' , 'created_at' ,)
       search_fields = ['content']
    
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_filter = ('email',)
    fields = ('username' , 'lastname' , 'first_name' , 'profile',)
    ordering = ('username' , 'last_name' , 'first_name' , 'profile',)
    search_fields = ['username']
