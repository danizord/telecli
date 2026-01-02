import { callApi } from "../api";

export interface AnswerCallbackQueryOptions {
  callback_query_id: string;
  text?: string;
  show_alert?: boolean;
  url?: string;
  cache_time?: number;
}

export async function answerCallbackQuery(options: AnswerCallbackQueryOptions) {
  return callApi<boolean>("answerCallbackQuery", options);
}

export interface GetUserChatBoostsOptions {
  chat_id: number | string;
  user_id: number;
}

export async function getUserChatBoosts(options: GetUserChatBoostsOptions) {
  return callApi<{
    boosts: Array<{
      boost_id: string;
      add_date: number;
      expiration_date: number;
      source: unknown;
    }>;
  }>("getUserChatBoosts", options);
}

export async function getBusinessConnection(businessConnectionId: string) {
  return callApi<{
    id: string;
    user: { id: number; is_bot: boolean; first_name: string };
    user_chat_id: number;
    date: number;
    can_reply: boolean;
    is_enabled: boolean;
  }>("getBusinessConnection", { business_connection_id: businessConnectionId });
}
