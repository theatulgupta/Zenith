import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { reelApi } from "../../api/reels";
import { queryKeys } from "../../api/queryKeys";

export default function CreateReelModal({ open, onClose }) {
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => reelApi.createReel({ title, video }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reels.all });
      setTitle("");
      setVideo("");
      onClose();
    },
  });

  return (
    <Modal open={open} onClose={onClose} title="Create reel">
      <div className="space-y-4">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          label="Video URL"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
        />
        <Button
          onClick={() => mutate()}
          disabled={isPending}
          className="w-full"
        >
          {isPending ? "Publishing..." : "Publish Reel"}
        </Button>
      </div>
    </Modal>
  );
}
