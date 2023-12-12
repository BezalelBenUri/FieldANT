from django.urls import path
from .views import FormCreateView
from .views import FormRetrieveView

urlpatterns = [
    path('forms/', FormCreateView.as_view()),
    path('forms/<int:pk>/', FormRetrieveView.as_view()),
]
