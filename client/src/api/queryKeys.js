export const queryKeys = {
  users: {
    all: ["users"],
    profile: () => ["users", "profile"],
    detail: (id) => ["users", id],
    search: (query) => ["users", "search", query || ""],
  },
  posts: {
    all: ["posts"],
    detail: (id) => ["posts", id],
    mine: ["posts", "me"],
  },
  reels: {
    all: ["reels"],
  },
  stories: {
    mine: ["stories", "me"],
    byUser: (id) => ["stories", "user", id],
  },
  chats: {
    all: ["chats"],
  },
  messages: {
    byChat: (chatId) => ["messages", chatId],
  },
};
