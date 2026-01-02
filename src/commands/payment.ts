import { callApi } from "../api";
import type { Message } from "../types";

export interface LabeledPrice {
  label: string;
  amount: number;
}

export interface SendInvoiceOptions {
  chat_id: number | string;
  title: string;
  description: string;
  payload: string;
  currency: string;
  prices: LabeledPrice[];
  message_thread_id?: number;
  provider_token?: string;
  max_tip_amount?: number;
  suggested_tip_amounts?: number[];
  start_parameter?: string;
  provider_data?: string;
  photo_url?: string;
  photo_size?: number;
  photo_width?: number;
  photo_height?: number;
  need_name?: boolean;
  need_phone_number?: boolean;
  need_email?: boolean;
  need_shipping_address?: boolean;
  send_phone_number_to_provider?: boolean;
  send_email_to_provider?: boolean;
  is_flexible?: boolean;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
}

export async function sendInvoice(options: SendInvoiceOptions) {
  return callApi<Message>("sendInvoice", options);
}

export interface CreateInvoiceLinkOptions {
  title: string;
  description: string;
  payload: string;
  currency: string;
  prices: LabeledPrice[];
  provider_token?: string;
  max_tip_amount?: number;
  suggested_tip_amounts?: number[];
  provider_data?: string;
  photo_url?: string;
  photo_size?: number;
  photo_width?: number;
  photo_height?: number;
  need_name?: boolean;
  need_phone_number?: boolean;
  need_email?: boolean;
  need_shipping_address?: boolean;
  send_phone_number_to_provider?: boolean;
  send_email_to_provider?: boolean;
  is_flexible?: boolean;
}

export async function createInvoiceLink(options: CreateInvoiceLinkOptions) {
  return callApi<string>("createInvoiceLink", options);
}

export interface ShippingOption {
  id: string;
  title: string;
  prices: LabeledPrice[];
}

export interface AnswerShippingQueryOptions {
  shipping_query_id: string;
  ok: boolean;
  shipping_options?: ShippingOption[];
  error_message?: string;
}

export async function answerShippingQuery(options: AnswerShippingQueryOptions) {
  return callApi<boolean>("answerShippingQuery", options);
}

export interface AnswerPreCheckoutQueryOptions {
  pre_checkout_query_id: string;
  ok: boolean;
  error_message?: string;
}

export async function answerPreCheckoutQuery(options: AnswerPreCheckoutQueryOptions) {
  return callApi<boolean>("answerPreCheckoutQuery", options);
}

export interface RefundStarPaymentOptions {
  user_id: number;
  telegram_payment_charge_id: string;
}

export async function refundStarPayment(options: RefundStarPaymentOptions) {
  return callApi<boolean>("refundStarPayment", options);
}

export async function getStarTransactions(offset?: number, limit?: number) {
  return callApi<{
    transactions: Array<{
      id: string;
      amount: number;
      date: number;
      source?: unknown;
      receiver?: unknown;
    }>;
  }>("getStarTransactions", { offset, limit });
}
