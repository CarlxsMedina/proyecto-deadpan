const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Asumiremos root para pruebas locales
    password: '', // Asumiremos sin contraseña o cambiar según config del usuario
    database: 'proyectodeadpan',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
