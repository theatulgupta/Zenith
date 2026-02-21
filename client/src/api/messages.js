import api from '../lib/axios';

export const messageApi = {
  sendMessage: (chatId, data) =>
    api.post(`/message/chat/${chatId}`, data).then((r) => r.data),
  getMessages: (chatId) =>
    api.get(`/message/chat/${chatId}`).then((r) => r.data),
};
