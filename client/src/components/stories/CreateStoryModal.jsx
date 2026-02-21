import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { storyApi } from "../../api/stories";
import { queryKeys } from "../../api/queryKeys";

export default function CreateStoryModal({ open, onClose }) {
  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => storyApi.createStory({ caption, media }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.stories.mine });
      setCaption("");
      setMedia("");
      onClose();
    },
  });

  return (
    <Modal open={open} onClose={onClose} title="Share a story">
      <div className="space-y-4">
        <Input
          label="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Input
          label="Media URL"
          value={media}
          onChange={(e) => setMedia(e.target.value)}
        />
        <Button
          onClick={() => mutate()}
          disabled={isPending}
          className="w-full"
        >
          {isPending ? "Sharing..." : "Share Story"}
        </Button>
      </div>
    </Modal>
  );
}
