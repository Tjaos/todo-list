import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 10000, // Tempo limite em milissegundos
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;