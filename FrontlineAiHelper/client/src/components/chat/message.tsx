import { type Message } from "@shared/schema";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface MessageProps {
  message: Message;
}

export default function Message({ message }: MessageProps) {
  const isBot = message.role === "assistant";

  return (
    <div className={`flex gap-3 ${isBot ? "flex-row" : "flex-row-reverse"}`}>
      <Avatar className={isBot ? "bg-primary" : "bg-secondary"}>
        {isBot ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
      </Avatar>
      <div className={`flex flex-col gap-1 ${isBot ? "" : "items-end"}`}>
        <Card className={`p-3 ${isBot ? "bg-white" : "bg-primary text-primary-foreground"}`}>
          <ReactMarkdown className="prose prose-sm max-w-none">
            {message.content}
          </ReactMarkdown>
        </Card>
        <span className="text-xs text-muted-foreground">
          {format(new Date(message.timestamp), "h:mm a")}
        </span>
      </div>
    </div>
  );
}
