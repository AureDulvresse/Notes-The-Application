from rest_framework.serializers import ModelSerializer

from .models import Category, Notes

class CategorySerializer(ModelSerializer):
    
    class Meta:
        model = Category
        fields = "__all__"


class NotesSerializer(ModelSerializer):
    
    class Meta:
        model = Notes
        fields = "__all__"

