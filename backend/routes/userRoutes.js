// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();

// Sample route
router.get('/users', (req, res) => {
  res.json({ message: 'Here are the users!' });
});

module.exports = router;
