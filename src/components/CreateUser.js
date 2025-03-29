// src/components/CreateUser.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = ({ onUserCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCreateUser = async () => {
    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      await axios.post('http://your-api-url/users', { 
        name, 
        email,
        role 
      });
      setSuccess(true);
      setName('');
      setEmail('');
      setRole('user');
      if (onUserCreated) onUserCreated(); // Callback para actualizar lista
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating user');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Estilos (consistentes con los componentes anteriores)
  const styles = {
    container: {
      maxWidth: '500px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    header: {
      color: '#2d3748',
      fontSize: '1.8rem',
      marginBottom: '1.5rem',
      textAlign: 'center',
      position: 'relative',
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
    select: {
      width: '100%',
      padding: '12px 15px',
      margin: '10px 0',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '1rem',
      backgroundColor: 'white',
      cursor: 'pointer',
    },
    button: {
      width: '100%',
      padding: '12px',
      margin: '20px 0 10px',
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
    buttonDisabled: {
      backgroundColor: '#a0aec0',
      cursor: 'not-allowed',
    },
    error: {
      color: '#e53e3e',
      marginTop: '10px',
      fontSize: '0.9rem',
    },
    success: {
      color: '#38a169',
      marginTop: '10px',
      fontSize: '0.9rem',
    },
    label: {
      display: 'block',
      margin: '15px 0 5px',
      color: '#4a5568',
      fontWeight: '500',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Create New User</h2>
      
      <label style={styles.label}>Full Name</label>
      <input
        type="text"
        placeholder="Enter user's full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
        onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
        onBlur={(e) => e.target.style = styles.input}
      />
      
      <label style={styles.label}>Email</label>
      <input
        type="email"
        placeholder="Enter user's email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
        onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
        onBlur={(e) => e.target.style = styles.input}
      />
      
      <label style={styles.label}>Role</label>
      <select 
        value={role} 
        onChange={(e) => setRole(e.target.value)}
        style={styles.select}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
      </select>
      
      <button
        onClick={handleCreateUser}
        disabled={isSubmitting}
        style={{
          ...styles.button,
          ...(isSubmitting ? styles.buttonDisabled : {}),
        }}
        onMouseEnter={(e) => !isSubmitting && (e.target.style = {...styles.button, ...styles.buttonHover})}
        onMouseLeave={(e) => !isSubmitting && (e.target.style = styles.button)}
      >
        {isSubmitting ? 'Creating...' : 'Create User'}
      </button>
      
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>User created successfully!</p>}
    </div>
  );
};

export default CreateUser;