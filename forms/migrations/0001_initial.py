# Generated by Django 4.2.6 on 2023-12-08 12:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Form',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('unique_url', models.CharField(blank=True, default='ff3861bf-d580-4644-9aa7-2d0444ebd197', max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='FormField',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=50)),
                ('data_type', models.CharField(choices=[('number', 'Number'), ('text', 'Text'), ('checkbox', 'Checkbox')], max_length=10)),
                ('form', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='forms.form')),
            ],
        ),
    ]
