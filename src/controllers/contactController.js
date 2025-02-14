const Contact = require('../models/Contact');

exports.submitMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const newMessage = await Contact.addMessage(name, email, message);
    res.json({ success: true, contact: newMessage });
  } catch (error) {
    console.error('Error submitting message:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};