from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('addOrder/', views.addOrder, name="addOrder"),
    path('shop/', views.shop, name="shop")
]