import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (
      error.response?.status === 401 &&
      !error.config?.url?.includes('api/auth/')
    ) {
      const role = localStorage.getItem('role');

      localStorage.clear();
      window.location.assign(role === 'PACIENTE' ? '/login' : '/admin/login');
    }

    return Promise.reject(error);
  }
);

export { instance };
