# Generated by Django 4.2.6 on 2023-12-14 19:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forms', '0007_remove_form_link_delete_formdata'),
    ]

    operations = [
        migrations.AlterField(
            model_name='form',
            name='fields',
            field=models.ManyToManyField(related_name='forms_links', to='forms.field'),
        ),
    ]
