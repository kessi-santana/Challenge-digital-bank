const { gql } = require('apollo-server');
const accountService = require('./services/accountService');


const typeDefs = gql`
  type Conta {
    conta: Int!
    saldo: Float!
  }

  type Query {
    saldo(conta: Int!): Float!
  }

  type Mutation {
    sacar(conta: Int!, valor: Float!): Conta!
    depositar(conta: Int!, valor: Float!): Conta!
  }
`;

const resolvers = {
  Query: {
    // Retorna o saldo atual da conta
    saldo: async (_, { conta }) => {
      return accountService.getSaldo(conta);
    }
  },
  Mutation: {
    // Tenta sacar, se saldo insuficiente, lança erro que o Apollo converte em GraphQL Err
    sacar: async (_, { conta, valor }) => {
      return accountService.sacar(conta, valor);
    },
    // Deposita e retorna conta atualizada
    depositar: async (_, { conta, valor }) => {
      return accountService.depositar(conta, valor);
    }
  }
};

module.exports = { typeDefs, resolvers };
