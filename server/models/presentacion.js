// models/Presentacion.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Presentacion = sequelize.define('Presentacion', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  foto: {
    type: DataTypes.STRING, // Ruta a la imagen
    allowNull: true,
  },
  linkLinkedin: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  linkGithub: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  linkCV: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

Usuario.hasOne(Presentacion);
Presentacion.belongsTo(Usuario);

module.exports = Presentacion;
