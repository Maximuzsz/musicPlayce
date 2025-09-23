Guia Rápido de Execução
Este guia contém as instruções para configurar e executar o ambiente de desenvolvimento completo, que inclui as duas APIs (NestJS e Go), o banco de dados (PostgreSQL) e o emulador do Firebase Functions.

1. Pré-requisitos
Antes de começar, garanta que você tenha os seguintes softwares instalados em sua máquina:

Git

Docker

Docker Compose

2. Configuração Inicial
Siga estes passos uma única vez para preparar o projeto.

a) Clone o Repositório

Bash

git clone musicplayce
cd musicplayce
b) Crie o Arquivo de Ambiente (.env) dentro de musicplayce/music_api como no exemplo: 

# Configuração do PostgreSQL
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=musicplayce

DATABASE_URL="postgresql://myuser:mypassword@db:5432/musicplayce?schema=public"

# URL para a API Go (sem o schema e com sslmode=disable)
GO_DATABASE_URL="postgresql://myuser:mypassword@db:5432/musicplayce?sslmode=disable"

API_PORT=3000

3. Executando Todos os Serviços
Com o Docker em execução na sua máquina, utilize um único comando para construir as imagens e iniciar todos os contêineres.

Execute o seguinte comando na raiz do projeto (onde o arquivo docker-compose.yml está localizado):

Bash
cd music_api
docker-compose up --build
O que este comando faz? Ele irá construir as imagens para a API NestJS, a API Go, baixar a imagem do PostgreSQL e iniciar todos os três contêineres de forma orquestrada.

Atenção: A primeira execução pode levar alguns minutos.

Abra um novo terminal e rode o seguinte comando:
Bash
cd functions_firebase
cd npm install
npm start ou npm test

4. Verificando os Serviços
Após a inicialização, os seguintes serviços estarão disponíveis nos endereços abaixo:

API Principal (NestJS)
Aplicação: http://localhost:3000

Documentação (Swagger): http://localhost:3000/api

API Opcional (Go)
Aplicação: http://localhost:8081

Endpoint de Músicas: http://localhost:8081/songs

Documentação (Swagger): http://localhost:8081/swagger/index.html

Firebase Functions Emulator
Painel dos Emuladores (UI): http://localhost:4000

Endpoint da Função createUser:  http://localhost:5001/musicplayce-de217/southamerica-east1/createUser

5. Como Parar o Ambiente
Para parar todos os contêineres, pressione Ctrl + C no terminal onde o docker-compose está rodando.

Se você iniciou os contêineres em segundo plano (com a flag -d), use o seguinte comando para pará-los:

Bash

docker-compose down