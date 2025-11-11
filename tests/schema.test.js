const { resolvers } = require('../src/schema');
const db = require('../src/database');

beforeEach(async () => {
  const { Sequelize } = require('sequelize');
  const AccountModel = require('../src/database/models/Account');
  const sequelize = new Sequelize('sqlite::memory:', { logging: false });
  const Account = AccountModel(sequelize);
  db.Account = Account;
  await sequelize.sync({ force: true });
  await Account.create({ conta: 54321, saldo: 1000 });
});

test('query saldo retorna valor', async () => {
  const res = await resolvers.Query.saldo(null, { conta: 54321 });
  expect(res).toBe(1000);
});

test('mutation depositar retorna conta atualizada', async () => {
  const res = await resolvers.Mutation.depositar(null, { conta: 54321, valor: 200 });
  expect(res.saldo).toBe(1200);
});

test('mutation sacar retorna conta atualizada', async () => {
  const res = await resolvers.Mutation.sacar(null, { conta: 54321, valor: 200 });
  expect(res.saldo).toBe(800);
});
