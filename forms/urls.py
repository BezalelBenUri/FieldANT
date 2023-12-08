from django.urls import path
from .views import FormListCreateView, FormFieldListCreateView

urlpatterns = [
    path('forms/', FormListCreateView.as_view(), name='form-list-create'),
    path('form-fields/', FormFieldListCreateView.as_view(), name='form-field-list-create'),
]
