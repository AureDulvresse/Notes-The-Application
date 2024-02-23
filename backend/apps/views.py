from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Category, Notes, User
from .serializers import CategorySerializer, NotesSerializer, UserSerializer

from .utils import Utils

# Create your views here.

@api_view(['GET'])
def StatistiquesViews(request, id_user):
    
    nb_categories = Category.objects.all().filter(user = id_user).count()
    nb_notes = Notes.objects.all().filter(user = id_user).count()
    nb_tasks_done = Notes.objects.all().filter(user = id_user, status = True).count()

    data = {
        'nb_categories': nb_categories,
        'nb_notes': nb_notes,
        'tasks_completed': nb_tasks_done,
    }

    return Response(data)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def CategoryViews(request, id_user) -> Response:

    if request.method == "GET":
        categories = Category.objects.all().filter(user = id_user)

        serializer = CategorySerializer(categories, many = True)

        return Response(serializer.data)
        
    if request.method == "POST":
        data = request.data

        new_category = Category.objects.create(
            title = data['title'],
            description = data['description'],
            thumbnail = data['thumbnail'],
            user = data['user'],
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

        if pk.isdigit():
            return Utils._list(Notes, NotesSerializer, pk)
        
        else:
            return Utils._get(Notes, NotesSerializer, pk)
        
    elif request.method == "POST":
        data = request.data

        cat = Category.objects.get(id = data['category'])
        user = User.objects.get(id =  data['user'])
        
        if data['is_task']:
            new_note = Notes.objects.create(
                content = data['content'],
                is_task = data['is_task'],
                category = cat,
                user = user,
            )
        else:
            new_note = Notes.objects.create(
                content = data['content'],
                category = cat,
                user = user,
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
        




        


