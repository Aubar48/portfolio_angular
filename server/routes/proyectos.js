const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Proyecto = require('../models/proyecto');

// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/proyectos/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Obtener todos los proyectos
router.get('/', async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll();
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear nuevo proyecto
router.post('/', upload.single('foto'), async (req, res) => {
  try {
    const { titulo, descripcion, linkGithub, linkDemo, UsuarioId } = req.body;

    const nuevoProyecto = await Proyecto.create({
      titulo,
      descripcion,
      linkGithub,
      linkDemo,
      UsuarioId,
      foto: req.file ? req.file.filename : null
    });

    res.status(201).json(nuevoProyecto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un proyecto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Proyecto.destroy({ where: { id } });

    if (!eliminado) return res.status(404).json({ error: 'Proyecto no encontrado' });

    res.json({ message: 'Proyecto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un proyecto
router.put('/:id', upload.single('foto'), async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (req.file) {
      data.foto = req.file.filename;
    }

    const actualizado = await Proyecto.update(data, { where: { id } });

    res.json({ message: 'Proyecto actualizado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
