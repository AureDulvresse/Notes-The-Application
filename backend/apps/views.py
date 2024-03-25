from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Category, Notes
from .serializers import CategorySerializer, NotesSerializer

from .utils import Utils

# Create your views here.
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def CategoryViews(request, pk = None) -> Response:

    if request.method == "GET":
        if not pk:
            return Utils._list(Category, CategorySerializer)
    
        else:
            return Utils._get(Category, CategorySerializer, pk)
        
    if request.method == "POST":
        data = request.data

        new_category = Category.objects.create(
            title = data['title'],
            description = data['description'],
            #thumbnail = data['thumbnail'],
        )
        
        serializer = CategorySerializer(new_category, many = False)

        return Response(serializer.data)

    if request.method == "PUT":
        return Utils._update(request, Category, CategorySerializer, pk)
    
    if request.method == "DELETE":
        return Utils._delete(Category, pk)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def NotesViews(request, pk = None) -> Response:

    if request.method == "GET":

        if not pk:
            return Utils._list(Notes, NotesSerializer)
    
        else:
            return Utils._get(Notes, NotesSerializer, pk)
        
    elif request.method == "POST":
        data = request.data

        cat = Category.objects.get(id = data['category'])
        
        if data['is_task']:
            new_note = Notes.objects.create(
                content = data['content'],
                is_task = data['is_task'],
                category = cat,
            )
        else:
            new_note = Notes.objects.create(
                content = data['content'],
                category = cat,
            )
        
        if not data['description'] == "":
            new_note.description = data['description']
        
        new_note.bgColor = data['bgColor']

        new_note.save()
        
        serializer = NotesSerializer(new_note, many = False)

        return Response(serializer.data)

    elif request.method == "PUT":
        return Utils._update(request, Notes, NotesSerializer, pk)
    
    elif request.method == "DELETE":
        return Utils._delete(Notes, pk)
        




        


