from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView

from .views import register, user_login, user_logout

urlpatterns = [
    path('register', register, name='register'),
    path('login', TokenObtainPairView.as_view(), name='login'),
    path('logout', user_logout, name='logout'),
]