const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { auth, adminOnly } = require('../middleware/auth');
const Message = require('../models/Message'); // Import the Message model

// Register (user or admin)
router.post('/register', async (req, res) => {
  const { email, password, role = 'user', fullName, department, academicYear } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed, role, fullName, department, academicYear });
    await user.save();

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, role: user.role, userId: user._id }); // Include the user's ID
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get All Users
router.get('/all-users', auth, adminOnly, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Post a message
router.post('/post-message', auth, adminOnly, async (req, res) => {
  const { department, batch, from, subject, description, link } = req.body;

  try {
    if (!department || !batch || !from || !subject || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const message = new Message({ department, batch, from, subject, description, link });
    await message.save();

    res.status(201).json({ message: 'Message posted successfully' }); // Removed email functionality
  } catch (err) {
    console.error('Error in /post-message:', err.message);
    res.status(500).json({ error: 'Failed to post message' });
  }
});

// Update form submission
router.post('/update-form-submission', auth, async (req, res) => {
  const { messageId, studentId } = req.body;

  try {
    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    message.formSubmission.set(studentId, true); // Mark form submission as completed for the student
    await message.save();

    res.status(200).json({ message: 'Form submission updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch all messages
router.get('/messages', auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }); // Fetch all messages sorted by creation date
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch logged-in user's details
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch form submission statuses with student names
router.get('/form-submissions', auth, adminOnly, async (req, res) => {
  try {
    const messages = await Message.find();
    const submissions = [];

    for (const message of messages) {
      for (const [studentId, status] of message.formSubmission.entries()) {
        const student = await User.findById(studentId).select('fullName');
        submissions.push({
          studentId,
          studentName: student ? student.fullName : 'Unknown',
          status,
        });
      }
    }

    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
