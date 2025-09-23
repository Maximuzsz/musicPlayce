Prova Técnica – API MusicPlayce 🎶
Esta é a implementação da API REST para o desafio de Backend Sênior da MusicPlayce. A API gerencia o cadastro e a consulta de músicas, além de registrar e ranquear as músicas mais tocadas, seguindo as melhores práticas de desenvolvimento e arquitetura de software.

✨ Features
✅ Cadastro, listagem e busca de músicas.

✅ Registro de execuções (plays) de músicas.

✅ Ranking das 10 músicas mais tocadas (usando ORM e SQL puro).

✅ Validação de dados de entrada e tratamento de erros.

✅ Documentação interativa com Swagger/OpenAPI.

✅ Ambiente de desenvolvimento completo e isolado com Docker e Docker Compose.

🛠️ Tecnologias Utilizadas
Backend: NestJS (Node.js) e TypeScript

Banco de Dados: PostgreSQL (orquestrado via Docker)

ORM: Prisma

Containerização: Docker e Docker Compose

Documentação: Swagger (OpenAPI)

🚀 Como Rodar o Projeto
Para executar o projeto, você precisa ter o Docker e o Docker Compose instalados em sua máquina.

Passo a Passo
Clone o repositório:

Bash

git clone https://github.com/seu-usuario/seu-repositorio.git
Navegue até a pasta da API:

Bash

cd seu-repositorio/pasta-da-api
Crie o arquivo de configuração de ambiente:
Copie o arquivo de exemplo .env.example para criar seu próprio arquivo .env.

Bash

cp .env.example .env
O arquivo .env já vem com valores padrão que funcionam com o Docker Compose.

Execute o Docker Compose:
Este comando irá construir a imagem da API, baixar a imagem do PostgreSQL e iniciar os dois contêineres.

Bash

docker-compose up --build
A primeira execução pode levar alguns minutos para baixar as imagens e construir o projeto.

Pronto!
A API estará rodando em http://localhost:3000.

📄 Documentação da API (Swagger)
A documentação completa e interativa dos endpoints, incluindo modelos de dados e a possibilidade de testar as rotas diretamente pelo navegador, está disponível em:

➡️ http://localhost:3000/api

📂 Estrutura do Projeto
A estrutura de pastas principal da aplicação segue o padrão modular do NestJS:

src/
├── prisma/         # Schema do Prisma e serviço de conexão
├── songs/          # Módulo para músicas (Controller, Service, DTO)
├── plays/          # Módulo para execuções (Controller, Service, DTO)
├── main.ts         # Ponto de entrada da aplicação (bootstrap)
└── app.module.ts   # Módulo raiz