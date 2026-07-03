import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems, toggleCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="nav-brand">ProyectoDeadpan</Link>
            <div className="nav-links">
                <Link to="/">Inicio</Link>
                <Link to="/catalog">Catálogo</Link>
                <Link to="/contact">Contáctanos</Link>
                {user ? (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span style={{ color: 'var(--primary)' }}>{user.username}</span>
                        <button className="btn-secondary" onClick={handleLogout}>Salir</button>
                    </div>
                ) : (
                    <Link to="/login" className="btn-primary">Iniciar Sesión</Link>
                )}
                <button 
                    onClick={toggleCart} 
                    style={{ 
                        background: 'transparent', 
                        border: '1px solid var(--primary)', 
                        color: 'white', 
                        padding: '0.5rem 1rem', 
                        borderRadius: '20px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    🛒 Carrito 
                    {cartItems.length > 0 && (
                        <span style={{ background: 'var(--primary)', color: 'black', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                            {cartItems.length}
                        </span>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
