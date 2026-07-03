const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// Proteger la ruta con authMiddleware
router.post('/', authMiddleware, orderController.createOrder);

module.exports = router;
