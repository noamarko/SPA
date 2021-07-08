import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://52.3.78.233/users'
})

export default api;