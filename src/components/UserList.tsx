// src/components/UserList.tsx
import { useState, useEffect } from 'react';
import { userService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Button, IconButton,
  Dialog, DialogActions, DialogTitle
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddUserModal from './UserForm';
import EditUserModal from './UserForm'; // Puede ser el mismo componente con diferente nombre

interface User {
  id: number;
  email: string;
  full_name: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAll();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async () => {
    if (selectedUserId) {
      try {
        await userService.delete(selectedUserId);
        setUsers(users.filter(user => user.id !== selectedUserId));
        setOpenDeleteDialog(false);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <TableContainer component={Paper}>
      <Button 
        variant="contained" 
        onClick={() => setOpenAddModal(true)}
        sx={{ mb: 2 }}
      >
        Add User
      </Button>
      <Button 
        variant="outlined" 
        onClick={logout}
        sx={{ mb: 2, ml: 2 }}
      >
        Logout
      </Button>
      
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.full_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <IconButton 
                  color="primary"
                  onClick={() => {
                    setSelectedUser(user);
                    setOpenEditModal(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  color="error"
                  onClick={() => {
                    setSelectedUserId(user.id);
                    setOpenDeleteDialog(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>¿Estás seguro que deseas eliminar este usuario?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
          <Button onClick={handleDelete} color="error">Borrar</Button>
        </DialogActions>
      </Dialog>

      {/* Add User Modal */}
      <AddUserModal 
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onUserAdded={(newUser: User) => setUsers(prev => [...prev, newUser])}
      />

      {/* Edit User Modal */}
      <AddUserModal 
        open={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          setSelectedUser(null);
        }}
        initialData={selectedUser}
        onUserUpdated={(updatedUser: User) => {
          setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        }}
      />
    </TableContainer>
  );
}