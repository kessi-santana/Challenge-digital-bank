# Challenge-digital-bank

## Introdução

**Challenge-digital-bank** é uma API que simula funcionalidades de um banco digital, permitindo consultar saldo, realizar depósitos e efetuar saques.  

---

## Arquitetura da Solução

A arquitetura foi pensada para ser **simples, modular e de fácil manutenção**.  
Cada camada possui uma responsabilidade bem definida:

```
GraphQL Schema  →  Resolvers  →  Serviços →  Banco de Dados (PostgreSQL)
```

**Fluxo geral:**
1. O cliente envia uma query/mutation GraphQL.
2. O resolver direciona para o serviço correspondente.
3. O serviço aplica as regras de negócio.
4. O resultado é salvo/consultado no banco via Sequelize.
5. A resposta é retornada em formato JSON para o cliente.

---

## Observações sobre o projeto

- Estrutura **modular e organizada**, seguindo boas práticas e possui comentários explicativos.  
- **Testes unitários** garantem estabilidade e qualidade do código.  
- Pode ser executado **localmente** ou via **Docker** com PostgreSQL integrado.

---

## Tecnologias Utilizadas

- **Node.js**
- **Express.js + GraphQL**
- **Sequelize ORM**
- **PostgreSQL**
- **SQLite (para testes)**
- **Jest**
- **Docker e Docker Compose**

---

Lembre-se: é necessário ter o Node.js (versão 14 ou superior), o npm ou yarn e o Docker instalados na sua máquina.

## Como rodar o projeto

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/exame-programador-nodejs.git
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Rodar com Docker (recomendado)
```bash
docker compose up --build
```
Acesse em: [http://localhost:4000]

---

### 4. Testando a API (exemplos GraphQL)

#### Consultar saldo
```graphql
query {
  saldo(conta: 54321)
}
```

#### Depositar
```graphql
mutation {
  depositar(conta: 54321, valor: 200) {
    conta
    saldo
  }
}
```

#### Sacar
```graphql
mutation {
  sacar(conta: 54321, valor: 100) {
    conta
    saldo
  }
}
```

---

## Rodando os testes
```bash
npm test
```

Com cobertura:
```bash
npm test -- --coverage
```

---

## Acessando o Banco de Dados
```bash
docker exec -it postgres_db psql -U postgres -d bank
\dt
SELECT * FROM accounts;
```

---

## Considerações finais

Este projeto foi desenvolvido com foco em **boas práticas**, **clareza de código** e **facilidade de execução**.  
Pode ser facilmente estendido com novas funcionalidades (transferências, extratos, etc).  

Espero que este guia ajude você a entender a estrutura do projeto e como utilizá-lo.
Agradeço por dedicar seu tempo para conhecer este projeto. Contribuições e feedbacks são sempre bem-vindos!