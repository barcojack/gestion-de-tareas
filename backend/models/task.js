const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, required: true },
  status: { type: String, enum: ['pendiente', 'completada'], required: true }
});

module.exports = mongoose.model('Task', taskSchema);
