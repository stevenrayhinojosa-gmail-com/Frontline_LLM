import { useQuery, useMutation } from "@tanstack/react-query";
import { type Message } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function useChat() {
  const { toast } = useToast();
  
  const { data: messages = [], refetch } = useQuery<Message[]>({
    queryKey: ["/api/messages"],
  });

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", { message });
      return response.json();
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
    },
  });

  return {
    messages,
    isLoading,
    sendMessage: mutate,
  };
}
