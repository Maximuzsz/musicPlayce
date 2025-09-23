#!/bin/sh

# Espera o PostgreSQL ficar disponível antes de continuar.
# Ele tenta se conectar ao host 'db' na porta 5432.
echo "Aguardando o PostgreSQL..."
while ! pg_isready -h db -p 5432 -q -U ${POSTGRES_USER}; do
  sleep 2
done
echo "PostgreSQL iniciado com sucesso."

# Roda as migrations do Prisma.
# 'migrate deploy' é o comando recomendado para ambientes de produção/CI.
echo "Rodando as migrations..."
npx prisma migrate deploy

# Inicia a aplicação NestJS
echo "Iniciando a aplicação..."
exec node dist/main.js