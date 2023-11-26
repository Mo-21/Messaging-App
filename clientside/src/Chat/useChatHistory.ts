import { useQuery } from "@tanstack/react-query";
import ClientAPI from "../react-query/services/api-client";

export interface Message {
  id: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
  recipient: {
    _id: string;
    username: string;
  };
  date: string;
}

export const useChatHistory = (userId: string) => {
  return useQuery<Message[], Error>({
    queryKey: ["chatHistory"],
    queryFn: new ClientAPI<Message[], Message[]>(`/chat/${userId}`)
      .getChatHistory,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
