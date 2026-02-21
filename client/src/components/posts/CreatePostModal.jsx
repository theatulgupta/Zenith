import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { postApi } from "../../api/posts";
import { queryKeys } from "../../api/queryKeys";

export default function CreatePostModal({ open, onClose }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => postApi.createPost({ caption, image, video }),
    onSuccess: () => {
      toast.success("Post created");
      setCaption("");
      setImage("");
      setVideo("");
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all });
      onClose();
    },
    onError: () => toast.error("Failed to create post"),
  });

  return (
    <Modal open={open} onClose={onClose} title="Create new post">
      <div className="space-y-4">
        <Input
          label="Caption"
          placeholder="Share your thoughts..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Input
          label="Image URL"
          placeholder="https://..."
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Input
          label="Video URL"
          placeholder="https://..."
          value={video}
          onChange={(e) => setVideo(e.target.value)}
        />
        <Button
          onClick={() => mutate()}
          disabled={isPending}
          className="w-full"
        >
          {isPending ? "Posting..." : "Create Post"}
        </Button>
      </div>
    </Modal>
  );
}
