const express = require('express');
const { createServiceContact } = require('../controllers/serviceContactController');

const router = express.Router();

router.post('/service-contact', createServiceContact);

module.exports = router;