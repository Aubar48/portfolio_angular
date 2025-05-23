const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un usuario nuevo con contraseña hasheada
router.post('/', async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'La contraseña es obligatoria' });
    }

    // Generar hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el usuario con la contraseña hasheada
    const usuario = await Usuario.create({
      ...rest,
      password: hashedPassword,
    });

    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // Compara el password recibido con el hash almacenado
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Login exitoso
    res.json({ message: 'Login correcto', user });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
