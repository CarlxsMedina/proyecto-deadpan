import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulación de login/registro ya que el backend podría no estar corriendo
        // En producción se haría un fetch a /api/auth/login o /api/auth/register
        
        const fakeUser = { id: 1, username: isLogin ? 'UsuarioDemo' : username, email };
        const fakeToken = 'eyJh...fake...token';
        
        login(fakeToken, fakeUser);
        navigate('/catalog');
    };

    return (
        <div className="container animate-fade-in" style={{ maxWidth: '500px', marginTop: '5rem' }}>
            <div className="glass-panel">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </h2>
                
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
