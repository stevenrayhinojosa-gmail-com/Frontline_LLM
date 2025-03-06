import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import Message from "@/components/chat/message";
import MessageInput from "@/components/chat/message-input";
import TypingIndicator from "@/components/chat/typing-indicator";
import { useChat } from "@/hooks/use-chat";

export default function Chat() {
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <div className="container mx-auto px-4 py-6 h-[calc(100vh-4rem)]">
      <Card className="flex flex-col h-full">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <MessageInput onSend={sendMessage} isLoading={isLoading} />
        </div>
      </Card>
    </div>
  );
}
