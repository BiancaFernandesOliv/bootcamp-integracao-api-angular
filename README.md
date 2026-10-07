# 💻 Integração Front-End com Back-End .NET

Repositório com o projeto desenvolvido durante o desafio individual do módulo de Integração Front-End com Back-End do Bootcamp.

A aplicação integra um Front-End desenvolvido em Angular com uma API REST desenvolvida em ASP.NET Core, permitindo realizar operações de gerenciamento de produtos de forma integrada ao banco de dados SQLite.

## 🎯 Objetivos

- Integrar uma aplicação Angular com uma API REST desenvolvida em ASP.NET Core.
- Praticar o consumo de APIs utilizando HttpClient.
- Implementar as operações de CRUD de produtos no Front-End.
- Trabalhar com requisições HTTP utilizando os métodos GET, POST, PUT e DELETE.
- Configurar o CORS no Back-End para permitir a comunicação com o Angular.
- Validar as operações realizadas na aplicação diretamente no banco de dados SQLite.

## 📁 Estrutura

O projeto está organizado em duas partes principais:

```text
Bootcamp-Integracao-Api-Angular/
│
├── Backend/
│   └── MinhaPrimeiraApi/
│       ├── Controllers/
│       ├── Data/
│       ├── Models/
│       ├── Repositories/
│       ├── Services/
│       ├── Migrations/
│       ├── Program.cs
│       └── MinhaPrimeiraApi.csproj
│
├── Frontend/
│   └── Produtos/
│       ├── public/
│       ├── src/
│       │   └── app/
│       │       ├── models/
│       │       ├── services/
│       │       ├── app.ts
│       │       ├── app.html
│       │       └── app.css
│       ├── angular.json
│       └── package.json
│
├── .gitignore
└── Bootcamp-Integracao-Api-Angular.slnx

```

## 🔙 Back-End

A API foi desenvolvida com ASP.NET Core e utiliza Entity Framework Core para realizar a persistência dos produtos em um banco de dados SQLite.

A API possui os seguintes endpoints:

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/Produtos` | Lista todos os produtos |
| GET | `/api/Produtos/{id}` | Busca um produto pelo ID |
| POST | `/api/Produtos` | Cadastra um novo produto |
| PUT | `/api/Produtos/{id}` | Atualiza um produto existente |
| DELETE | `/api/Produtos/{id}` | Remove um produto |

## 🌐 Front-End

O Front-End foi desenvolvido em Angular e realiza a comunicação com a API por meio do `HttpClient`.

A aplicação permite:

- Visualizar os produtos cadastrados.
- Buscar um produto pelo ID.
- Cadastrar novos produtos.
- Editar produtos diretamente na tabela.
- Remover produtos.
- Visualizar mensagens de sucesso e erro durante as operações.

## 🔗 Integração com a API

A comunicação entre o Angular e a API é realizada por meio de requisições HTTP.

O Back-End possui uma configuração de CORS permitindo requisições provenientes da aplicação Angular executada localmente em:

```text
http://localhost:4200
```

A API é executada localmente em:

```text
https://localhost:7096
```

## 🗄️ Banco de dados

A aplicação utiliza SQLite para persistência dos dados.

O acesso ao banco é realizado por meio do Entity Framework Core, utilizando:

- `DbContext`
- `DbSet`
- `Migrations`

As alterações realizadas através do Front-End são persistidas no banco de dados e podem ser verificadas utilizando o DBeaver.

## 🛠️ Tecnologias

### Back-End

- C#
- .NET
- ASP.NET Core
- Entity Framework Core
- SQLite
- REST API
- Swagger

### Front-End

- Angular
- TypeScript
- HTML
- CSS
- HttpClient

### Ferramentas

- Visual Studio
- Visual Studio Code
- DBeaver
- Git
- GitHub

## ▶️ Como executar

### Pré-requisitos

- .NET SDK
- Node.js
- Angular CLI
- Visual Studio ou outra IDE compatível com .NET
- DBeaver (opcional, para consultar o banco de dados)

### Executando o Back-End

Acesse a pasta da API:

```bash
cd Backend/MinhaPrimeiraApi
```

Antes de iniciar a API, configure o certificado HTTPS de desenvolvimento:

```bash
dotnet dev-certs https --trust
```

Execute a aplicação utilizando o perfil HTTPS:

```bash
dotnet run --launch-profile https
```

A API estará disponível em:

```text
https://localhost:7096
```

O Swagger pode ser acessado em:

```text
https://localhost:7096/swagger
```

As migrations do Entity Framework Core são aplicadas automaticamente ao iniciar a API, preparando o banco de dados SQLite para utilização.

## Executando o Front-End

Em outro terminal, acesse a pasta do Angular:

```bash
cd Frontend/Produtos
```

Instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
ng serve
```

Após iniciar, acesse:

```text
http://localhost:4200
```

Com o Back-End e o Front-End em execução, a aplicação estará pronta para realizar as operações de gerenciamento de produtos.

## 📌 Observações

O Back-End deve estar em execução antes de utilizar as operações do Front-End.
O banco de dados SQLite é preparado automaticamente pela aplicação por meio das migrations do Entity Framework Core.
