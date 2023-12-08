from django.db import models
import uuid
# Create your models here.
class Form(models.Model):
    title = models.CharField(max_length=100)
    unique_url = models.CharField(max_length=255, unique=True, blank = True, default = str(uuid.uuid4()))

class FormField(models.Model):
    DATA_TYPES = [
        ('number', 'Number'),
        ('text', 'Text'),
        ('checkbox', 'Checkbox'),
    ]
    form = models.ForeignKey(Form, on_delete=models.CASCADE)
    label = models.CharField(max_length=50)
    data_type = models.CharField(max_length=10, choices=DATA_TYPES)