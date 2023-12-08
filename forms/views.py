from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Form, FormField
from .serializers import FormSerializer, FormFieldSerializer

class FormListCreateView(generics.ListCreateAPIView):
    queryset = Form.objects.all()
    serializer_class = FormSerializer

    def create(self, request, *args, **kwargs):
        form_data = request.data
        form_serializer = self.get_serializer(data=form_data)
        form_serializer.is_valid(raise_exception=True)

        # Create the form
        form_instance = form_serializer.save()

        # Create form fields
        fields_data = form_data.get('fields', [])
        for field_data in fields_data:
            field_data['form'] = form_instance.id
            form_field_serializer = FormFieldSerializer(data=field_data)
            form_field_serializer.is_valid(raise_exception=True)
            form_field_serializer.save()

        headers = self.get_success_headers(form_serializer.data)
        return Response(form_serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class FormFieldListCreateView(generics.ListCreateAPIView):
    queryset = FormField.objects.all()
    serializer_class = FormFieldSerializer
