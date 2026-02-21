import { Outlet, Link } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-dark text-text">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-8 px-6 lg:flex-row">
        <div className="max-w-md space-y-4">
          <div className="text-4xl font-bold">Zenith</div>
          <p className="text-text-muted">
            A modern social experience built for stories, reels, and real-time
            chats. Connect, share, and grow.
          </p>
          <div className="flex gap-3 text-sm">
            <Link
              to="/login"
              className="rounded-xl border border-border px-4 py-2 hover:bg-dark-lighter"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-primary px-4 py-2 text-white hover:bg-primary-dark"
            >
              Sign up
            </Link>
          </div>
        </div>
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-xl">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
