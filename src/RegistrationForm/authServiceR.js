import api from "../api";
import axios from "axios";

// Ensure CSRF token is set before making requests
export const fetchCSRFToken = async () => {
  try {
    await axios.get('https://darkslategray-mongoose-800641.hostingersite.com/sanctum/csrf-cookie', { withCredentials: true });
    console.log('CSRF token set');
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
  }
};

// Registration function
export const register = async (userData) => {
  try {
    // Ensure CSRF token is set
    await fetchCSRFToken();  

    // Send registration request
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Log the error response from the server
      console.error('Registration failed with error:', error.response.data);
      alert(`Registration failed: ${JSON.stringify(error.response.data)}`);
      throw error.response.data;
    } else {
      console.error('Registration failed:', error);
      alert('Registration failed: ' + error.message);
      throw error;
    }
  }
};

