// models/Experiencia.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Experiencia = sequelize.define('Experiencia', {
  empresa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  puesto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  inicio: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  fin: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

Usuario.hasMany(Experiencia);
Experiencia.belongsTo(Usuario);

module.exports = Experiencia;
