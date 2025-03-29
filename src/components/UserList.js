// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://your-api-url/users');
        setUsers(response.data);
      } catch (error) {
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Estilos (puedes moverlos a un archivo CSS aparte)
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '2rem auto',
      padding: '0 1rem',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    header: {
      color: '#2d3748',
      fontSize: '2rem',
      marginBottom: '1.5rem',
      textAlign: 'center',
      position: 'relative',
      paddingBottom: '0.5rem',
    },
    headerUnderline: {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80px',
      height: '4px',
      background: 'linear-gradient(90deg, #667eea, #764ba2)',
      borderRadius: '2px',
    },
    userGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1.5rem',
    },
    userCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '1.5rem',
      transition: 'transform 0.3s, box-shadow 0.3s',
    },
    userCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
    },
    userName: {
      fontSize: '1.25rem',
      color: '#2d3748',
      marginBottom: '0.5rem',
    },
    userDetail: {
      color: '#4a5568',
      margin: '0.25rem 0',
    },
    loading: {
      textAlign: 'center',
      color: '#4a5568',
      fontSize: '1.1rem',
    },
    error: {
      textAlign: 'center',
      color: '#e53e3e',
      fontSize: '1.1rem',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>
        Users List
        <span style={styles.headerUnderline}></span>
      </h2>
      
      {loading ? (
        <p style={styles.loading}>Loading users...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : (
        <div style={styles.userGrid}>
          {users.map(user => (
            <div 
              key={user.id} 
              style={styles.userCard}
              onMouseEnter={(e) => e.target.style = {...styles.userCard, ...styles.userCardHover}}
              onMouseLeave={(e) => e.target.style = styles.userCard}
            >
              <h3 style={styles.userName}>{user.name}</h3>
              <p style={styles.userDetail}>Email: {user.email || 'N/A'}</p>
              <p style={styles.userDetail}>Role: {user.role || 'User'}</p>
              {/* Agrega más campos según tu estructura de datos */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;