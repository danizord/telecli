import { callApi, callApiWithFile } from "../api";
import type { Message } from "../types";

export interface SendPhotoOptions {
  chat_id: number | string;
  photo: string; // file_id, URL, or file path
  message_thread_id?: number;
  caption?: string;
  parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
}

export async function sendPhoto(options: SendPhotoOptions) {
  const { photo, ...params } = options;

  // If photo looks like a file path, upload it
  if (photo.startsWith("/") || photo.startsWith("./")) {
    return callApiWithFile<Message>("sendPhoto", params, "photo", photo);
  }

  // Otherwise it's a file_id or URL
  return callApi<Message>("sendPhoto", { ...params, photo });
}

export interface SendVideoOptions {
  chat_id: number | string;
  video: string;
  message_thread_id?: number;
  duration?: number;
  width?: number;
  height?: number;
  caption?: string;
  parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
  supports_streaming?: boolean;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
}

export async function sendVideo(options: SendVideoOptions) {
  const { video, ...params } = options;

  if (video.startsWith("/") || video.startsWith("./")) {
    return callApiWithFile<Message>("sendVideo", params, "video", video);
  }

  return callApi<Message>("sendVideo", { ...params, video });
}

export interface SendAudioOptions {
  chat_id: number | string;
  audio: string;
  message_thread_id?: number;
  caption?: string;
  parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
  duration?: number;
  performer?: string;
  title?: string;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
}

export async function sendAudio(options: SendAudioOptions) {
  const { audio, ...params } = options;

  if (audio.startsWith("/") || audio.startsWith("./")) {
    return callApiWithFile<Message>("sendAudio", params, "audio", audio);
  }

  return callApi<Message>("sendAudio", { ...params, audio });
}

export interface SendDocumentOptions {
  chat_id: number | string;
  document: string;
  message_thread_id?: number;
  caption?: string;
  parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
}

export async function sendDocument(options: SendDocumentOptions) {
  const { document, ...params } = options;

  if (document.startsWith("/") || document.startsWith("./")) {
    return callApiWithFile<Message>("sendDocument", params, "document", document);
  }

  return callApi<Message>("sendDocument", { ...params, document });
}

export interface SendVoiceOptions {
  chat_id: number | string;
  voice: string;
  message_thread_id?: number;
  caption?: string;
  parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
  duration?: number;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
}

export async function sendVoice(options: SendVoiceOptions) {
  const { voice, ...params } = options;

  if (voice.startsWith("/") || voice.startsWith("./")) {
    return callApiWithFile<Message>("sendVoice", params, "voice", voice);
  }

  return callApi<Message>("sendVoice", { ...params, voice });
}

export interface SendStickerOptions {
  chat_id: number | string;
  sticker: string;
  message_thread_id?: number;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
}

export async function sendSticker(options: SendStickerOptions) {
  const { sticker, ...params } = options;

  if (sticker.startsWith("/") || sticker.startsWith("./")) {
    return callApiWithFile<Message>("sendSticker", params, "sticker", sticker);
  }

  return callApi<Message>("sendSticker", { ...params, sticker });
}

export interface SendAnimationOptions {
  chat_id: number | string;
  animation: string;
  message_thread_id?: number;
  duration?: number;
  width?: number;
  height?: number;
  caption?: string;
  parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
  has_spoiler?: boolean;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
}

export async function sendAnimation(options: SendAnimationOptions) {
  const { animation, ...params } = options;

  if (animation.startsWith("/") || animation.startsWith("./")) {
    return callApiWithFile<Message>("sendAnimation", params, "animation", animation);
  }

  return callApi<Message>("sendAnimation", { ...params, animation });
}

export interface SendVideoNoteOptions {
  chat_id: number | string;
  video_note: string;
  message_thread_id?: number;
  duration?: number;
  length?: number;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
}

export async function sendVideoNote(options: SendVideoNoteOptions) {
  const { video_note, ...params } = options;

  if (video_note.startsWith("/") || video_note.startsWith("./")) {
    return callApiWithFile<Message>("sendVideoNote", params, "video_note", video_note);
  }

  return callApi<Message>("sendVideoNote", { ...params, video_note });
}

export interface InputMediaPhoto {
  type: "photo";
  media: string;
  caption?: string;
  parse_mode?: string;
  has_spoiler?: boolean;
}

export interface InputMediaVideo {
  type: "video";
  media: string;
  caption?: string;
  parse_mode?: string;
  width?: number;
  height?: number;
  duration?: number;
  supports_streaming?: boolean;
  has_spoiler?: boolean;
}

export interface InputMediaAudio {
  type: "audio";
  media: string;
  caption?: string;
  parse_mode?: string;
  duration?: number;
  performer?: string;
  title?: string;
}

export interface InputMediaDocument {
  type: "document";
  media: string;
  caption?: string;
  parse_mode?: string;
  disable_content_type_detection?: boolean;
}

export type InputMedia = InputMediaPhoto | InputMediaVideo | InputMediaAudio | InputMediaDocument;

export interface SendMediaGroupOptions {
  chat_id: number | string;
  media: InputMedia[];
  message_thread_id?: number;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
}

export async function sendMediaGroup(options: SendMediaGroupOptions) {
  return callApi<Message[]>("sendMediaGroup", options);
}
