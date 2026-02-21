import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { postApi } from "../api/posts";
import { queryKeys } from "../api/queryKeys";
import PostCard from "../components/posts/PostCard";
import EmptyState from "../components/ui/EmptyState";

export default function PostDetailPage() {
  const { postId } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: queryKeys.posts.detail(postId),
    queryFn: () => postApi.getPostById(postId),
  });

  if (isLoading) return <div className="h-32 rounded-2xl skeleton" />;

  if (!post) {
    return (
      <EmptyState
        title="Post not found"
        description="The post you're looking for doesn't exist."
      />
    );
  }

  return (
    <div className="max-w-2xl space-y-4">
      <PostCard post={post} />
    </div>
  );
}
