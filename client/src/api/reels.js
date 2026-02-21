import api from '../lib/axios';

export const reelApi = {
  getAllReels: () => api.get('/reel/all').then((r) => r.data),
  getMyReels: () => api.get('/reel').then((r) => r.data),
  createReel: (data) => api.post('/reel/create', data).then((r) => r.data),
};
