const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers } = require('./schema');
const { initDB } = require('./database');

// Inicializa o banco
async function start() {
  await initDB(); // garante que o Postgres tera a tabela e a conta inicial
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await server.listen({ port: process.env.PORT || 4000 });
  console.log(`Servidor GraphQL rodando em ${url}`);
}

start();
