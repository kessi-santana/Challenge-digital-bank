const { Account } = require('../database');


class AccountService {
  // Retorna o saldo da conta
  async getSaldo(conta) {
    let acc = await Account.findByPk(conta);
    if (!acc) {
      // se não existir, cria uma nova conta com saldo 0
      acc = await Account.create({ conta, saldo: 0 });
    }
    return acc.saldo;
  }

  // Deposita um valor positivo na conta e retorna a conta atualizada
  async depositar(conta, valor) {
    if (valor <= 0) throw new Error('Valor de depósito inválido');
    let acc = await Account.findByPk(conta);
    if (!acc) {
      acc = await Account.create({ conta, saldo: 0 });
    }
    acc.saldo = acc.saldo + valor;
    await acc.save();
    return acc;
  }

  // Sacar e trata se não poder 
  async sacar(conta, valor) {
    if (valor <= 0) throw new Error('Valor de saque inválido');
    const acc = await Account.findByPk(conta);
    if (!acc) {
      throw new Error('Conta não encontrada.');
    }
    if (acc.saldo < valor) {
      throw new Error('Saldo insuficiente.');
    }
    acc.saldo = acc.saldo - valor;
    await acc.save();
    return acc;
  }
}

module.exports = new AccountService();
