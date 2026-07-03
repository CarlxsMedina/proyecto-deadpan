import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const endpoint = isLogin ? '/auth/login' : '/auth/register';
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        
        try {
            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, username: isLogin ? undefined : username })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Error en la autenticación');
            }
            
            // Login exitoso, guardamos el token
            login(data.token, data.user);
            navigate('/catalog');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container animate-fade-in" style={{ maxWidth: '500px', marginTop: '5rem' }}>
            <div className="glass-panel">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </h2>
                
                {error && <div style={{ color: '#ff6b6b', background: 'rgba(255, 107, 107, 0.1)', padding: '0.8rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="input-group">
                            <label>Nombre de Usuario</label>
                            <input 
                                type="text" 
                                required 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                        </div>
                    )}
                    <div className="input-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            required 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="input-group">
                        <label>Contraseña</label>
                        <input 
                            type="password" 
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    
                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        {isLogin ? 'Ingresar' : 'Registrarse'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <button 
                        className="btn-secondary" 
                        style={{ border: 'none', padding: '0.5rem' }}
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
