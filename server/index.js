const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const usuarioRoutes = require('./routes/usuario');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuarioRoutes);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // sincroniza modelos con la base
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error conectando a la base:', error);
  }
});
