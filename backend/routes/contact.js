const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newMsg = new Message({ name, email, message });
    await newMsg.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while sending message' });
  }
});

module.exports = router;
