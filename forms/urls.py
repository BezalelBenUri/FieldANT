from django.urls import path
from .views import FormCreateView, FormRetrieveView, FormListView, FormLinkView, FormSubmitView

urlpatterns = [
    path('forms/', FormCreateView.as_view()),
    path('forms/<int:pk>/', FormRetrieveView.as_view()),
    path('forms/list/', FormListView.as_view(), name = 'form-list'),
    path('forms/link/<str:link>/', FormLinkView.as_view(), name = 'form-link'),
    path('forms/submit/<str:link>/', FormSubmitView.as_view(), name = 'form-submit'),
]
