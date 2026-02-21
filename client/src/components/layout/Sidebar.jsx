import { NavLink } from "react-router-dom";
import {
  Home,
  Search,
  Film,
  MessageCircle,
  User,
  LogOut,
  PlusSquare,
} from "lucide-react";
import { createElement } from "react";
import { useAuthStore } from "../../store/authStore";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/explore", label: "Explore", icon: Search },
  { to: "/reels", label: "Reels", icon: Film },
  { to: "/chat", label: "Chat", icon: MessageCircle },
  { to: "/profile/me", label: "Profile", icon: User },
];

export default function Sidebar({ onCreatePost }) {
  const logout = useAuthStore((s) => s.logout);

  return (
    <aside className="hidden lg:flex lg:w-64 flex-col gap-4 border-r border-border bg-dark-light p-6">
      <div className="text-2xl font-bold tracking-tight text-white">Zenith</div>
      <button
        onClick={onCreatePost}
        className="mt-2 flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
      >
        <PlusSquare size={16} /> Create Post
      </button>
      <nav className="mt-4 flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                isActive
                  ? "bg-primary/20 text-primary"
                  : "text-text-muted hover:bg-dark-lighter"
              }`
            }
          >
            {createElement(link.icon, { size: 18 })}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto">
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-xl border border-border bg-transparent px-3 py-2 text-sm text-text-muted hover:bg-dark-lighter"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}
