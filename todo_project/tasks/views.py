from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Task
from .serializers import TaskSerializer


class TaskListCreate(generics.ListCreateAPIView):
    # Listar e criar tarefas

    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filtrar tarefas pelo usuário autenticado

        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Associar tarefa ao usuário autenticado

        serializer.save(user=self.request.user)


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    # Ler, atualizar e excluir tarefa

    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filtrar tarefas pelo usuário autenticado

        return Task.objects.filter(user=self.request.user)


