const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

router.get('/', (req, res) => {
  res.status(200).send('its work');
});

router.post('/api/register', AuthController.register);

router.post('/api/confirm', (req, res) => {
  res.send(req.body)
});

router.post('/api/login', AuthController.login);

module.exports = router;