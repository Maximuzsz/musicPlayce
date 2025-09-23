Prova Técnica – Firebase Functions (Parte 1) 🔥
Este diretório contém a implementação da Parte 1 do desafio técnico: uma Cloud Function desenvolvida em Node.js com TypeScript.

A função é acionada via HTTP e é responsável por criar novos usuários no Firestore, garantindo a validação dos dados de entrada e a idempotência da operação para evitar usuários duplicados.

✨ Funcionalidades
✅ Endpoint POST para criação de usuários.

✅ Validação de nome (obrigatório) e email (formato válido).

✅ Idempotência: Utiliza o email do usuário como ID do documento no Firestore para evitar duplicatas de forma atômica e eficiente.

✅ Retorno de códigos de status HTTP adequados (201, 400, 405, 409).

✅ Cobertura completa de testes unitários para todas as regras de negócio.

🛠️ Tecnologias Utilizadas
Plataforma: Firebase Cloud Functions

Banco de Dados: Firestore (via Firebase Emulators)

Linguagem: Node.js com TypeScript

Testes: Jest

Teste Manual da Função (via curl)
Com os emuladores rodando, você pode chamar a função com o seguinte comando. Lembre-se de substituir <SEU_PROJECT_ID> pelo ID do seu projeto Firebase.

Bash

curl -X POST http://localhost:5001/<SEU_PROJECT_ID>/southamerica-east1/createUser \
-H "Content-Type: application/json" \
-d '{
  "name": "Novo Usuário",
  "email": "teste@exemplo.com"
}'
Após executar, você pode verificar o resultado na aba "Firestore" do painel dos emuladores.

🧪 Como Rodar os Testes Unitários (Jest)
Os testes unitários validam a lógica da função de forma isolada e rápida, sem depender dos emuladores.

Navegue até a pasta functions dentro deste diretório:

Bash

cd firebase_functions
Instale as dependências (se for a primeira vez):

Bash

npm install
Execute os testes:

Bash

npm test
Você verá o resultado de todos os casos de teste sendo executados no terminal.

📂 Estrutura de Arquivos
A estrutura de código principal da função está organizada da seguinte forma:

functions/
├── src/
│   ├── index.ts          # Ponto de entrada que exporta as funções
│   ├── createUser.ts     # Lógica da função de criar usuário
│   └── createUser.test.ts  # Testes unitários para a função
├── package.json
└── tsconfig.json