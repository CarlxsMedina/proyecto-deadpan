import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { Search, User, Heart, ShoppingBag } from 'lucide-react';

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
            <Link to="/" className="nav-brand">
                DEADPAM<span className="nav-brand-dot">.</span>
            </Link>
            <div className="nav-links">
                <Link to="/catalog">Shop</Link>
                <Link to="#">Historia</Link>
                <Link to="#">Filosofía</Link>
                <Link to="#">Proceso</Link>
                <Link to="/contact">Contacto</Link>
            </div>
            <div className="nav-icons">
                <button aria-label="Buscar"><Search size={20} strokeWidth={2} /></button>
                {user ? (
                    <button onClick={handleLogout} aria-label="Cerrar sesión" title={user.username}>
                        <User size={20} strokeWidth={2} />
                    </button>
                ) : (
                    <Link to="/login" aria-label="Iniciar Sesión">
                        <User size={20} strokeWidth={2} />
                    </Link>
                )}
                <button aria-label="Favoritos"><Heart size={20} strokeWidth={2} /></button>
                <button onClick={toggleCart} aria-label="Carrito" style={{ position: 'relative' }}>
                    <ShoppingBag size={20} strokeWidth={2} />
                    {cartItems.length > 0 && (
                        <span style={{ 
                            position: 'absolute', top: '-8px', right: '-8px', 
                            background: '#cc0000', color: 'white', 
                            fontSize: '0.7rem', padding: '2px 6px', 
                            borderRadius: '50%', fontWeight: 'bold' 
                        }}>
                            {cartItems.length}
                        </span>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

