import { callApi } from "../api";
import type { Message } from "../types";

export interface SendLocationOptions {
  chat_id: number | string;
  latitude: number;
  longitude: number;
  message_thread_id?: number;
  horizontal_accuracy?: number;
  live_period?: number;
  heading?: number;
  proximity_alert_radius?: number;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
}

export async function sendLocation(options: SendLocationOptions) {
  return callApi<Message>("sendLocation", options);
}

export interface SendVenueOptions {
  chat_id: number | string;
  latitude: number;
  longitude: number;
  title: string;
  address: string;
  message_thread_id?: number;
  foursquare_id?: string;
  foursquare_type?: string;
  google_place_id?: string;
  google_place_type?: string;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
}

export async function sendVenue(options: SendVenueOptions) {
  return callApi<Message>("sendVenue", options);
}

export interface EditMessageLiveLocationOptions {
  chat_id?: number | string;
  message_id?: number;
  inline_message_id?: string;
  latitude: number;
  longitude: number;
  live_period?: number;
  horizontal_accuracy?: number;
  heading?: number;
  proximity_alert_radius?: number;
}

export async function editMessageLiveLocation(options: EditMessageLiveLocationOptions) {
  return callApi<Message | boolean>("editMessageLiveLocation", options);
}

export interface StopMessageLiveLocationOptions {
  chat_id?: number | string;
  message_id?: number;
  inline_message_id?: string;
}

export async function stopMessageLiveLocation(options: StopMessageLiveLocationOptions) {
  return callApi<Message | boolean>("stopMessageLiveLocation", options);
}
