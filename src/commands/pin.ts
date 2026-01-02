import { callApi } from "../api";

export interface PinChatMessageOptions {
  chat_id: number | string;
  message_id: number;
  disable_notification?: boolean;
}

export async function pinChatMessage(options: PinChatMessageOptions) {
  return callApi<boolean>("pinChatMessage", options);
}

export interface UnpinChatMessageOptions {
  chat_id: number | string;
  message_id?: number;
}

export async function unpinChatMessage(options: UnpinChatMessageOptions) {
  return callApi<boolean>("unpinChatMessage", options);
}

export async function unpinAllChatMessages(chatId: number | string) {
  return callApi<boolean>("unpinAllChatMessages", { chat_id: chatId });
}
