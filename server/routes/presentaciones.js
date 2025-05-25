const express = require('express');
const router = express.Router();
const multer = require('multer');
const Presentacion = require('../models/presentacion');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/presentaciones/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Obtener presentación por UsuarioId
router.get('/:usuarioId', async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const presentacion = await Presentacion.findOne({ where: { UsuarioId: usuarioId } });
    if (!presentacion) return res.status(404).json({ error: 'No encontrada' });

    res.json(presentacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear presentación
router.post('/', upload.single('foto'), async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      descripcion,
      linkLinkedin,
      linkGithub,
      linkCV,
      UsuarioId
    } = req.body;

    const nueva = await Presentacion.create({
      nombre,
      apellido,
      descripcion,
      linkLinkedin,
      linkGithub,
      linkCV,
      UsuarioId,
      foto: req.file ? req.file.filename : null
    });

    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar presentación
router.put('/:id', upload.single('foto'), async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (req.file) {
      data.foto = req.file.filename;
    }

    await Presentacion.update(data, { where: { id } });
    res.json({ message: 'Presentación actualizada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
