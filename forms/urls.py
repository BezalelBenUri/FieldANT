from django.urls import path
from .views import FormCreateView, FormRetrieveView, FormListView

urlpatterns = [
    path('forms/', FormCreateView.as_view()),
    path('forms/<int:pk>/', FormRetrieveView.as_view()),
    path('forms/list/', FormListView.as_view(), name = 'form-list'),
]
