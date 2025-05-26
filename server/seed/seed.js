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
      nombre: 'Nahuel',
      email: 'nahuel@mail.com',
      password: hashedPassword,
    });

    await Presentacion.create({
      nombre: 'Nahuel',
      apellido:'Argandoña',
      descripcion: "I'm from Argentina and I live in Córdoba Capital now. I'm 31 years old, studying web programming full stack is a pleasure for me in Egg Education & Argentina Programa 4.0 MindHub LA & Digital House with Fundacion Formar & Argentina Programa 4.0 UTN, and I am currently studying software development technology at the Instituto Superior Politecnico de Córdoba \"ISPC\". Thanks for taking a look 🐣",
      foto: 'uploads/presentacion/yo.jpg',
      linkLinkedin: 'https://www.linkedin.com/in/aubar48/',
      linkGithub: 'https://github.com/Aubar48',
      linkCV: 'https://www.canva.com/design/DAFoP4HTDqk/YW9Jg6z0ouwf7GeaChLSvg/view?utm_content=DAFoP4HTDqk&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he143a9d067',
      UsuarioId: usuario.id,
    });

    await Proyecto.create({
      titulo: 'Portfolio Personal',
      descripcion: 'Portfolio web desarrollado con Angular y Node.js, implementando un diseño moderno y responsive.',
      foto: 'uploads/proyectos/new-desing.png',
      linkGithub: 'https://github.com/nahuel/portfolio',
      linkDemo: 'https://nahuel-portfolio.netlify.app',
      UsuarioId: usuario.id,
    });

    await Experiencia.create({
      empresa: 'ISPC',
      puesto: 'Desarrollador Full Stack',
      descripcion: 'Desarrollo de aplicaciones web utilizando Angular, Node.js y MySQL.',
      inicio: '2023-01-01',
      fin: '2023-12-31',
      foto: 'uploads/experiencia/ispc.png',
      UsuarioId: usuario.id,
    });

    await Educacion.create({
      institucion: 'Instituto Superior Politécnico Córdoba',
      titulo: 'Tecnicatura en Desarrollo Web y Aplicaciones Digitales',
      descripcion: 'Formación integral en desarrollo web full stack, incluyendo tecnologías como Angular, Node.js, y MySQL.',
      inicio: '2023-01-01',
      fin: '2024-12-31',
      foto: 'uploads/educacion/ispc2.png',
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
