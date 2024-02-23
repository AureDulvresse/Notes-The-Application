from rest_framework.response import Response

class Utils:

    def _list(model, model_serializer, param) -> Response:

        elements = model.objects.all().filter(user = param).order_by('-updated_at')

        serializer = model_serializer(elements, many = True)

        return Response(serializer.data)
    

    def _get(model, model_serializer, param) -> Response:

        element = model.objects.get(uuid = param)

        serializer = model_serializer(element, many = False)

        return Response(serializer.data)
    
    
    def _update(request, model, model_serializer, param) -> Response:
        data = request.data

        element = model.objects.get(uuid = param)

        serializer = model_serializer(instance=element, data=data)

        if serializer.is_valid():

            serializer.save()

        return Response(serializer.data)
    
    
    def _delete(model, param) -> Response:
        element_to_delete = model.objects.get(id = param)
        element_to_delete.delete()

        return Response("Suppression effectuée")