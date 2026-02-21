import api from '../lib/axios';

export const authApi = {
  login: (data) => api.post('/auth/login', data).then((r) => r.data),
  signup: (data) => api.post('/auth/signup', data).then((r) => r.data),
};
