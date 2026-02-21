import { NavLink } from "react-router-dom";
import Avatar from "../ui/Avatar";
import { useAuthStore } from "../../store/authStore";

export default function ChatList({ chats = [] }) {
  const me = useAuthStore((s) => s.user);

  return (
    <div className="space-y-2">
      {chats.map((chat) => {
        const partner = chat?.users?.find((u) => u?.id !== me?.id);
        const title = chat?.chatName || partner?.fullName || "Chat";
        return (
          <NavLink
            key={chat.id}
            to={`/chat/${chat.id}`}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl border border-border px-3 py-2 text-sm transition ${
                isActive
                  ? "bg-primary/20 text-primary"
                  : "bg-dark-light text-text hover:bg-dark-lighter"
              }`
            }
          >
            <Avatar name={title} size="sm" />
            <div>
              <p className="font-medium">{title}</p>
              <p className="text-xs text-text-muted">
                {chat?.users?.length || 0} members
              </p>
            </div>
          </NavLink>
        );
      })}
      {!chats.length && (
        <div className="text-sm text-text-muted">No chats found.</div>
      )}
    </div>
  );
}
