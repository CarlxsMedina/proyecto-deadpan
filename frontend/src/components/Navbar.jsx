import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
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
            </div>
        </nav>
    );
};

export default Navbar;
