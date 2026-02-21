import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import CreatePostModal from "../components/posts/CreatePostModal";
import { useAuthStore } from "../store/authStore";
import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/users";
import { queryKeys } from "../api/queryKeys";

export default function AppLayout() {
  const [openCreate, setOpenCreate] = useState(false);
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  useQuery({
    queryKey: queryKeys.users.profile(),
    queryFn: userApi.getProfile,
    onSuccess: (data) => setUser(data),
  });

  return (
    <div className="min-h-screen bg-dark text-text">
      <Topbar
        onCreatePost={() => setOpenCreate(true)}
        onSearch={(query) => query && navigate(`/explore?query=${query}`)}
      />
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-6">
        <Sidebar onCreatePost={() => setOpenCreate(true)} />
        <main className="flex-1">
          <Outlet />
        </main>
        <aside className="hidden xl:block w-72">
          <div className="rounded-2xl border border-border bg-surface p-4 text-sm text-text-muted">
            Tips: Share stories, create reels, and connect with your friends.
          </div>
        </aside>
      </div>
      <CreatePostModal open={openCreate} onClose={() => setOpenCreate(false)} />
    </div>
  );
}
