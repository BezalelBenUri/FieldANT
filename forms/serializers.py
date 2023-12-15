from rest_framework import serializers
from .models import Form, Field, FormLink

class FieldSerializer(serializers.ModelSerializer):
    """
    Serializer for Field model to convert data to JSON format.
    """
    class Meta:
        model = Field
        fields = '__all__'

class FormSerializer(serializers.ModelSerializer):
    """
    Serializer for Form model to convert data to JSON format, including nested Field objects.
    """
    fields = FieldSerializer(many = True)
    link = serializers.CharField(max_length = 255, read_only = True)

    class Meta:
        model = Form
        fields = '__all__'

    def create(self, validated_data):
        fields_data = validated_data.pop('fields')
        form = Form.objects.create(**validated_data)
        for field_data in fields_data:
            field = Field.objects.create(**field_data)
            form.fields.add(field)
        return form
    
class FormLinkSerializer(serializers.ModelSerializer):
    """
    Serializer for FormLink model to convert data to JSON format.
    """
    class Meta:
        model = FormLink
        fields = ('link',)

class FormFieldsSerializer(serializers.ModelSerializer):
    """
    Serializer for Form model to convert data to JSON format, including nested Field objects and link.
    """
    fields = FieldSerializer(many = True)
    link = serializers.SerializerMethodField()

    class Meta:
        model = Form
        fields = ('name', 'fields', 'link')

    def get_link(self, obj):
        try:
            form_link = FormLink.objects.get(form = obj)
            return form_link.link
        except FormLink.DoesNotExist:
            return None