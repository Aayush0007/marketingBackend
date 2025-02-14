const ServiceContact = require('../models/ServiceContact');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Email validation function
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Message length validation function
const validateMessageLength = (message) => {
  const maxWords = 100;
  const wordCount = message.trim().split(/\s+/).length;
  return wordCount <= maxWords;
};

// Controller function to create a new service contact
exports.createServiceContact = async (req, res) => {
  const { name, email, message, subject } = req.body;

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address' });
  }

  // Validate message length
  if (!validateMessageLength(message)) {
    return res.status(400).json({ success: false, message: 'Message must be 100 words or fewer' });
  }

  try {
    // Insert data into the database and return the inserted record
    const contact = await ServiceContact.addServiceContact(name, email, message, subject);

    if (!contact) {
      return res.status(500).json({ success: false, message: 'Failed to insert into database' });
    }

    // Email notification setup
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.PERSONAL_EMAIL,
      subject: 'New Service Contact Form Submission',
      text: `You have a new service contact form submission:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    };

    // Send email notification
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    // Send response back to client
    res.status(201).json({ success: true, contact });
  } catch (err) {
    console.error('Error creating service contact:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
