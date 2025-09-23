Prova Técnica – API MusicPlayce em Go (Parte Opcional) 🚀
Esta é a implementação da Parte Opcional do desafio de Backend Sênior da MusicPlayce, desenvolvida em Go (Golang).

Trata-se de uma API REST minimalista com um endpoint para listar as músicas cadastradas, conectando-se ao mesmo banco de dados PostgreSQL utilizado pela API principal em NestJS. O objetivo é demonstrar proficiência e versatilidade em diferentes ecossistemas de backend.

✨ Features
✅ Endpoint GET /songs para listar todas as músicas.

✅ Conexão com PostgreSQL utilizando o driver de alta performance pgx.

✅ Servidor web construído com a biblioteca padrão net/http.

✅ Documentação automática de API com swaggo/swag.

✅ Integração total com o ambiente Docker Compose do projeto principal.

🛠️ Tecnologias Utilizadas
Linguagem: Go

Banco de Dados: PostgreSQL (compartilhado com a API NestJS)

Driver SQL: pgx/v5

Documentação: swaggo/swag

Containerização: Docker

🚀 Como Executar
Esta API foi projetada para ser executada como parte do ambiente Docker Compose do projeto principal, que orquestra todos os serviços.

Certifique-se de estar na pasta raiz do desafio completo (onde o arquivo docker-compose.yml está localizado). No caso: music_api.

Execute o comando para construir as imagens e iniciar todos os contêineres:

Bash

docker-compose up --build
O Docker irá construir e iniciar a API em Go, a API em NestJS e o banco de dados.

A API Go estará disponível em http://localhost:8081.

🎯 Endpoint de Exemplo
Para testar o endpoint principal e obter a lista de músicas, utilize o comando curl ou acesse a URL no seu navegador:

Bash

curl http://localhost:8081/songs
📄 Documentação da API (Swagger)
A documentação interativa para esta API, gerada com swaggo/swag, está disponível no seguinte endereço:

➡️ http://localhost:8081/swagger/index.htm