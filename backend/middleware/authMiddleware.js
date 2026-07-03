const jwt = require('jsonwebtoken');

const JWT_SECRET = 'supersecret_jwt_key_deadpan';

module.exports = (req, res, next) => {
    // Leer el token del header
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No hay token, autorización denegada' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
        req.user = decoded; // ej. { id: 1 }
        next();
    } catch (error) {
        res.status(401).json({ message: 'El token no es válido' });
    }
};
