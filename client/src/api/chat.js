import api from '../lib/axios';

export const chatApi = {
  createChat: (userId) =>
    api.post(`/chat/create?userId=${userId}`).then((r) => r.data),
  getMyChats: () => api.get('/chat').then((r) => r.data),
};
