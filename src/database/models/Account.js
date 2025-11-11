const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Account = sequelize.define('Account', {
    // numero da conta 
    conta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    // saldo da conta
    saldo: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    }
  }, {
    tableName: 'accounts',
    timestamps: false
  });

  return Account;
};
