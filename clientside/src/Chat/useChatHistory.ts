import { useQuery } from "@tanstack/react-query";
import ClientAPI from "../react-query/services/api-client";

export interface Message {
  id: string;
  content: string;
  author: string;
  recipient: string;
  date: string;
}

export const useChatHistory = (userId: string) => {
  return useQuery<Message[], Error>({
    queryKey: ["chatHistory", userId],
    queryFn: new ClientAPI<Message[], Message[]>(`/chat/${userId}`)
      .getChatHistory,
  });
};