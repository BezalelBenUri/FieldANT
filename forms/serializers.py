from rest_framework import serializers
from .models import Form, Field

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
    fields = FieldSerializer(many=True)

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