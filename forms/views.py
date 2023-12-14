from rest_framework import views, status, generics
from rest_framework.response import Response
import uuid

from .serializers import FormSerializer
from .models import Form
from .models import FormLink

class FormLinkView(views.APIView):
    def get(self, request, link):
        try:
            form_link = FormLink.objects.get(link = link)
            form = form_link.form
        except FormLink.DoesNotExist:
            return Response({'error': 'Invalid link'}, status = status.HTTP_404_NOT_FOUND)

        # Implement logic to render the form and handle submissions
        # ...

def generate_unique_link():
    while True:
        link = str(uuid.uuid4())[:8]
        if not FormLink.objects.filter(link=link).exists():
            return link
class FormCreateView(views.APIView):
    def post(self, request):
        serializer = FormSerializer(data = request.data)
        if serializer.is_valid():
            form = serializer.save()
            link = generate_unique_link()
            form.link = link
            FormLink.objects.create(form = form, link = link)
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
class FormRetrieveView(views.APIView):
    def get(self, request, pk):
        try:
            form = Form.objects.get(pk=pk)
        except Form.DoesNotExist:
            return Response({'error': 'Form not found'}, status = status.HTTP_404_NOT_FOUND)

        serializer = FormSerializer(form)
        return Response(serializer.data, status = status.HTTP_200_OK)
    
class FormListView(generics.ListAPIView):
    queryset = Form.objects.all()
    serializer_class = FormSerializer

