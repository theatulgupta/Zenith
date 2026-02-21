import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { messageApi } from "../api/messages";
import { queryKeys } from "../api/queryKeys";
import MessageList from "../components/chat/MessageList";
import MessageComposer from "../components/chat/MessageComposer";
import Card from "../components/ui/Card";

export default function ChatConversation() {
  const { chatId } = useParams();
  const queryClient = useQueryClient();

  const {
    data: messages = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: queryKeys.messages.byChat(chatId),
    queryFn: () => messageApi.getMessages(chatId),
  });

  const sendMessage = useMutation({
    mutationFn: (payload) => messageApi.sendMessage(chatId, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.messages.byChat(chatId),
      }),
  });

  return (
    <Card className="flex h-[70vh] flex-col gap-4">
      <div className="border-b border-border pb-2">
        <h2 className="text-lg font-semibold">Chat #{chatId}</h2>
      </div>

      {isLoading ? (
        <div className="h-full rounded-2xl skeleton" />
      ) : isError ? (
        <div className="text-sm text-text-muted">Unable to load messages.</div>
      ) : (
        <MessageList messages={messages} />
      )}

      <MessageComposer
        onSend={(payload) => sendMessage.mutate(payload)}
        isSending={sendMessage.isPending}
      />
    </Card>
  );
}
