import React, { useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const DraggableDesign = ({ design, getSizeStyles, onDragStop }) => {
    const [position, setPosition] = useState(design.position || { x: 0, y: 0 });
    const positionRef = useRef(position);
    positionRef.current = position;
    const isDragging = useRef(false);
    const startPos = useRef({ x: 0, y: 0 });

    const handlePointerDown = (e) => {
        if (e.button !== 0 && e.type === 'mousedown') return;
        isDragging.current = true;
        
        const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        
        startPos.current = {
            x: clientX - positionRef.current.x,
            y: clientY - positionRef.current.y
        };

        const handlePointerMove = (moveEvent) => {
            if (!isDragging.current) return;
            if (moveEvent.cancelable) moveEvent.preventDefault();
            
            const moveX = moveEvent.type.includes('mouse') ? moveEvent.clientX : moveEvent.touches[0].clientX;
            const moveY = moveEvent.type.includes('mouse') ? moveEvent.clientY : moveEvent.touches[0].clientY;
            
            setPosition({
                x: moveX - startPos.current.x,
                y: moveY - startPos.current.y
            });
        };

        const handlePointerUp = () => {
            if (!isDragging.current) return;
            isDragging.current = false;
            
            document.removeEventListener('mousemove', handlePointerMove);
            document.removeEventListener('mouseup', handlePointerUp);
            document.removeEventListener('touchmove', handlePointerMove);
            document.removeEventListener('touchend', handlePointerUp);
            
            onDragStop(design.id, positionRef.current);
        };

        document.addEventListener('mousemove', handlePointerMove);
        document.addEventListener('mouseup', handlePointerUp);
        document.addEventListener('touchmove', handlePointerMove, { passive: false });
        document.addEventListener('touchend', handlePointerUp);
        
        if (e.type === 'mousedown') e.preventDefault();
    };

    return (
        <div 
            className="design-overlay" 
            style={{ 
                ...getSizeStyles(design.size), 
                top: '20%', 
                left: '30%', 
                transform: `translate(${position.x}px, ${position.y}px)`,
                pointerEvents: 'auto'
            }}
            onMouseDown={handlePointerDown}
            onTouchStart={handlePointerDown}
        >
            <img src={design.url} alt="Diseño" draggable="false" style={{ width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }} />
        </div>
    );
};

const Product = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Estado del personalizador
    const [side, setSide] = useState('front'); // 'front' o 'back'
    const [shirtColor, setShirtColor] = useState('white'); // 'black', 'white', 'gray'
    const [designs, setDesigns] = useState({ front: [], back: [] });
    const [basePrice] = useState(12.00);
    const [totalPrice, setTotalPrice] = useState(12.00);
    const [priceAlert, setPriceAlert] = useState('');
    
    const fileInputRef = useRef(null);

    // Calcular precio
    const calculatePrice = (currentDesigns) => {
        let newPrice = basePrice;
        let alertMsg = '';
        
        const allDesigns = [...currentDesigns.front, ...currentDesigns.back];
        const numDesigns = allDesigns.length;

        if (numDesigns > 1) {
            newPrice += (numDesigns - 1) * 3;
            alertMsg = 'El precio subió por agregar múltiples diseños.';
        }

        const hasLargeDesign = allDesigns.some(d => d.size === 'large');
        if (hasLargeDesign) {
            newPrice += 2;
            alertMsg = alertMsg ? alertMsg + ' Y por incluir diseños grandes.' : 'El precio subió por elegir un tamaño grande.';
        }

        if (currentDesigns.front.length > 0 && currentDesigns.back.length > 0) {
            newPrice += 4;
            alertMsg = 'El precio subió por imprimir en ambos lados. ' + alertMsg;
        }

        setTotalPrice(newPrice);
        setPriceAlert(alertMsg);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'image/png') {
            const reader = new FileReader();
            reader.onload = (event) => {
                const newDesign = {
                    id: Date.now(),
                    url: event.target.result,
                    size: 'medium',
                    position: { x: 0, y: 0 }
                };
                
                const updatedDesigns = {
                    ...designs,
                    [side]: [...designs[side], newDesign]
                };
                
                setDesigns(updatedDesigns);
                calculatePrice(updatedDesigns);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Por favor sube un archivo PNG.');
        }
    };

    const handleSizeChange = (designId, newSize) => {
        const updatedSideDesigns = designs[side].map(d => 
            d.id === designId ? { ...d, size: newSize } : d
        );
        const updatedDesigns = { ...designs, [side]: updatedSideDesigns };
        setDesigns(updatedDesigns);
        calculatePrice(updatedDesigns);
    };

    const handleDeleteDesign = (designId) => {
        const updatedSideDesigns = designs[side].filter(d => d.id !== designId);
        const updatedDesigns = { ...designs, [side]: updatedSideDesigns };
        setDesigns(updatedDesigns);
        calculatePrice(updatedDesigns);
    };

    const handleDragStop = (designId, newPosition) => {
        const updatedSideDesigns = designs[side].map(d => 
            d.id === designId ? { ...d, position: newPosition } : d
        );
        const updatedDesigns = { ...designs, [side]: updatedSideDesigns };
        setDesigns(updatedDesigns);
    };

    const handleSave = () => {
        if (!user) {
            alert('Debes iniciar sesión para comprar.');
            navigate('/login');
            return;
        }
        
        if (designs.front.length === 0 && designs.back.length === 0) {
            alert('Por favor añade al menos un diseño.');
            return;
        }

        alert(`¡Orden guardada! Camisa: ${shirtColor}. Total a pagar: $${totalPrice.toFixed(2)}`);
        navigate('/catalog');
    };

    const getSizeStyles = (size) => {
        switch(size) {
            case 'small': return { width: '80px', height: '80px' };
            case 'large': return { width: '200px', height: '200px' };
            case 'medium': 
            default: return { width: '130px', height: '130px' };
        }
    };

    const getShirtImage = () => {
        return side === 'front' ? `/${shirtColor}_shirt.png` : `/${shirtColor}_shirt_back.png`;
    };

    return (
        <div className="container animate-fade-in">
            <h1 style={{ marginBottom: '1rem' }}>Personalizar Camiseta</h1>
            
            <div className="customizer-grid">
                <div className="shirt-preview">
                    <div style={{
                        width: '100%', maxWidth: '400px', height: '500px',
                        borderRadius: '1rem',
                        position: 'relative', overflow: 'hidden', margin: '0 auto'
                    }}>
                        <img src={getShirtImage()} alt={`Camiseta ${shirtColor} ${side}`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, pointerEvents: 'none' }} />
                        
                        <span style={{ position: 'absolute', top: 10, left: 10, color: '#333', background: 'rgba(255,255,255,0.8)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', userSelect: 'none', fontWeight: 'bold', zIndex: 20 }}>
                            {side === 'front' ? 'VISTA FRENTE' : 'VISTA DORSO'}
                        </span>
                        
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                            {designs[side].map(design => (
                                <DraggableDesign 
                                    key={design.id} 
                                    design={design} 
                                    getSizeStyles={getSizeStyles} 
                                    onDragStop={handleDragStop}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="controls-panel">
                    <div className="glass-panel">
                        <div className="price-tag">${totalPrice.toFixed(2)}</div>
                        {priceAlert && (
                            <div className="alert">
                                <span>⚠️</span> {priceAlert}
                            </div>
                        )}
                        
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ marginBottom: '0.5rem' }}>Color de Camiseta</h3>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className={shirtColor === 'white' ? 'btn-primary' : 'btn-secondary'} onClick={() => setShirtColor('white')}>Blanco</button>
                                <button className={shirtColor === 'black' ? 'btn-primary' : 'btn-secondary'} onClick={() => setShirtColor('black')}>Negro</button>
                                <button className={shirtColor === 'gray' ? 'btn-primary' : 'btn-secondary'} onClick={() => setShirtColor('gray')}>Gris</button>
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Vista</h3>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button className={side === 'front' ? 'btn-primary' : 'btn-secondary'} onClick={() => setSide('front')}>Frente</button>
                                <button className={side === 'back' ? 'btn-primary' : 'btn-secondary'} onClick={() => setSide('back')}>Dorso</button>
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Añadir Diseño (PNG)</h3>
                            <input type="file" accept=".png" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileUpload} />
                            <button className="btn-secondary" style={{ width: '100%' }} onClick={() => fileInputRef.current.click()}>
                                Subir Imagen
                            </button>
                        </div>

                        {designs[side].length > 0 && (
                            <div style={{ marginBottom: '2rem', padding: '1rem', background: 'var(--bg-dark)', borderRadius: '8px' }}>
                                <h4 style={{ marginBottom: '1rem' }}>Diseños ({side})</h4>
                                {designs[side].map(d => (
                                    <div key={d.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <select 
                                            value={d.size} 
                                            onChange={(e) => handleSizeChange(d.id, e.target.value)}
                                            style={{ background: 'transparent', color: 'white', border: '1px solid var(--glass-border)', padding: '0.2rem' }}
                                        >
                                            <option value="small">Pequeño</option>
                                            <option value="medium">Mediano</option>
                                            <option value="large">Grande</option>
                                        </select>
                                        <button onClick={() => handleDeleteDesign(d.id)} style={{ color: 'var(--danger)', background: 'transparent' }}>X Eliminar</button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                            <button className="btn-primary" style={{ flex: 2 }} onClick={handleSave}>
                                {user ? 'Guardar y Comprar' : 'Inicia Sesión'}
                            </button>
                            <button className="btn-secondary" style={{ flex: 1 }} onClick={() => navigate('/catalog')}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
