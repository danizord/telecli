import { callApi } from "../api";
import type { User } from "../types";

// Bot management methods

export async function logOut() {
  return callApi<boolean>("logOut");
}

export async function close() {
  return callApi<boolean>("close");
}

export interface BotCommand {
  command: string;
  description: string;
}

export interface BotCommandScope {
  type: "default" | "all_private_chats" | "all_group_chats" | "all_chat_administrators" | "chat" | "chat_administrators" | "chat_member";
  chat_id?: number | string;
  user_id?: number;
}

export interface SetMyCommandsOptions {
  commands: BotCommand[];
  scope?: BotCommandScope;
  language_code?: string;
}

export async function setMyCommands(options: SetMyCommandsOptions) {
  return callApi<boolean>("setMyCommands", options);
}

export interface DeleteMyCommandsOptions {
  scope?: BotCommandScope;
  language_code?: string;
}

export async function deleteMyCommands(options: DeleteMyCommandsOptions = {}) {
  return callApi<boolean>("deleteMyCommands", options);
}

export interface GetMyCommandsOptions {
  scope?: BotCommandScope;
  language_code?: string;
}

export async function getMyCommands(options: GetMyCommandsOptions = {}) {
  return callApi<BotCommand[]>("getMyCommands", options);
}

export interface SetMyNameOptions {
  name?: string;
  language_code?: string;
}

export async function setMyName(options: SetMyNameOptions = {}) {
  return callApi<boolean>("setMyName", options);
}

export interface GetMyNameOptions {
  language_code?: string;
}

export async function getMyName(options: GetMyNameOptions = {}) {
  return callApi<{ name: string }>("getMyName", options);
}

export interface SetMyDescriptionOptions {
  description?: string;
  language_code?: string;
}

export async function setMyDescription(options: SetMyDescriptionOptions = {}) {
  return callApi<boolean>("setMyDescription", options);
}

export interface GetMyDescriptionOptions {
  language_code?: string;
}

export async function getMyDescription(options: GetMyDescriptionOptions = {}) {
  return callApi<{ description: string }>("getMyDescription", options);
}

export interface SetMyShortDescriptionOptions {
  short_description?: string;
  language_code?: string;
}

export async function setMyShortDescription(options: SetMyShortDescriptionOptions = {}) {
  return callApi<boolean>("setMyShortDescription", options);
}

export interface GetMyShortDescriptionOptions {
  language_code?: string;
}

export async function getMyShortDescription(options: GetMyShortDescriptionOptions = {}) {
  return callApi<{ short_description: string }>("getMyShortDescription", options);
}

export interface MenuButton {
  type: "commands" | "web_app" | "default";
  text?: string;
  web_app?: { url: string };
}

export interface SetChatMenuButtonOptions {
  chat_id?: number | string;
  menu_button?: MenuButton;
}

export async function setChatMenuButton(options: SetChatMenuButtonOptions = {}) {
  return callApi<boolean>("setChatMenuButton", options);
}

export interface GetChatMenuButtonOptions {
  chat_id?: number | string;
}

export async function getChatMenuButton(options: GetChatMenuButtonOptions = {}) {
  return callApi<MenuButton>("getChatMenuButton", options);
}

export interface ChatAdministratorRights {
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

export interface SetMyDefaultAdministratorRightsOptions {
  rights?: ChatAdministratorRights;
  for_channels?: boolean;
}

export async function setMyDefaultAdministratorRights(options: SetMyDefaultAdministratorRightsOptions = {}) {
  return callApi<boolean>("setMyDefaultAdministratorRights", options);
}

export interface GetMyDefaultAdministratorRightsOptions {
  for_channels?: boolean;
}

export async function getMyDefaultAdministratorRights(options: GetMyDefaultAdministratorRightsOptions = {}) {
  return callApi<ChatAdministratorRights>("getMyDefaultAdministratorRights", options);
}

export interface GetUserProfilePhotosOptions {
  user_id: number;
  offset?: number;
  limit?: number;
}

export async function getUserProfilePhotos(options: GetUserProfilePhotosOptions) {
  return callApi<{ total_count: number; photos: Array<Array<{ file_id: string; file_unique_id: string; width: number; height: number; file_size?: number }>> }>("getUserProfilePhotos", options);
}
