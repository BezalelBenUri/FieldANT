from rest_framework import views, status
from rest_framework.response import Response

from .serializers import FormSerializer
from .models import Form

class FormCreateView(views.APIView):
    def post(self, request):
        serializer = FormSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class FormRetrieveView(views.APIView):
    def get(self, request, pk):
        try:
            form = Form.objects.get(pk=pk)
        except Form.DoesNotExist:
            return Response({'error': 'Form not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = FormSerializer(form)
        return Response(serializer.data, status=status.HTTP_200_OK)

