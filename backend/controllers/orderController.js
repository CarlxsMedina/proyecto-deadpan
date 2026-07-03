const pool = require('../config/db');

exports.createOrder = async (req, res) => {
    try {
        const { totalPrice, details } = req.body;
        const userId = req.user.id; // Viene del token JWT

        // Insertar en la BD
        const query = 'INSERT INTO orders (user_id, total_price, details) VALUES (?, ?, ?)';
        const [result] = await pool.query(query, [userId, totalPrice, JSON.stringify(details)]);

        res.status(201).json({ message: 'Orden creada exitosamente', orderId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creando la orden' });
    }
};
