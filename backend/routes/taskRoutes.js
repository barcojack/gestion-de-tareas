const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const Task = require('../models/task');

// Ruta para obtener todas las tareas
router.get('/', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).send('Error al obtener las tareas');
  }
});

// Ruta para agregar una nueva tarea
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
    const newTask = new Task({
      user: req.user.id,
      title,
      description,
      dueDate,
      priority,
      status,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error al agregar la tarea:', error);
    res.status(500).send('Error al agregar la tarea');
  }
});

// Ruta para eliminar una tarea
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).send('Tarea no encontrada');
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).send('No autorizado');
    }

    await task.remove();
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    res.status(500).send('Error al eliminar la tarea');
  }
});

module.exports = router;
