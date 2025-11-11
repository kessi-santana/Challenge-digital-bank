const { Sequelize } = require('sequelize');
const AccountModel = require('../src/database/models/Account');
const AccountService = require('../src/services/accountService');

let sequelize;
let Account;

beforeAll(async () => {
  // cria instância sqlite em memoria para testes
  sequelize = new Sequelize('sqlite::memory:', { logging: false });
  Account = AccountModel(sequelize);
  const db = require('../src/database');
  db.Account = Account; 
  // sincroniza e cria conta inicial
  await sequelize.sync({ force: true });
  await Account.create({ conta: 54321, saldo: 1000 });
});

afterAll(async () => {
  await sequelize.close();
});

test('saldo inicial', async () => {
  const saldo = await AccountService.getSaldo(54321);
  expect(saldo).toBe(1000);
});

test('depositar atualiza saldo', async () => {
  const acc = await AccountService.depositar(54321, 200);
  expect(acc.saldo).toBe(1200);
});

test('sacar com saldo suficiente', async () => {
  const acc = await AccountService.sacar(54321, 300);
  expect(acc.saldo).toBe(900);
});

test('sacar com saldo insuficiente lança erro', async () => {
  await expect(AccountService.sacar(54321, 99999)).rejects.toThrow('Saldo insuficiente.');
});
