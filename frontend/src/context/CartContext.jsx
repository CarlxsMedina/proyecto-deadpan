import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    const addToCart = (product) => {
        setCartItems(prev => [...prev, product]);
        
        // Show alert
        setAlertMessage(`¡Se ha añadido al carrito!`);
        setTimeout(() => setAlertMessage(null), 3000); // hide after 3s
    };

    const removeFromCart = (indexToRemove) => {
        setCartItems(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const toggleCart = () => {
        setIsCartOpen(prev => !prev);
    };

    const cartTotal = cartItems.reduce((total, item) => total + item.totalPrice, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
            isCartOpen,
            toggleCart,
            setIsCartOpen,
            cartTotal,
            alertMessage
        }}>
            {children}
        </CartContext.Provider>
    );
};
