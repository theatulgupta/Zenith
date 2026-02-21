import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "../api/chat";
import { queryKeys } from "../api/queryKeys";
import ChatList from "../components/chat/ChatList";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function ChatPage() {
  const [userId, setUserId] = useState("");
  const queryClient = useQueryClient();

  const { data: chats = [] } = useQuery({
    queryKey: queryKeys.chats.all,
    queryFn: chatApi.getMyChats,
  });

  const createChat = useMutation({
    mutationFn: () => chatApi.createChat(Number(userId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chats.all });
      setUserId("");
    },
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-semibold">Chats</h1>
          <p className="text-sm text-text-muted">Create or open a chat.</p>
        </div>
        <div className="rounded-2xl border border-border bg-dark-light p-4 space-y-3">
          <Input
            label="Start chat with user id"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Button
            size="sm"
            onClick={() => createChat.mutate()}
            disabled={!userId || createChat.isPending}
          >
            Create chat
          </Button>
        </div>
        <ChatList chats={chats} />
      </div>

      <div className="hidden lg:flex items-center justify-center rounded-2xl border border-dashed border-border bg-dark-light p-6 text-sm text-text-muted">
        Select a chat to view messages.
      </div>
    </div>
  );
}
