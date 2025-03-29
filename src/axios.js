import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://your-api-url', // Cambia esto a la URL de tu API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
