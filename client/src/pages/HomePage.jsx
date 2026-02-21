import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { postApi } from "../api/posts";
import { queryKeys } from "../api/queryKeys";
import PostCard from "../components/posts/PostCard";
import StoryBar from "../components/stories/StoryBar";
import CreateStoryModal from "../components/stories/CreateStoryModal";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

export default function HomePage() {
  const [openStory, setOpenStory] = useState(false);
  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: queryKeys.posts.all,
    queryFn: postApi.getAllPosts,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Home</h1>
        <Button variant="outline" size="sm" onClick={() => setOpenStory(true)}>
          Share Story
        </Button>
      </div>

      <StoryBar />

      {isLoading && (
        <div className="space-y-4">
          <div className="h-32 rounded-2xl skeleton" />
          <div className="h-32 rounded-2xl skeleton" />
        </div>
      )}

      {!isLoading && (isError || posts.length === 0) && (
        <EmptyState
          title="No posts yet"
          description="Start by creating your first post."
        />
      )}

      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <CreateStoryModal open={openStory} onClose={() => setOpenStory(false)} />
    </div>
  );
}
