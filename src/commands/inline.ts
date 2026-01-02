import { callApi } from "../api";

export interface InlineQueryResult {
  type: string;
  id: string;
  [key: string]: unknown;
}

export interface AnswerInlineQueryOptions {
  inline_query_id: string;
  results: InlineQueryResult[];
  cache_time?: number;
  is_personal?: boolean;
  next_offset?: string;
  button?: {
    text: string;
    web_app?: { url: string };
    start_parameter?: string;
  };
}

export async function answerInlineQuery(options: AnswerInlineQueryOptions) {
  return callApi<boolean>("answerInlineQuery", options);
}

export interface SentWebAppMessage {
  inline_message_id?: string;
}

export interface AnswerWebAppQueryOptions {
  web_app_query_id: string;
  result: InlineQueryResult;
}

export async function answerWebAppQuery(options: AnswerWebAppQueryOptions) {
  return callApi<SentWebAppMessage>("answerWebAppQuery", options);
}
