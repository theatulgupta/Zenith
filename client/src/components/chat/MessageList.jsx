import { formatTime } from "../../lib/utils";
import { useAuthStore } from "../../store/authStore";

export default function MessageList({ messages = [] }) {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
      {messages.map((message) => {
        const isMe = message?.user?.id === user?.id;
        return (
          <div
            key={message.id}
            className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
              isMe
                ? "self-end bg-primary text-white"
                : "self-start bg-dark-light text-text"
            }`}
          >
            <p>{message?.message}</p>
            {message?.media && (
              <img
                src={message.media}
                alt="media"
                className="mt-2 max-h-40 rounded-lg"
              />
            )}
            <p className="mt-1 text-[10px] text-white/70">
              {formatTime(message?.timestamp)}
            </p>
          </div>
        );
      })}
      {!messages.length && (
        <div className="text-sm text-text-muted">No messages yet.</div>
      )}
    </div>
  );
}
