import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/users";
import { postApi } from "../api/posts";
import { queryKeys } from "../api/queryKeys";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import PostCard from "../components/posts/PostCard";
import EmptyState from "../components/ui/EmptyState";
import { useAuthStore } from "../store/authStore";

export default function ProfilePage() {
  const { userId } = useParams();
  const me = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  const isMe = userId === "me" || Number(userId) === me?.id;

  const { data: user, isLoading } = useQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: () => (isMe ? userApi.getProfile() : userApi.getUserById(userId)),
  });

  const { data: posts = [] } = useQuery({
    queryKey: queryKeys.posts.mine,
    queryFn: postApi.getMyPosts,
    enabled: isMe,
  });

  const isFollowing = me?.followings?.includes(user?.id);

  const toggleFollow = useMutation({
    mutationFn: () => userApi.toggleFollow(user.id, !isFollowing),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.users.profile() }),
  });

  if (isLoading) {
    return <div className="h-32 rounded-2xl skeleton" />;
  }

  if (!user) {
    return (
      <EmptyState
        title="User not found"
        description="The profile you're looking for doesn't exist."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-dark-light p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={user.fullName} size="xl" />
          <div>
            <h1 className="text-xl font-semibold">{user.fullName}</h1>
            <p className="text-sm text-text-muted">{user.email}</p>
            <div className="mt-2 flex gap-4 text-sm text-text-muted">
              <span>{user.followers?.length || 0} followers</span>
              <span>{user.followings?.length || 0} following</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          {isMe ? (
            <Link to="/profile/edit">
              <Button variant="outline">Edit Profile</Button>
            </Link>
          ) : (
            <Button onClick={() => toggleFollow.mutate()}>
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
      </div>

      {isMe && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">My posts</h2>
          {posts.length === 0 && (
            <EmptyState
              title="No posts yet"
              description="Create your first post from the Home page."
            />
          )}
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
