// models/Proyecto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Proyecto = sequelize.define('Proyecto', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  linkGithub: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  linkDemo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  foto: {
    type: DataTypes.STRING, // Ruta al archivo de imagen
    allowNull: true,
  }
});

Usuario.hasMany(Proyecto);
Proyecto.belongsTo(Usuario);

module.exports = Proyecto;
