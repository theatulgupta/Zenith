import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function MessageComposer({ onSend, isSending }) {
  const [message, setMessage] = useState("");
  const [media, setMedia] = useState("");

  const handleSend = () => {
    if (!message && !media) return;
    onSend({ message, media });
    setMessage("");
    setMedia("");
  };

  return (
    <div className="border-t border-border pt-3">
      <div className="flex flex-col gap-2">
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Input
          placeholder="Media URL (optional)"
          value={media}
          onChange={(e) => setMedia(e.target.value)}
        />
        <Button onClick={handleSend} disabled={isSending} className="self-end">
          {isSending ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
}
