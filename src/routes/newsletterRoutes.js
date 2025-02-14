const express = require('express');
const { subscribeNewsletter, unsubscribeNewsletter } = require('../controllers/newsletterController');

const router = express.Router();

router.post('/subscribe', subscribeNewsletter);
router.post('/unsubscribe', unsubscribeNewsletter);

module.exports = router;