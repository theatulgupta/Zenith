import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { commentApi } from "../../api/comments";
import { queryKeys } from "../../api/queryKeys";
import { formatTime } from "../../lib/utils";

export default function CommentList({ post }) {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const addComment = useMutation({
    mutationFn: () => commentApi.addComment(post.id, { content }),
    onSuccess: () => {
      setContent("");
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all });
    },
  });

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {post?.comments?.map((comment) => (
          <div
            key={comment.id}
            className="rounded-xl bg-dark-light p-3 text-sm"
          >
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>{comment?.user?.fullName || "User"}</span>
              <span>{formatTime(comment?.createdAt)}</span>
            </div>
            <p className="mt-2 text-sm">{comment?.content}</p>
            <div className="mt-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                  commentApi.likeComment(comment.id).then(() =>
                    queryClient.invalidateQueries({
                      queryKey: queryKeys.posts.all,
                    }),
                  )
                }
              >
                ❤️ {comment?.likes?.length || 0}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1"
        />
        <Button
          size="sm"
          onClick={() => addComment.mutate()}
          disabled={!content || addComment.isPending}
        >
          Post
        </Button>
      </div>
    </div>
  );
}
