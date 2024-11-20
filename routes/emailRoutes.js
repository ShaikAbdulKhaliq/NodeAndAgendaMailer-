// 5. Routes - emailRoutes.js
const express = require('express');
const router = express.Router();
const { createEmailJob } = require('../controllers/emailController');

// POST endpoint to schedule an email
router.post('/schedule', createEmailJob);

module.exports = router;