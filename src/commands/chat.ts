import { callApi } from "../api";
import type { Chat, ChatMember } from "../types";

export async function getChat(chatId: number | string) {
  return callApi<Chat>("getChat", { chat_id: chatId });
}

export async function getChatAdministrators(chatId: number | string) {
  return callApi<ChatMember[]>("getChatAdministrators", { chat_id: chatId });
}

export async function getChatMemberCount(chatId: number | string) {
  return callApi<number>("getChatMemberCount", { chat_id: chatId });
}

export async function getChatMember(chatId: number | string, userId: number) {
  return callApi<ChatMember>("getChatMember", {
    chat_id: chatId,
    user_id: userId,
  });
}

export async function leaveChat(chatId: number | string) {
  return callApi<boolean>("leaveChat", { chat_id: chatId });
}

export interface SetChatTitleOptions {
  chat_id: number | string;
  title: string;
}

export async function setChatTitle(options: SetChatTitleOptions) {
  return callApi<boolean>("setChatTitle", options);
}

export interface SetChatDescriptionOptions {
  chat_id: number | string;
  description?: string;
}

export async function setChatDescription(options: SetChatDescriptionOptions) {
  return callApi<boolean>("setChatDescription", options);
}

export interface BanChatMemberOptions {
  chat_id: number | string;
  user_id: number;
  until_date?: number;
  revoke_messages?: boolean;
}

export async function banChatMember(options: BanChatMemberOptions) {
  return callApi<boolean>("banChatMember", options);
}

export interface UnbanChatMemberOptions {
  chat_id: number | string;
  user_id: number;
  only_if_banned?: boolean;
}

export async function unbanChatMember(options: UnbanChatMemberOptions) {
  return callApi<boolean>("unbanChatMember", options);
}

export interface ChatPermissions {
  can_send_messages?: boolean;
  can_send_audios?: boolean;
  can_send_documents?: boolean;
  can_send_photos?: boolean;
  can_send_videos?: boolean;
  can_send_video_notes?: boolean;
  can_send_voice_notes?: boolean;
  can_send_polls?: boolean;
  can_send_other_messages?: boolean;
  can_add_web_page_previews?: boolean;
  can_change_info?: boolean;
  can_invite_users?: boolean;
  can_pin_messages?: boolean;
  can_manage_topics?: boolean;
}

export interface RestrictChatMemberOptions {
  chat_id: number | string;
  user_id: number;
  permissions: ChatPermissions;
  use_independent_chat_permissions?: boolean;
  until_date?: number;
}

export async function restrictChatMember(options: RestrictChatMemberOptions) {
  return callApi<boolean>("restrictChatMember", options);
}

export interface PromoteChatMemberOptions {
  chat_id: number | string;
  user_id: number;
  is_anonymous?: boolean;
  can_manage_chat?: boolean;
  can_delete_messages?: boolean;
  can_manage_video_chats?: boolean;
  can_restrict_members?: boolean;
  can_promote_members?: boolean;
  can_change_info?: boolean;
  can_invite_users?: boolean;
  can_post_messages?: boolean;
  can_edit_messages?: boolean;
  can_pin_messages?: boolean;
  can_post_stories?: boolean;
  can_edit_stories?: boolean;
  can_delete_stories?: boolean;
  can_manage_topics?: boolean;
}

export async function promoteChatMember(options: PromoteChatMemberOptions) {
  return callApi<boolean>("promoteChatMember", options);
}

export interface SetChatAdministratorCustomTitleOptions {
  chat_id: number | string;
  user_id: number;
  custom_title: string;
}

export async function setChatAdministratorCustomTitle(
  options: SetChatAdministratorCustomTitleOptions,
) {
  return callApi<boolean>("setChatAdministratorCustomTitle", options);
}

export interface BanChatSenderChatOptions {
  chat_id: number | string;
  sender_chat_id: number;
}

export async function banChatSenderChat(options: BanChatSenderChatOptions) {
  return callApi<boolean>("banChatSenderChat", options);
}

export interface UnbanChatSenderChatOptions {
  chat_id: number | string;
  sender_chat_id: number;
}

export async function unbanChatSenderChat(options: UnbanChatSenderChatOptions) {
  return callApi<boolean>("unbanChatSenderChat", options);
}

export interface SetChatPermissionsOptions {
  chat_id: number | string;
  permissions: ChatPermissions;
  use_independent_chat_permissions?: boolean;
}

export async function setChatPermissions(options: SetChatPermissionsOptions) {
  return callApi<boolean>("setChatPermissions", options);
}

export async function setChatPhoto(chatId: number | string, photoPath: string) {
  // This requires file upload - implemented separately
  const { callApiWithFile } = await import("../api");
  return callApiWithFile<boolean>("setChatPhoto", { chat_id: chatId }, "photo", photoPath);
}

export async function deleteChatPhoto(chatId: number | string) {
  return callApi<boolean>("deleteChatPhoto", { chat_id: chatId });
}

export async function setChatStickerSet(chatId: number | string, stickerSetName: string) {
  return callApi<boolean>("setChatStickerSet", {
    chat_id: chatId,
    sticker_set_name: stickerSetName,
  });
}

export async function deleteChatStickerSet(chatId: number | string) {
  return callApi<boolean>("deleteChatStickerSet", { chat_id: chatId });
}
