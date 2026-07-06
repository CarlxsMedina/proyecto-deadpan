import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Infinity as InfinityIcon } from 'lucide-react';

const Home = () => {
    return (
        <div style={{ backgroundColor: '#000000', minHeight: '100vh', width: '100%' }}>
            <section className="hero animate-fade-in">
                {/* Overlay oscuro si usamos una imagen de fondo real */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.2)', zIndex: 1 }}></div>
                
                <div className="hero-content">
                    <h1 className="hero-huge-text">
                        <span className="hero-vestimos">VESTIMOS</span>
                        <span className="hero-identidades">IDENTIDADES.</span>
                    </h1>
                    
                    <p>
                        Camisetas premium con estampado DTF. Ediciones limitadas para 
                        quienes entienden que lo que llevas puesto también habla.
                    </p>
                    
                    <div className="hero-buttons">
                        <Link to="/catalog" className="btn-hero-primary">
                            EXPLORAR COLECCIÓN <ArrowRight size={18} />
                        </Link>
                        <Link to="#" className="btn-hero-secondary">
                            NUESTRA HISTORIA
                        </Link>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <h3>04</h3>
                            <p>Drops al año</p>
                        </div>
                        <div className="stat-item">
                            <h3>12K+</h3>
                            <p>Comunidad global</p>
                        </div>
                        <div className="stat-item">
                            <h3>100%</h3>
                            <p>Algodón premium</p>
                        </div>
                        <div className="stat-item">
                            <h3><InfinityIcon size={36} strokeWidth={3} /></h3>
                            <p>Diseños únicos</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

