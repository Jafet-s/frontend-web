// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa correctamente `Routes` y `Route`
import Login from './components/Login';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div>
        {/* Usa un contenedor (fragmento o div) para envolver los elementos */}
        {!isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/users" element={<UserList />} />
            <Route path="/create-user" element={<CreateUser />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
