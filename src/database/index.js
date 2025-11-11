const { Sequelize } = require('sequelize');
const AccountModel = require('./models/Account');

// Cria instancia do Sequelize usando as variaveis de ambiente do docker-compose
const sequelize = new Sequelize(
  process.env.DB_NAME || 'bank',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

const Account = AccountModel(sequelize);

// Sincroniza as tabelas e garante uma conta inicial para teste
async function initDB() {

  // sincroniza modelos cria/atualiza tabelas
  await sequelize.sync({ alter: true });

  // cria conta de exemplo se não existir 
  // conta 54321 com saldo 1000
  const existing = await Account.findByPk(54321);
  if (!existing) {
    await Account.create({ conta: 54321, saldo: 1000 });
  }
}

module.exports = { sequelize, Account, initDB };
