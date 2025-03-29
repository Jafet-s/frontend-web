// src/components/Login.js
import React, { useState } from 'react';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
    } else {
      setError('Invalid username or password');
    }
  };

  // Estilos en objeto (puedes moverlos a un archivo CSS aparte si lo prefieres)
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    card: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '10px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
    },
    title: {
      color: '#333',
      marginBottom: '1.5rem',
      fontSize: '2rem',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      margin: '10px 0',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '1rem',
      boxSizing: 'border-box',
      transition: 'border 0.3s',
    },
    inputFocus: {
      outline: 'none',
      borderColor: '#667eea',
    },
    button: {
      width: '100%',
      padding: '12px',
      margin: '15px 0',
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#5a67d8',
    },
    error: {
      color: '#e53e3e',
      marginTop: '10px',
      fontSize: '0.9rem',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Bienvenido</h2>
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
          onBlur={(e) => e.target.style = styles.input}
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
          onBlur={(e) => e.target.style = styles.input}
        />
        
        <button
          onClick={handleLogin}
          style={styles.button}
          onMouseEnter={(e) => e.target.style = {...styles.button, ...styles.buttonHover}}
          onMouseLeave={(e) => e.target.style = styles.button}
        >
          Login
        </button>
        
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;