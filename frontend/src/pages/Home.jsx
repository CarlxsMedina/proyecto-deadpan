import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container animate-fade-in">
            <section className="hero">
                <h1>Expresa tu estilo <br/> <span style={{ color: 'var(--primary)' }}>Sin Límites</span></h1>
                <p>Crea camisetas únicas con tus propios diseños. Calidad premium, impresión perfecta. ProyectoDeadpan es tu lienzo.</p>
                <Link to="/catalog" className="btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
                    Empezar a Crear
                </Link>
            </section>

            <section className="glass-panel" style={{ marginTop: '4rem', textAlign: 'center' }}>
                <h2>¿Por qué elegirnos?</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                    <div style={{ maxWidth: '300px' }}>
                        <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Calidad Superior</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Utilizamos algodón 100% y técnicas de impresión de última generación para asegurar que tu diseño dure.</p>
                    </div>
                    <div style={{ maxWidth: '300px' }}>
                        <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Personalización Total</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Sube tu diseño, ajústalo, elige el tamaño y la ubicación exacta. Tu camiseta, tus reglas.</p>
                    </div>
                    <div style={{ maxWidth: '300px' }}>
                        <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Precios Justos</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Camisetas desde $12. Solo pagas extra si necesitas diseños muy grandes o múltiples impresiones.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
