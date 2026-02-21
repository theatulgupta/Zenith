import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { authApi } from "../../api/auth";
import { useAuthStore } from "../../store/authStore";
import { userApi } from "../../api/users";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: () => authApi.login({ email, password }),
    onSuccess: async (data) => {
      setAuth(data.token, null);
      const me = await userApi.getProfile();
      setAuth(data.token, me);
      toast.success("Welcome back");
      navigate("/");
    },
    onError: () => toast.error("Invalid credentials"),
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Welcome back</h2>
        <p className="text-sm text-text-muted">Login to continue.</p>
      </div>
      <div className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={() => loginMutation.mutate()}
          disabled={loginMutation.isPending}
          className="w-full"
        >
          {loginMutation.isPending ? "Signing in..." : "Sign in"}
        </Button>
      </div>
      <p className="text-sm text-text-muted">
        New here?{" "}
        <Link to="/register" className="text-primary">
          Create an account
        </Link>
      </p>
    </div>
  );
}
