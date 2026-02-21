import api from '../lib/axios';

export const userApi = {
  getProfile: () => api.get('/users/profile').then((r) => r.data),
  getUserById: (id) => api.get(`/users/${id}`).then((r) => r.data),
  getUserByEmail: (email) => api.get(`/users/email/${email}`).then((r) => r.data),
  updateUser: (data) => api.put('/users/update', data).then((r) => r.data),
  toggleFollow: (userId, follow) =>
    api.put(`/users/toggle-follow/${userId}?follow=${follow}`).then((r) => r.data),
  searchUsers: (query) => api.get(`/users/search?query=${query}`).then((r) => r.data),
  getAllUsers: () => api.get('/users').then((r) => r.data),
};
