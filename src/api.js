import axios from 'axios';

const api = axios.create({
    baseURL: 'https://darkslategray-mongoose-800641.hostingersite.com/api',
    withCredentials: true, // Include credentials (cookies) with requests
});

api.interceptors.response.use(
    response => response,
    error => {
        console.error(`Axios interceptor error - Status: ${error.response.status}, Message: ${error.response.data.message}`);
        return Promise.reject(error);
    }
);

export default api;