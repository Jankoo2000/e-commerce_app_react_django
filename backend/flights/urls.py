from django.urls import path
from flights import views

urlpatterns = [
    path('', views.flight, name='flight'),
]
