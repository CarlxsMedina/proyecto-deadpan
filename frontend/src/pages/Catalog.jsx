import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const res = await fetch(`${API_URL}/products`);
                if (!res.ok) throw new Error('Error al cargar productos');
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="container animate-fade-in">
            <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Nuestro Catálogo</h1>
            
            {loading && <p style={{ textAlign: 'center' }}>Cargando productos...</p>}
            {error && <p style={{ textAlign: 'center', color: '#ff6b6b' }}>{error}</p>}
            {!loading && !error && products.length === 0 && <p style={{ textAlign: 'center' }}>No hay productos disponibles por el momento.</p>}

            <div className="catalog-grid">
                {products.map(product => (
                    <div key={product.id} className="glass-panel catalog-item" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                        <div style={{ background: 'var(--bg-card)', height: '200px', borderRadius: '8px', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                            <img src="/white_shirt.png" alt="Camiseta" style={{ height: '100%', objectFit: 'contain' }} />
                        </div>
                        <h3>{product.name}</h3>
                        <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0', flexGrow: 1 }}>{product.description}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>${Number(product.base_price).toFixed(2)}</span>
                            <Link to={`/product/${product.id}`} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Personalizar</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Catalog;
