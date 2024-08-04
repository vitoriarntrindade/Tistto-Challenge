.PHONY: up build down logs migrate createsuperuser restart shell collectstatic build-up

# Construir as imagens e iniciar os containers
build-up:
	docker-compose up --build

# Aplicar migrações no banco de dados
migrate:
	docker-compose exec backend python manage.py migrate

# Criar um superusuário para o Django Admin
createsuperuser:
	docker-compose exec backend python manage.py createsuperuser

# Coletar arquivos estáticos para o Django
collectstatic:
	docker-compose run backend python manage.py collectstatic --no-input

# Reiniciar os containers (parar e iniciar novamente)
restart: down up

# Verificar os logs de todos os containers
logs:
	docker-compose logs -f

# Acessar o shell interativo do container backend
shell:
	docker-compose exec backend /bin/sh

# Parar e remover todos os containers, redes e volumes
down:
	docker-compose down

# Construir as imagens dos containers
build:
	docker-compose build

# Iniciar os containers em modo destacado (detached)
up:
	docker-compose up -d
