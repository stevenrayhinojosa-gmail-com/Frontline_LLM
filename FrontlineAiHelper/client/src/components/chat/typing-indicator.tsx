import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <Avatar className="bg-primary">
        <Bot className="w-5 h-5" />
      </Avatar>
      <Card className="p-3 bg-white w-16">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-primary/30 animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-primary/30 animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-primary/30 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </Card>
    </div>
  );
}
