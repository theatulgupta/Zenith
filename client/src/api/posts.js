import api from '../lib/axios';

export const postApi = {
  getAllPosts: () => api.get('/posts').then((r) => r.data),
  getPostById: (postId) => api.get(`/posts/${postId}`).then((r) => r.data),
  getMyPosts: () => api.get('/posts/user').then((r) => r.data),
  createPost: (data) => api.post('/posts', data).then((r) => r.data),
  deletePost: (postId) => api.delete(`/posts/${postId}`).then((r) => r.data),
  likePost: (postId) => api.put(`/posts/like/${postId}`).then((r) => r.data),
  toggleSavePost: (postId) => api.put(`/posts/${postId}`).then((r) => r.data),
};
