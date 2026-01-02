import { callApi } from "../api";
import type { Message } from "../types";

export interface SendContactOptions {
  chat_id: number | string;
  phone_number: string;
  first_name: string;
  message_thread_id?: number;
  last_name?: string;
  vcard?: string;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
}

export async function sendContact(options: SendContactOptions) {
  return callApi<Message>("sendContact", options);
}

export interface SendDiceOptions {
  chat_id: number | string;
  message_thread_id?: number;
  emoji?: "🎲" | "🎯" | "🏀" | "⚽" | "🎳" | "🎰";
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
}

export async function sendDice(options: SendDiceOptions) {
  return callApi<Message>("sendDice", options);
}

export type ChatAction =
  | "typing"
  | "upload_photo"
  | "record_video"
  | "upload_video"
  | "record_voice"
  | "upload_voice"
  | "upload_document"
  | "choose_sticker"
  | "find_location"
  | "record_video_note"
  | "upload_video_note";

export interface SendChatActionOptions {
  chat_id: number | string;
  action: ChatAction;
  message_thread_id?: number;
}

export async function sendChatAction(options: SendChatActionOptions) {
  return callApi<boolean>("sendChatAction", options);
}
