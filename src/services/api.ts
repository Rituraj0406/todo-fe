import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');


    const publicRoutes = ['/auth/login', '/auth/signup'];

    if(publicRoutes.some((route) => req.url?.includes(route))) {
        return req;
    }

    if(token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;

