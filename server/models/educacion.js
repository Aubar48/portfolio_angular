// models/Educacion.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Educacion = sequelize.define('Educacion', {
  institucion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inicio: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  fin: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

Usuario.hasMany(Educacion);
Educacion.belongsTo(Usuario);

module.exports = Educacion;
