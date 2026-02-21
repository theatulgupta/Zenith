import { useMutation, useQueryClient } from "@tanstack/react-query";
import Avatar from "../ui/Avatar";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { useAuthStore } from "../../store/authStore";
import { userApi } from "../../api/users";
import { queryKeys } from "../../api/queryKeys";

export default function UserCard({ user }) {
  const me = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  const isFollowing = me?.followings?.includes(user.id);

  const toggleFollow = useMutation({
    mutationFn: () => userApi.toggleFollow(user.id, !isFollowing),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.users.profile() }),
  });

  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-dark-light px-4 py-3">
      <div className="flex items-center gap-3">
        <Avatar name={user.fullName} size="sm" />
        <div>
          <Link
            to={`/profile/${user.id}`}
            className="text-sm font-semibold hover:text-primary"
          >
            {user.fullName}
          </Link>
          <p className="text-xs text-text-muted">{user.email}</p>
        </div>
      </div>
      {me?.id !== user.id && (
        <Button
          size="sm"
          variant={isFollowing ? "outline" : "primary"}
          onClick={() => toggleFollow.mutate()}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </div>
  );
}
