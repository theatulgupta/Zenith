import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { authApi } from "../../api/auth";
import { useAuthStore } from "../../store/authStore";
import { userApi } from "../../api/users";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: () => authApi.signup({ fullName, email, password, gender }),
    onSuccess: async (data) => {
      setAuth(data.token, null);
      const me = await userApi.getProfile();
      setAuth(data.token, me);
      toast.success("Account created");
      navigate("/");
    },
    onError: () => toast.error("Could not sign up"),
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Create account</h2>
        <p className="text-sm text-text-muted">Join the Zenith community.</p>
      </div>
      <div className="space-y-4">
        <Input
          label="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={() => registerMutation.mutate()}
          disabled={registerMutation.isPending}
          className="w-full"
        >
          {registerMutation.isPending ? "Creating..." : "Sign up"}
        </Button>
      </div>
      <p className="text-sm text-text-muted">
        Already have an account?{" "}
        <Link to="/login" className="text-primary">
          Sign in
        </Link>
      </p>
    </div>
  );
}
