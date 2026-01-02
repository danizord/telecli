import { callApi } from "../api";
import type { Message } from "../types";

export interface SendMessageOptions {
  chat_id: number | string;
  text: string;
  message_thread_id?: number;
  parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
  disable_web_page_preview?: boolean;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
}

export async function sendMessage(options: SendMessageOptions) {
  return callApi<Message>("sendMessage", options);
}

export interface ForwardMessageOptions {
  chat_id: number | string;
  from_chat_id: number | string;
  message_id: number;
  message_thread_id?: number;
  disable_notification?: boolean;
  protect_content?: boolean;
}

export async function forwardMessage(options: ForwardMessageOptions) {
  return callApi<Message>("forwardMessage", options);
}

export interface EditMessageTextOptions {
  chat_id?: number | string;
  message_id?: number;
  inline_message_id?: string;
  text: string;
  parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
  disable_web_page_preview?: boolean;
}

export async function editMessageText(options: EditMessageTextOptions) {
  return callApi<Message | boolean>("editMessageText", options);
}

export interface DeleteMessageOptions {
  chat_id: number | string;
  message_id: number;
}

export async function deleteMessage(options: DeleteMessageOptions) {
  return callApi<boolean>("deleteMessage", options);
}

export interface CopyMessageOptions {
  chat_id: number | string;
  from_chat_id: number | string;
  message_id: number;
  message_thread_id?: number;
  caption?: string;
  parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
}

export async function copyMessage(options: CopyMessageOptions) {
  return callApi<{ message_id: number }>("copyMessage", options);
}

// Batch operations
export interface ForwardMessagesOptions {
  chat_id: number | string;
  from_chat_id: number | string;
  message_ids: number[];
  message_thread_id?: number;
  disable_notification?: boolean;
  protect_content?: boolean;
}

export async function forwardMessages(options: ForwardMessagesOptions) {
  return callApi<{ message_id: number }[]>("forwardMessages", options);
}

export interface CopyMessagesOptions {
  chat_id: number | string;
  from_chat_id: number | string;
  message_ids: number[];
  message_thread_id?: number;
  disable_notification?: boolean;
  protect_content?: boolean;
  remove_caption?: boolean;
}

export async function copyMessages(options: CopyMessagesOptions) {
  return callApi<{ message_id: number }[]>("copyMessages", options);
}

export interface DeleteMessagesOptions {
  chat_id: number | string;
  message_ids: number[];
}

export async function deleteMessages(options: DeleteMessagesOptions) {
  return callApi<boolean>("deleteMessages", options);
}

// More edit methods
export interface EditMessageCaptionOptions {
  chat_id?: number | string;
  message_id?: number;
  inline_message_id?: string;
  caption?: string;
  parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
  show_caption_above_media?: boolean;
}

export async function editMessageCaption(options: EditMessageCaptionOptions) {
  return callApi<Message | boolean>("editMessageCaption", options);
}

export interface InputMedia {
  type: "photo" | "video" | "animation" | "audio" | "document";
  media: string;
  caption?: string;
  parse_mode?: string;
  has_spoiler?: boolean;
}

export interface EditMessageMediaOptions {
  chat_id?: number | string;
  message_id?: number;
  inline_message_id?: string;
  media: InputMedia;
}

export async function editMessageMedia(options: EditMessageMediaOptions) {
  return callApi<Message | boolean>("editMessageMedia", options);
}

export interface InlineKeyboardButton {
  text: string;
  url?: string;
  callback_data?: string;
  web_app?: { url: string };
  login_url?: { url: string; forward_text?: string; bot_username?: string; request_write_access?: boolean };
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  switch_inline_query_chosen_chat?: { query?: string; allow_user_chats?: boolean; allow_bot_chats?: boolean; allow_group_chats?: boolean; allow_channel_chats?: boolean };
  callback_game?: Record<string, never>;
  pay?: boolean;
}

export interface InlineKeyboardMarkup {
  inline_keyboard: InlineKeyboardButton[][];
}

export interface EditMessageReplyMarkupOptions {
  chat_id?: number | string;
  message_id?: number;
  inline_message_id?: string;
  reply_markup?: InlineKeyboardMarkup;
}

export async function editMessageReplyMarkup(options: EditMessageReplyMarkupOptions) {
  return callApi<Message | boolean>("editMessageReplyMarkup", options);
}
