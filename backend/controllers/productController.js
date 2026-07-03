const pool = require('../config/db');

exports.getProducts = async (req, res) => {
    try {
        const [products] = await pool.query('SELECT * FROM products');
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error obteniendo productos' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const [products] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (products.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(products[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error obteniendo producto' });
    }
};
