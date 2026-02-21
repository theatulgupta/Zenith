import axios from "axios";
import { useAuthStore } from "../store/authStore";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://zenith-server-pc8u.onrender.com/api/v1";

const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const normalizeError = (error) => {
  const status = error?.response?.status || 0;
  const data = error?.response?.data || null;
  const message =
    data?.message ||
    error?.message ||
    "Unexpected error occurred. Please try again.";

  return {
    status,
    message,
    data,
  };
};

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (!config.headers["X-Request-Id"]) {
    config.headers["X-Request-Id"] =
      globalThis.crypto?.randomUUID?.() ||
      `req_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }
    return Promise.reject(normalizeError(err));
  },
);

export const apiError = normalizeError;

export default api;
