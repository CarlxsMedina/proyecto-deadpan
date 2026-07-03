import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API_URL from '../utils/api';

const CartDrawer = () => {
    const { isCartOpen, toggleCart, cartItems, removeFromCart, cartTotal, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);

    const handleCheckout = async () => {
        if (!user) {
            alert('Debes iniciar sesión para procesar tu orden.');
            toggleCart();
            navigate('/login');
            return;
        }

        setIsSaving(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    totalPrice: cartTotal,
                    details: { items: cartItems } // Guarda todo el carrito
                })
            });

            if (!res.ok) throw new Error('Error al procesar la orden');
            
            alert(`¡Compra procesada con éxito! Total pagado: $${cartTotal.toFixed(2)}`);
            clearCart();
            toggleCart();
        } catch (error) {
            console.error(error);
            alert('Hubo un error al procesar tu orden.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            {/* Overlay oscuro cuando está abierto */}
            {isCartOpen && (
                <div 
                    style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 999 }} 
                    onClick={toggleCart} 
                />
            )}

            {/* Panel lateral */}
            <div style={{
                position: 'fixed',
                top: 0,
                right: isCartOpen ? 0 : '-400px',
                width: '400px',
                maxWidth: '100vw',
                height: '100vh',
                background: 'var(--bg-card)',
                boxShadow: '-5px 0 15px rgba(0,0,0,0.3)',
                transition: 'right 0.3s ease',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2>Tu Carrito</h2>
                    <button onClick={toggleCart} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {cartItems.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)' }}>El carrito está vacío.</p>
                    ) : (
                        cartItems.map((item, index) => (
                            <div key={index} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
                                <img src={`/${item.shirtColor}_shirt.png`} alt="shirt" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: 0, fontSize: '1rem' }}>Camiseta {item.shirtColor}</h4>
                                    <p style={{ margin: '0.2rem 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Diseños: {item.designs.front.length + item.designs.back.length}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>${item.totalPrice.toFixed(2)}</span>
                                        <button onClick={() => removeFromCart(index)} style={{ background: 'transparent', color: 'var(--danger)', fontSize: '0.8rem', padding: '0.2rem' }}>Quitar</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        <span>Total:</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <button 
                        className="btn-primary" 
                        style={{ width: '100%' }} 
                        disabled={cartItems.length === 0 || isSaving}
                        onClick={handleCheckout}
                    >
                        {isSaving ? 'Procesando...' : 'Proceder al Pago'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default CartDrawer;
