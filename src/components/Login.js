// src/components/Login.js
import React, { useState } from 'react';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Para mostrar errores

  const handleLogin = async () => {
    // Aquí debes agregar la lógica de autenticación.
    // Por ahora, vamos a suponer que siempre es exitoso:
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar el error */}
    </div>
  );
};

export default Login;
