from rest_framework import views, status, generics
from rest_framework.response import Response
import uuid

from .serializers import FormSerializer, FormFieldsSerializer
from .models import Form
from .models import FormLink

class FormLinkView(views.APIView):
    def get(self, request, link):
        try:
            form_link = FormLink.objects.get(link = link)
            form = form_link.form
        except FormLink.DoesNotExist:
            return Response({'error': 'Invalid link'}, status = status.HTTP_404_NOT_FOUND)
        
        serializer = FormFieldsSerializer(form)
        serialized_data = serializer.data
        serialized_data['form_id'] = form.id
        return Response(serialized_data, status = status.HTTP_200_OK)

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
    serializer_class = FormFieldsSerializer  # Use the serializer that includes the link
    def get_queryset(self):
        return Form.objects.all()

class FormSubmitView(views.APIView):
    def post(self, request, link):
        try:
            form_link = FormLink.objects.get(link = link)
            form = form_link.form
        except FormLink.DoesNotExist:
            return Response({'error': 'Invalid link'}, status = status.HTTP_404_NOT_FOUND)

        serializer = FormSerializer(data = request.data)
        if serializer.is_valid():
            # Save form submission data
            # This is a simple example; you may want to customize this part based on your form structure
            form_data = serializer.validated_data.get('fields', [])
            form_submission = {'form': form.id, 'data': form_data}
            # Save form submission data to your database or perform other actions
            # You can also associate the form submission with a user if you have user authentication

            return Response({'message': 'Form submitted successfully'}, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)