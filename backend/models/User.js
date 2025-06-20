const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  fullName: { type: String, required: true },
  department: { type: String, required: true },
  academicYear: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
