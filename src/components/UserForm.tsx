import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button,
  Box
} from '@mui/material';
import { userService } from '../services/api';
import { User, UserCreate, UserUpdate } from '../types';

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  onUserAdded?: (user: User) => void;
  onUserUpdated?: (user: User) => void;
  initialData?: User | null;
}

export default function UserForm({ 
  open, 
  onClose, 
  onUserAdded, 
  onUserUpdated,
  initialData 
}: UserFormProps) {
  const [formData, setFormData] = useState<UserCreate>({ 
    email: '', 
    full_name: '', 
    password: '' 
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        email: initialData.email,
        full_name: initialData.full_name,
        password: '' // Password vacío para edición
      });
    } else {
      setFormData({ email: '', full_name: '', password: '' });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.full_name) newErrors.full_name = 'Full name is required';
    if (!initialData && !formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      if (initialData && initialData.id) {
        // Para actualización
        const updateData: UserUpdate = {
          email: formData.email,
          full_name: formData.full_name,
          ...(formData.password && { password: formData.password }) // Solo envía password si no está vacío
        };
        const updatedUser = await userService.update(initialData.id, updateData);
        onUserUpdated?.(updatedUser.data);
      } else {
        // Para creación
        const newUser = await userService.create(formData);
        onUserAdded?.(newUser.data);
      }
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
      setErrors({
        ...errors,
        form: 'Error saving user. Please try again.'
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? 'Edit User' : 'Add New User'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            error={!!errors.full_name}
            helperText={errors.full_name}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password || (initialData ? 'Leave blank to keep current password' : '')}
          />
        </Box>
        {errors.form && (
          <Box color="error.main" sx={{ mt: 1 }}>
            {errors.form}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={!formData.email || !formData.full_name || (!initialData && !formData.password)}
        >
          {initialData ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}