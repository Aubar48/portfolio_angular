const express = require('express');
const router = express.Router();
const multer = require('multer');
const Educacion = require('../models/educacion');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/educacion/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Obtener todas las educaciones
router.get('/', async (req, res) => {
  try {
    const educaciones = await Educacion.findAll();
    res.json(educaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear nueva educación
router.post('/', upload.single('foto'), async (req, res) => {
  try {
    const { titulo, institucion, fechaInicio, fechaFin, descripcion, UsuarioId } = req.body;

    const nueva = await Educacion.create({
      titulo,
      institucion,
      fechaInicio,
      fechaFin,
      descripcion,
      UsuarioId,
      foto: req.file ? req.file.filename : null
    });

    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar educación
router.put('/:id', upload.single('foto'), async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (req.file) {
      data.foto = req.file.filename;
    }

    await Educacion.update(data, { where: { id } });
    res.json({ message: 'Educación actualizada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar educación
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Educacion.destroy({ where: { id: req.params.id } });
    if (!eliminado) return res.status(404).json({ error: 'No encontrada' });

    res.json({ message: 'Educación eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
