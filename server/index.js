const dotenv =require('dotenv')
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const usuarioRoutes = require('./routes/usuario');
const educacionRoutes = require('./routes/educacion');
const experienciaRoutes = require('./routes/experiencia');
const usuariosRoutes = require('./routes/usuario');
const proyectosRoutes = require('./routes/proyectos');
const presentacionesRoutes = require('./routes/presentaciones');

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuarioRoutes);

app.use('/uploads', express.static('uploads')); 
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/proyectos', proyectosRoutes);
app.use('/api/presentacion', presentacionesRoutes);

module.exports = app;


app.use('/api/educacion', educacionRoutes);
app.use('/api/experiencia', experienciaRoutes);


app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // sincroniza modelos con la base
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error conectando a la base:', error);
  }
});
