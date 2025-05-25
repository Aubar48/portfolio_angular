const express = require('express');
const router = express.Router();
const multer = require('multer');
const Experiencia = require('../models/experiencia');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/experiencia/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Obtener todas las experiencias
router.get('/', async (req, res) => {
  try {
    const experiencias = await Experiencia.findAll();
    res.json(experiencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear nueva experiencia
router.post('/', upload.single('foto'), async (req, res) => {
  try {
    const { titulo, empresa, fechaInicio, fechaFin, descripcion, UsuarioId } = req.body;

    const nueva = await Experiencia.create({
      titulo,
      empresa,
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

// Actualizar experiencia
router.put('/:id', upload.single('foto'), async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (req.file) {
      data.foto = req.file.filename;
    }

    await Experiencia.update(data, { where: { id } });
    res.json({ message: 'Experiencia actualizada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar experiencia
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Experiencia.destroy({ where: { id: req.params.id } });
    if (!eliminado) return res.status(404).json({ error: 'No encontrada' });

    res.json({ message: 'Experiencia eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
