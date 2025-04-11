# 🛍️ Sistema de Gerenciamento de Produtos 

Este é um projeto Fullstack desenvolvido como parte de um desafio técnico. O sistema tem como objetivo o gerenciamento de produtos por categoria, oferecendo funcionalidades completas de cadastro, listagem, edição, exclusão e filtros.  

---

## 📌 Tecnologias Utilizadas

### 🔧 Backend
- Java 17
- Spring Boot 3.4.4
- Spring Data JPA
- MySQL (banco de dados relacional)
- Maven

### 💻 Frontend
- Angular 17
- TypeScript
- HTML + SCSS
- Reactive Forms
- Consumo de API REST

---

## ⚙️ Funcionalidades

### Backend (API REST)
- CRUD de Produtos
- Validação de regras de negócio (ex: não excluir produtos com estoque > 0)
- Filtros por nome e categoria
- Paginação de resultados
- Validação de unicidade (produto com mesmo nome em uma categoria)

### Frontend
- Listagem de produtos em cards com paginação
- Filtro por nome e categoria
- Cadastro e edição via formulário reativo
- Botões de navegação com UX amigável
- Tela de boas-vindas e alertas personalizados
- Design limpo com foco na usabilidade

---

## 🗃️ Banco de Dados

- Utiliza **MySQL** como banco relacional padrão.
- Configuração feita via `application.properties`.
- Possui lógica para criação automática do banco (`createDatabaseIfNotExist=true`).

---

## 🚀 Como Executar o Projeto

### 🔄 Pré-requisitos

- Java 17 ou superior
- Node.js e Angular CLI
- MySQL (usuário: `root`, senha: `root`, porta: `3306`)
- Spring Tool Suite (ou VSCode, IntelliJ...)

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
