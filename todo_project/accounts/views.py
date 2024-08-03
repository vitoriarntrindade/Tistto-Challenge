from django.contrib.auth.models import User
from django.contrib.auth import logout
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def register(request):
    # Registrar novo usuário

    username = request.data.get('username')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    User.objects.create_user(username=username, password=password)

    return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def user_logout(request):
    # Logout de usuário

    logout(request)
    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)