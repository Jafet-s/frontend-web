import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import UserList from './components/UserList';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/users" /> : <Login />} 
      />
      <Route 
        path="/users" 
        element={isAuthenticated ? <UserList /> : <Navigate to="/" />} 
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;