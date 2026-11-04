# Sistema Acadêmico DS II

Projeto integrador da disciplina Desenvolvimento para Servidores II.

## Desenvolvedor: 

Nome: Renan de Arruda Felix
RA: 2650832413020
Turma: Sistemas para Internet

## Objetivo

Desenvolver gradualmente uma aplicação web para cadastro de alunos, diciplinas, usuários e lançamento de notas.

## ⚙️ Instruções para executar o backend

O backend da aplicação foi desenvolvido em Node.js. Para inicializá-lo, siga os passos abaixo no Terminal do Visual Studio ou no CMD da maquina:

1. Abra o terminal e navegue até a pasta do backend:
   cd backend

2. Instale as dependências do projeto (caso ainda não tenha feito):
    npm install

3. Inicie o servidor em modo de desenvolvimento:
    npm run dev

O servidor indicará no terminal que está disponível em http://localhost:3000.

## 💻 Instruções para executar o frontend

1. Abra a aba de extensões do VS Code no menu lateral esquerdo (ou aperte Ctrl + Shift + X) Pesquise por Live Server e clique em Install se não o tiver.

2. Agora, vá no seu arquivo index.html.
    Você tem duas opções para rodar:
        Clique com o botão direito em qualquer lugar do código HTML e escolha "Open with Live Server".
        
        Ou olhe bem no canto inferior direito da tela do VS Code, na barra azul, e clique num botãozinho escrito "Go Live".

3. O seu navegador padrão vai abrir automaticamente com a página funcionando.

Nota: O backend deve estar em execução no terminal simultaneamente para que o frontend consiga gravar e buscar os dados via fetch.

## Relação dos endpoints disponíveis

A comunicação com a API é feita através do endereço base http://localhost:3000/api.

GET /api/health:
 Descrição: Verifica a disponibilidade e integridade do servidor.
 Resposta (200 OK): {"status": "ok", "mensagem": "Servidor funcionando."}.

GET /api/alunos:
 Descrição: Retorna a lista completa de alunos cadastrados.
 Resposta (200 OK): Array de objetos JSON contendo os dados dos alunos.

POST /api/alunos:
 Descrição: Cadastra um novo aluno na base de dados.
 Resposta (201 Created): Array de objetos JSON contendo os dados dos alunos.

## Como encontrar as evidencias?

Na raiz do App tem uma pasta escrita docs:

entrando vai ter a pasta evidencias com fotos documentando os testes no insominia,
e uma foto do front do site com nenhum erro e mostrando um aluno cadastrado.

## Tecnologias previstas

- HTML
- CSS
- JavaScript
- Node.js
- Express
- MySQL
- JWT
- Git e GitHub

## Estrutura

- frontend: interface da aplicação
- backend: API e regras do servidor
- database: scripts do banco de dados
- docs: documentação e evidências