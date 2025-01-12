import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Ensure this matches your Laravel API URL
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Include cookies in requests for session-based authentication
});

// Request interceptor to add Authorization header if token-based auth is used
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken'); // Adjust this as needed for your token storage method
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor for improved error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Log detailed error info
      console.error(`Axios interceptor error - Status: ${error.response.status}, Message: ${error.response.data.message || error.message}`);
    } else {
      console.error('Axios interceptor error:', error.message);
    }
    return Promise.reject(error);
  }
);

// // Add CSRF token interceptor
// axios.interceptors.request.use(
//   config => {
//     const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
//     config.headers['X-CSRF-TOKEN'] = token;
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );


export default api;
