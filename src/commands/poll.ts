import { callApi } from "../api";
import type { Message } from "../types";

export interface SendPollOptions {
  chat_id: number | string;
  question: string;
  options: Array<{ text: string; text_parse_mode?: string }>;
  message_thread_id?: number;
  question_parse_mode?: string;
  is_anonymous?: boolean;
  type?: "regular" | "quiz";
  allows_multiple_answers?: boolean;
  correct_option_id?: number;
  explanation?: string;
  explanation_parse_mode?: string;
  open_period?: number;
  close_date?: number;
  is_closed?: boolean;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
}

export async function sendPoll(options: SendPollOptions) {
  return callApi<Message>("sendPoll", options);
}

export interface StopPollOptions {
  chat_id: number | string;
  message_id: number;
}

export async function stopPoll(options: StopPollOptions) {
  return callApi<{
    id: string;
    question: string;
    options: Array<{ text: string; voter_count: number }>;
    total_voter_count: number;
    is_closed: boolean;
    is_anonymous: boolean;
    type: string;
    allows_multiple_answers: boolean;
  }>("stopPoll", options);
}
