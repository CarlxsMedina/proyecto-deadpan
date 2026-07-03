import React from 'react';

const Contact = () => {
    return (
        <div className="container animate-fade-in" style={{ maxWidth: '600px' }}>
            <div className="glass-panel">
                <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Contáctanos</h1>
                <form>
                    <div className="input-group">
                        <label>Nombre</label>
                        <input type="text" placeholder="Tu nombre" />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" placeholder="tu@email.com" />
                    </div>
                    <div className="input-group">
                        <label>Mensaje</label>
                        <textarea 
                            rows="5" 
                            style={{ 
                                width: '100%', 
                                padding: '1rem', 
                                background: 'rgba(0,0,0,0.2)', 
                                border: '1px solid var(--glass-border)', 
                                borderRadius: '8px', 
                                color: 'white',
                                resize: 'vertical'
                            }} 
                            placeholder="¿En qué podemos ayudarte?"
                        ></textarea>
                    </div>
                    <button type="button" className="btn-primary" style={{ width: '100%' }}>Enviar Mensaje</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
