// src/components/CreateUser.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [name, setName] = useState('');

  const handleCreateUser = async () => {
    try {
      await axios.post('http://your-api-url/users', { name });
      alert('User created');
    } catch (error) {
      alert('Error creating user');
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <input type="text" placeholder="Name" onChange={e => setName(e.target.value)} />
      <button onClick={handleCreateUser}>Create User</button>
    </div>
  );
};

export default CreateUser;
