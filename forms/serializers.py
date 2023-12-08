from rest_framework import serializers
from .models import Form, FormField

class FormFieldSerializer(serializers.ModelSerializer):
    data_type = serializers.CharField(default="string")
    class Meta:
        model = FormField
        fields = '__all__'

class FormSerializer(serializers.ModelSerializer):
    fields = FormFieldSerializer(many=True, read_only=True)
    class Meta:
        model = Form
        fields = ['title', 'unique_url', 'fields']