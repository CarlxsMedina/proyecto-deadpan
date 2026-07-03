import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Catalog = () => {
    const [products, setProducts] = useState([
        // Datos falsos por defecto mientras el backend no está conectado
        { id: 1, name: 'Camiseta Personalizable Básica', description: 'Camiseta de algodón 100%.', base_price: 12.00 },
        { id: 2, name: 'Camiseta Cuello V', description: 'Corte moderno, ideal para diseños elegantes.', base_price: 14.00 },
        { id: 3, name: 'Camiseta Oversize', description: 'Estilo urbano, perfecta para diseños grandes.', base_price: 15.00 }
    ]);

    // En un caso real, aquí iría un fetch al backend:
    // useEffect(() => { fetch('http://localhost:5000/api/products').then(...) }, [])

    return (
        <div className="container animate-fade-in">
            <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Nuestro Catálogo</h1>
            
            <div className="catalog-grid">
                {products.map(product => (
                    <div key={product.id} className="glass-panel catalog-item" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                        <div style={{ background: 'var(--bg-card)', height: '200px', borderRadius: '8px', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                            <img src="/white_shirt.png" alt="Camiseta" style={{ height: '100%', objectFit: 'contain' }} />
                        </div>
                        <h3>{product.name}</h3>
                        <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0', flexGrow: 1 }}>{product.description}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>${product.base_price.toFixed(2)}</span>
                            <Link to={`/product/${product.id}`} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Personalizar</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Catalog;
