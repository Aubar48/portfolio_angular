const sequelize = require('../config/database');
const Usuario = require('../models/Usuario');
const Presentacion = require('../models/presentacion');
const Proyecto = require('../models/proyecto');
const Experiencia = require('../models/experiencia');
const Educacion = require('../models/educacion');
const bcrypt = require('bcrypt');

async function seed() {
  try {
    await sequelize.sync({ force: true }); // Borra y vuelve a crear las tablas

    const hashedPassword = await bcrypt.hash('123456', 10);

    const usuario = await Usuario.create({
      nombre: 'Juan',
      email: 'juan@mail.com',
      password: hashedPassword,
    });

    await Presentacion.create({
      nombre: 'Juan',
      apellido: 'Pérez',
      descripcion: 'Desarrollador web full stack.',
      foto: 'uploads/presentacion/juan.jpg',
      linkedin: 'https://linkedin.com/in/juan',
      github: 'https://github.com/juan',
      cv: 'https://miweb.com/juan-cv',
      UsuarioId: usuario.id,
    });

    await Proyecto.create({
      titulo: 'Mi Portfolio',
      descripcion: 'Un sitio web personal para mostrar mis proyectos.',
      foto: 'uploads/proyectos/portfolio.jpg',
      linkGithub: 'https://github.com/juan/portfolio',
      linkDemo: 'https://juanweb.com',
      UsuarioId: usuario.id,
    });

    await Experiencia.create({
      empresa: 'Tech Solutions',
      puesto: 'Frontend Developer',
      descripcion: 'Desarrollé interfaces responsivas con React.',
      inicio: '2022-01-01',
      fin: '2023-12-31',
      foto: 'uploads/experiencia/tech.jpg',
      UsuarioId: usuario.id,
    });

    await Educacion.create({
      institucion: 'Universidad Nacional',
      titulo: 'Licenciado en Informática',
      descripcion: 'Carrera universitaria de 5 años.',
      inicio: '2017-01-01',
      fin: '2022-12-31',
      foto: 'uploads/educacion/universidad.jpg',
      UsuarioId: usuario.id,
    });

    console.log('🌱 Base de datos sembrada con éxito');
    process.exit();

  } catch (error) {
    console.error('Error al sembrar la base de datos:', error);
    process.exit(1);
  }
}

seed();
