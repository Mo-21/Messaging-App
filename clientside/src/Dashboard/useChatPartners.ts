import ClientAPI from "../react-query/services/api-client";
import { useQuery } from "@tanstack/react-query";

export interface ChatPartner {
  id: string;
  username: string;
}

const Client = new ClientAPI<ChatPartner[], ChatPartner[]>("/dashboard");

export const useChatPartners = () => {
  return useQuery<ChatPartner[], Error>({
    queryKey: ["chatPartners"],
    queryFn: Client.getChatPartners,
    staleTime: 1000 * 60 * 5,
  });
};
