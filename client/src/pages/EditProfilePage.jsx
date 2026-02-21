import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userApi } from "../api/users";
import { queryKeys } from "../api/queryKeys";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const { data: me } = useQuery({
    queryKey: queryKeys.users.profile(),
    queryFn: userApi.getProfile,
  });

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const updateMutation = useMutation({
    mutationFn: () =>
      userApi.updateUser({
        fullName: fullName || me?.fullName || "",
        email: email || me?.email || "",
        gender: gender || me?.gender || "",
      }),
    onSuccess: async () => {
      const updated = await userApi.getProfile();
      setUser(updated);
      toast.success("Profile updated");
      navigate("/profile/me");
    },
  });

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Edit profile</h1>
        <p className="text-sm text-text-muted">Update your details.</p>
      </div>
      <div className="space-y-4 rounded-2xl border border-border bg-dark-light p-6">
        <Input
          label="Full name"
          value={fullName || me?.fullName || ""}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          label="Email"
          value={email || me?.email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Gender"
          value={gender || me?.gender || ""}
          onChange={(e) => setGender(e.target.value)}
        />
        <Button
          onClick={() => updateMutation.mutate()}
          disabled={updateMutation.isPending}
          className="w-full"
        >
          {updateMutation.isPending ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
