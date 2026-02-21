import api from '../lib/axios';

export const commentApi = {
  addComment: (postId, data) =>
    api.post(`/comment/post/${postId}`, data).then((r) => r.data),
  likeComment: (commentId) =>
    api.put(`/comment/like/${commentId}`).then((r) => r.data),
  updateComment: (commentId, data) =>
    api.put(`/comment/update/${commentId}`, data).then((r) => r.data),
};
