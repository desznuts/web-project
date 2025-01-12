import axios from 'axios';
import api from "../api"; // Custom axios instance

// Ensure CSRF token is set before making requests
export const fetchCSRFToken = async () => {
  try {
    await axios.get('https://darkslategray-mongoose-800641.hostingersite.com//sanctum/csrf-cookie', { withCredentials: true });
    console.log('CSRF token set');
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
  }
};

// // Login function
// export const login = async (credentials) => {
//   try {
//     // Ensure CSRF token is set
//     await fetchCSRFToken();  

//     // Send login request
//     const response = await api.post('/login', credentials);
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       // Log the error response from the server
//       console.error('Login failed with error:', error.response.data);
//       alert(`Login failed: ${JSON.stringify(error.response.data)}`);
//       throw error.response.data; // Throw the response data to handle it outside
//     } else {
//       console.error('Login failed:', error);
//       alert('Login failed: ' + error.message);
//       throw error; // Throw the error object for generic handling
//     }
//   }
// };

// // Logout function
// export const logout = async () => {
//   try {
//     const response = await api.post('/logout');
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       console.error('Logout failed with error:', error.response.data);
//       alert(`Logout failed: ${JSON.stringify(error.response.data)}`);
//       throw error.response.data;
//     } else {
//       console.error('Logout failed:', error);
//       alert('Logout failed: ' + error.message);
//       throw error;
//     }
//   }
// }