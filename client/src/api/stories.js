import api from '../lib/axios';

export const storyApi = {
  createStory: (data) => api.post('/story/create', data).then((r) => r.data),
  getMyStories: () => api.get('/story/user').then((r) => r.data),
  getStoriesByUserId: (userId) =>
    api.get(`/story/user/${userId}`).then((r) => r.data),
};
