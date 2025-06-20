const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  department: { type: String, required: true },
  batch: { type: String, required: true },
  from: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String }, // Optional field for job link or form link
  formSubmission: { type: Map, of: Boolean, default: {} }, // Tracks form submission status for each student
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);
