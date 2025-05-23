const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('portfolio', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // para no ver logs SQL en consola (opcional)
});

module.exports = sequelize;
