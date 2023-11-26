import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Message } from "./useChatHistory";
import ClientAPI from "../react-query/services/api-client";
import { useParams } from "react-router-dom";

interface MessageSent {
  content: string;
}

interface AddMessageContext {
  previousMessages: Message[];
}

function useAddMessage(onAdd: () => void) {
  const queryClient = useQueryClient();
  const userId = useParams<{ id: string }>();

  const Client = new ClientAPI<MessageSent, Message>(`/chat/${userId.id}/send`);

  return useMutation<Message, Error, MessageSent, AddMessageContext>({
    mutationFn: Client.sendMessage,
    onSuccess: (sentMessage) => {
      //Updating the data in cache directly
      const previousMessages = queryClient.setQueryData<Message[]>(
        ["chatHistory"],
        (oldMessages) => [...(oldMessages || []), sentMessage]
      );
      onAdd();
      return previousMessages;
    },
  });
}

export default useAddMessage;
