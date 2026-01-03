import { callApi } from "../api";

export async function getForumTopicIconStickers() {
  return callApi<
    Array<{ file_id: string; file_unique_id: string; type: string; width: number; height: number }>
  >("getForumTopicIconStickers");
}

export interface CreateForumTopicOptions {
  chat_id: number | string;
  name: string;
  icon_color?: number;
  icon_custom_emoji_id?: string;
}

export async function createForumTopic(options: CreateForumTopicOptions) {
  return callApi<{
    message_thread_id: number;
    name: string;
    icon_color: number;
    icon_custom_emoji_id?: string;
  }>("createForumTopic", options);
}

export interface EditForumTopicOptions {
  chat_id: number | string;
  message_thread_id: number;
  name?: string;
  icon_custom_emoji_id?: string;
}

export async function editForumTopic(options: EditForumTopicOptions) {
  return callApi<boolean>("editForumTopic", options);
}

export interface CloseForumTopicOptions {
  chat_id: number | string;
  message_thread_id: number;
}

export async function closeForumTopic(options: CloseForumTopicOptions) {
  return callApi<boolean>("closeForumTopic", options);
}

export interface ReopenForumTopicOptions {
  chat_id: number | string;
  message_thread_id: number;
}

export async function reopenForumTopic(options: ReopenForumTopicOptions) {
  return callApi<boolean>("reopenForumTopic", options);
}

export interface DeleteForumTopicOptions {
  chat_id: number | string;
  message_thread_id: number;
}

export async function deleteForumTopic(options: DeleteForumTopicOptions) {
  return callApi<boolean>("deleteForumTopic", options);
}

export interface UnpinAllForumTopicMessagesOptions {
  chat_id: number | string;
  message_thread_id: number;
}

export async function unpinAllForumTopicMessages(options: UnpinAllForumTopicMessagesOptions) {
  return callApi<boolean>("unpinAllForumTopicMessages", options);
}

export interface EditGeneralForumTopicOptions {
  chat_id: number | string;
  name: string;
}

export async function editGeneralForumTopic(options: EditGeneralForumTopicOptions) {
  return callApi<boolean>("editGeneralForumTopic", options);
}

export async function closeGeneralForumTopic(chatId: number | string) {
  return callApi<boolean>("closeGeneralForumTopic", { chat_id: chatId });
}

export async function reopenGeneralForumTopic(chatId: number | string) {
  return callApi<boolean>("reopenGeneralForumTopic", { chat_id: chatId });
}

export async function hideGeneralForumTopic(chatId: number | string) {
  return callApi<boolean>("hideGeneralForumTopic", { chat_id: chatId });
}

export async function unhideGeneralForumTopic(chatId: number | string) {
  return callApi<boolean>("unhideGeneralForumTopic", { chat_id: chatId });
}

export async function unpinAllGeneralForumTopicMessages(chatId: number | string) {
  return callApi<boolean>("unpinAllGeneralForumTopicMessages", { chat_id: chatId });
}
