import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Avatar from "../ui/Avatar";
import { useAuthStore } from "../../store/authStore";

export default function Topbar({ onCreatePost, onSearch }) {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-dark/80 px-4 py-3 backdrop-blur lg:px-6">
      <div className="text-lg font-semibold">Zenith</div>
      <div className="hidden md:flex w-full max-w-md items-center gap-2 rounded-xl border border-border bg-dark-light px-3 py-2">
        <Search size={16} className="text-text-muted" />
        <input
          placeholder="Search people..."
          className="w-full bg-transparent text-sm text-text outline-none"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onCreatePost}
          className="flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-white hover:bg-primary-dark"
        >
          <Plus size={14} /> Post
        </button>
        <button
          onClick={() => navigate("/profile/me")}
          className="flex items-center gap-2"
        >
          <Avatar name={user?.fullName} size="sm" />
        </button>
      </div>
    </header>
  );
}
