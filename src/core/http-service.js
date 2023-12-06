import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const httpService = axios.create({
  baseURL: BASE_URL,
});

export const httpInterseptedService = axios.create({
  baseURL: BASE_URL,
});

httpInterseptedService.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        Authorization: `Bearer  ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpInterseptedService.interceptors.response.use(
  (response) => response,
 async (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
