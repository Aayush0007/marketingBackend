const express = require('express');
const { submitMessage } = require('../controllers/contactController');

const router = express.Router();

router.post('/contact', submitMessage);

module.exports = router;