import { callApi } from "../api";

export async function exportChatInviteLink(chatId: number | string) {
  return callApi<string>("exportChatInviteLink", { chat_id: chatId });
}

export interface CreateChatInviteLinkOptions {
  chat_id: number | string;
  name?: string;
  expire_date?: number;
  member_limit?: number;
  creates_join_request?: boolean;
}

export async function createChatInviteLink(options: CreateChatInviteLinkOptions) {
  return callApi<{
    invite_link: string;
    name?: string;
    creator: { id: number; is_bot: boolean; first_name: string };
    creates_join_request: boolean;
    is_primary: boolean;
    is_revoked: boolean;
    expire_date?: number;
    member_limit?: number;
    pending_join_request_count?: number;
  }>("createChatInviteLink", options);
}

export interface EditChatInviteLinkOptions {
  chat_id: number | string;
  invite_link: string;
  name?: string;
  expire_date?: number;
  member_limit?: number;
  creates_join_request?: boolean;
}

export async function editChatInviteLink(options: EditChatInviteLinkOptions) {
  return callApi<{
    invite_link: string;
    name?: string;
    creator: { id: number; is_bot: boolean; first_name: string };
    creates_join_request: boolean;
    is_primary: boolean;
    is_revoked: boolean;
    expire_date?: number;
    member_limit?: number;
    pending_join_request_count?: number;
  }>("editChatInviteLink", options);
}

export interface RevokeChatInviteLinkOptions {
  chat_id: number | string;
  invite_link: string;
}

export async function revokeChatInviteLink(options: RevokeChatInviteLinkOptions) {
  return callApi<{
    invite_link: string;
    name?: string;
    creator: { id: number; is_bot: boolean; first_name: string };
    creates_join_request: boolean;
    is_primary: boolean;
    is_revoked: boolean;
    expire_date?: number;
    member_limit?: number;
    pending_join_request_count?: number;
  }>("revokeChatInviteLink", options);
}

export interface ApproveChatJoinRequestOptions {
  chat_id: number | string;
  user_id: number;
}

export async function approveChatJoinRequest(options: ApproveChatJoinRequestOptions) {
  return callApi<boolean>("approveChatJoinRequest", options);
}

export interface DeclineChatJoinRequestOptions {
  chat_id: number | string;
  user_id: number;
}

export async function declineChatJoinRequest(options: DeclineChatJoinRequestOptions) {
  return callApi<boolean>("declineChatJoinRequest", options);
}
