// Telegram Bot API Types

export interface User {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface Chat {
  id: number;
  type: "private" | "group" | "supergroup" | "channel";
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  description?: string;
  invite_link?: string;
}

export interface MessageEntity {
  type: string;
  offset: number;
  length: number;
  url?: string;
  user?: User;
  language?: string;
}

export interface PhotoSize {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  file_size?: number;
}

export interface Document {
  file_id: string;
  file_unique_id: string;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

export interface Audio {
  file_id: string;
  file_unique_id: string;
  duration: number;
  performer?: string;
  title?: string;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

export interface Video {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  duration: number;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

export interface Message {
  message_id: number;
  message_thread_id?: number;
  from?: User;
  sender_chat?: Chat;
  date: number;
  chat: Chat;
  forward_from?: User;
  forward_from_chat?: Chat;
  forward_date?: number;
  reply_to_message?: Message;
  text?: string;
  entities?: MessageEntity[];
  photo?: PhotoSize[];
  document?: Document;
  audio?: Audio;
  video?: Video;
  caption?: string;
  caption_entities?: MessageEntity[];
}

export interface CallbackQuery {
  id: string;
  from: User;
  message?: Message;
  inline_message_id?: string;
  chat_instance: string;
  data?: string;
}

export interface Update {
  update_id: number;
  message?: Message;
  edited_message?: Message;
  channel_post?: Message;
  edited_channel_post?: Message;
  callback_query?: CallbackQuery;
}

export interface File {
  file_id: string;
  file_unique_id: string;
  file_size?: number;
  file_path?: string;
}

export interface ChatMember {
  user: User;
  status: "creator" | "administrator" | "member" | "restricted" | "left" | "kicked";
}

export interface ApiResponse<T> {
  ok: boolean;
  result?: T;
  description?: string;
  error_code?: number;
}

export interface ReactionType {
  type: "emoji" | "custom_emoji";
  emoji?: string;
  custom_emoji_id?: string;
}
