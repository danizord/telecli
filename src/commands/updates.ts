import { callApi } from "../api";
import type { Update } from "../types";

export interface GetUpdatesOptions {
  offset?: number;
  limit?: number;
  timeout?: number;
  allowed_updates?: string[];
}

export async function getUpdates(options: GetUpdatesOptions = {}) {
  return callApi<Update[]>("getUpdates", options);
}

export interface SetWebhookOptions {
  url: string;
  certificate?: string;
  ip_address?: string;
  max_connections?: number;
  allowed_updates?: string[];
  drop_pending_updates?: boolean;
  secret_token?: string;
}

export async function setWebhook(options: SetWebhookOptions) {
  return callApi<boolean>("setWebhook", options);
}

export async function deleteWebhook(dropPendingUpdates?: boolean) {
  return callApi<boolean>("deleteWebhook", {
    drop_pending_updates: dropPendingUpdates,
  });
}

export async function getWebhookInfo() {
  return callApi<{
    url: string;
    has_custom_certificate: boolean;
    pending_update_count: number;
    ip_address?: string;
    last_error_date?: number;
    last_error_message?: string;
    last_synchronization_error_date?: number;
    max_connections?: number;
    allowed_updates?: string[];
  }>("getWebhookInfo");
}
