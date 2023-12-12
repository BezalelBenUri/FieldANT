from django.db import models


class Field(models.Model):
    """
    Model representing a field within a form with its type, label, options, and order.
    """
    name = models.CharField(max_length = 255)
    data_type = models.CharField(max_length = 255, choices = (
        ('CHAR', 'Char'), ('INTEGER', 'Integer'), ('FLOAT', 'Float'), ('BOOLEAN', 'Boolean')))
class Form(models.Model):
    """
    Model representing a form with its title, unique link, and creation timestamp.
    """
    name = models.CharField(max_length = 255)
    description = models.TextField(blank = True)
    created_at = models.DateTimeField(auto_now_add = True)
    fields = models.ManyToManyField(Field, related_name = 'forms')
