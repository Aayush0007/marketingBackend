const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const nodemailer = require('nodemailer');
const cron = require('node-cron'); // Add this line
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
exports.subscribeNewsletter = async (req, res) => {
    const { email } = req.body;
  
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }
  
    try {
      const subscriber = await NewsletterSubscriber.subscribe(email);
      if (subscriber) {
        res.status(201).json({ success: true, subscriber });
      } else {
        res.status(400).json({ success: false, message: 'Email already subscribed' });
      }
    } catch (err) {
      console.error('Error subscribing to newsletter:', err);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  
  exports.unsubscribeNewsletter = async (req, res) => {
    const { email } = req.body;
  
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }
  
    try {
      const subscriber = await NewsletterSubscriber.unsubscribe(email);
      if (subscriber) {
        res.status(200).json({ success: true, message: 'Unsubscribed successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Email not found or already unsubscribed' });
      }
    } catch (err) {
      console.error('Error unsubscribing from newsletter:', err);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  
// Schedule a weekly email job at 7:00 PM IST (13:30 UTC) every Sunday
cron.schedule('30 13 * * 0', async () => {
    console.log('Sending weekly emails to subscribers...');
  
    try {
      const subscribers = await NewsletterSubscriber.getSubscribers();
      const emails = subscribers.map(subscriber => subscriber.email);
  
      emails.forEach(email => {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Weekly Newsletter',
          text: 'Here is your weekly newsletter content!' // Update this to dynamic content
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });
      });
    } catch (err) {
      console.error('Error sending weekly emails:', err);
    }
  });
  