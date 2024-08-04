FROM python:3.9-slim

ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Copia o arquivo requirements.txt para o container
COPY requirements.txt /app/
RUN pip install --upgrade pip  # Atualizar o pip
RUN pip install --no-cache-dir -r requirements.txt

# Copia o código fonte do Django para o container
COPY . /app/

# Comando para iniciar o servidor Django com Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "todo_project.wsgi:application"]
