import { Heart, MessageCircle, Bookmark, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postApi } from "../../api/posts";
import { queryKeys } from "../../api/queryKeys";
import Card from "../ui/Card";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import { useAuthStore } from "../../store/authStore";
import CommentList from "./CommentList";
import { formatTime } from "../../lib/utils";

export default function PostCard({ post }) {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: () => postApi.likePost(post.id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all }),
  });

  const saveMutation = useMutation({
    mutationFn: () => postApi.toggleSavePost(post.id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all }),
  });

  const deleteMutation = useMutation({
    mutationFn: () => postApi.deletePost(post.id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all }),
  });

  const isLiked = post?.likedBy?.some((u) => u?.id === user?.id);
  const canDelete = post?.user?.id === user?.id;

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={post?.user?.fullName} size="sm" />
          <div>
            <Link
              to={`/profile/${post?.user?.id}`}
              className="text-sm font-semibold hover:text-primary"
            >
              {post?.user?.fullName}
            </Link>
            <p className="text-xs text-text-muted">
              {formatTime(post?.createdAt)}
            </p>
          </div>
        </div>
        {canDelete && (
          <button
            onClick={() => deleteMutation.mutate()}
            className="rounded-lg p-2 text-text-muted hover:bg-dark-lighter"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {post?.caption && <p className="text-sm">{post.caption}</p>}
      {post?.image && (
        <img
          src={post.image}
          alt="post"
          className="w-full rounded-xl border border-border"
        />
      )}
      {post?.video && (
        <video
          src={post.video}
          controls
          className="w-full rounded-xl border border-border"
        />
      )}

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => likeMutation.mutate()}>
          <Heart size={16} className={isLiked ? "text-secondary" : ""} />
          <span className="ml-2 text-xs">{post?.likedBy?.length || 0}</span>
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle size={16} />
          <span className="ml-2 text-xs">{post?.comments?.length || 0}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => saveMutation.mutate()}>
          <Bookmark size={16} />
          <span className="ml-2 text-xs">Save</span>
        </Button>
      </div>

      <CommentList post={post} />
    </Card>
  );
}
