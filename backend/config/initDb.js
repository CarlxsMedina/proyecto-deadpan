const pool = require('./db');

const initDb = async () => {
    try {
        console.log("Inicializando base de datos...");
        
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                base_price DECIMAL(10, 2) NOT NULL DEFAULT 12.00,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                total_price DECIMAL(10, 2) NOT NULL,
                details JSON NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        // Insertar productos base si no existen (asumiendo que el nombre es único, si no, se insertarán)
        // Para simplificar, simplemente los insertamos. En un entorno real se manejaría mejor.
        // Haremos un select para ver cuántos hay.
        const [rows] = await pool.query('SELECT COUNT(*) as count FROM products');
        if (rows[0].count < 3) {
            // Borrar existentes para reinsertar limpio
            await pool.query('DELETE FROM products');
            await pool.query(`
                INSERT INTO products (name, description, base_price) VALUES 
                ('Camiseta Personalizable Básica', 'Camiseta de algodón 100%. Selecciona tu color, corte y sube tu diseño.', 12.00),
                ('Camiseta Cuello V', 'Corte moderno con cuello en V, ideal para diseños elegantes.', 14.00),
                ('Camiseta Oversize', 'Estilo urbano holgado, perfecta para diseños grandes y llamativos.', 16.00)
            `);
            console.log("Productos por defecto insertados/actualizados.");
        }

        console.log("Base de datos inicializada correctamente.");
    } catch (error) {
        console.error("Error al inicializar la base de datos:", error);
    }
};

module.exports = initDb;
