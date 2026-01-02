import { callApi, callApiWithFile } from "../api";
import type { Message } from "../types";

export interface StickerSet {
  name: string;
  title: string;
  sticker_type: "regular" | "mask" | "custom_emoji";
  stickers: Array<{
    file_id: string;
    file_unique_id: string;
    type: string;
    width: number;
    height: number;
    is_animated: boolean;
    is_video: boolean;
    emoji?: string;
    set_name?: string;
    mask_position?: MaskPosition;
    custom_emoji_id?: string;
    needs_repainting?: boolean;
    file_size?: number;
  }>;
  thumbnail?: { file_id: string; file_unique_id: string; width: number; height: number };
}

export interface MaskPosition {
  point: "forehead" | "eyes" | "mouth" | "chin";
  x_shift: number;
  y_shift: number;
  scale: number;
}

export async function getStickerSet(name: string) {
  return callApi<StickerSet>("getStickerSet", { name });
}

export async function getCustomEmojiStickers(customEmojiIds: string[]) {
  return callApi<Array<{
    file_id: string;
    file_unique_id: string;
    type: string;
    width: number;
    height: number;
    is_animated: boolean;
    is_video: boolean;
    emoji?: string;
    custom_emoji_id?: string;
  }>>("getCustomEmojiStickers", { custom_emoji_ids: customEmojiIds });
}

export interface UploadStickerFileOptions {
  user_id: number;
  sticker: string; // file path
  sticker_format: "static" | "animated" | "video";
}

export async function uploadStickerFile(options: UploadStickerFileOptions) {
  const { sticker, ...params } = options;
  return callApiWithFile<{ file_id: string; file_unique_id: string; file_size: number }>(
    "uploadStickerFile",
    params,
    "sticker",
    sticker
  );
}

export interface InputSticker {
  sticker: string;
  format: "static" | "animated" | "video";
  emoji_list: string[];
  mask_position?: MaskPosition;
  keywords?: string[];
}

export interface CreateNewStickerSetOptions {
  user_id: number;
  name: string;
  title: string;
  stickers: InputSticker[];
  sticker_type?: "regular" | "mask" | "custom_emoji";
  needs_repainting?: boolean;
}

export async function createNewStickerSet(options: CreateNewStickerSetOptions) {
  return callApi<boolean>("createNewStickerSet", options);
}

export interface AddStickerToSetOptions {
  user_id: number;
  name: string;
  sticker: InputSticker;
}

export async function addStickerToSet(options: AddStickerToSetOptions) {
  return callApi<boolean>("addStickerToSet", options);
}

export interface SetStickerPositionInSetOptions {
  sticker: string;
  position: number;
}

export async function setStickerPositionInSet(options: SetStickerPositionInSetOptions) {
  return callApi<boolean>("setStickerPositionInSet", options);
}

export async function deleteStickerFromSet(sticker: string) {
  return callApi<boolean>("deleteStickerFromSet", { sticker });
}

export interface ReplaceStickerInSetOptions {
  user_id: number;
  name: string;
  old_sticker: string;
  sticker: InputSticker;
}

export async function replaceStickerInSet(options: ReplaceStickerInSetOptions) {
  return callApi<boolean>("replaceStickerInSet", options);
}

export interface SetStickerEmojiListOptions {
  sticker: string;
  emoji_list: string[];
}

export async function setStickerEmojiList(options: SetStickerEmojiListOptions) {
  return callApi<boolean>("setStickerEmojiList", options);
}

export interface SetStickerKeywordsOptions {
  sticker: string;
  keywords?: string[];
}

export async function setStickerKeywords(options: SetStickerKeywordsOptions) {
  return callApi<boolean>("setStickerKeywords", options);
}

export interface SetStickerMaskPositionOptions {
  sticker: string;
  mask_position?: MaskPosition;
}

export async function setStickerMaskPosition(options: SetStickerMaskPositionOptions) {
  return callApi<boolean>("setStickerMaskPosition", options);
}

export interface SetStickerSetTitleOptions {
  name: string;
  title: string;
}

export async function setStickerSetTitle(options: SetStickerSetTitleOptions) {
  return callApi<boolean>("setStickerSetTitle", options);
}

export interface SetStickerSetThumbnailOptions {
  name: string;
  user_id: number;
  format: "static" | "animated" | "video";
  thumbnail?: string;
}

export async function setStickerSetThumbnail(options: SetStickerSetThumbnailOptions) {
  return callApi<boolean>("setStickerSetThumbnail", options);
}

export interface SetCustomEmojiStickerSetThumbnailOptions {
  name: string;
  custom_emoji_id?: string;
}

export async function setCustomEmojiStickerSetThumbnail(options: SetCustomEmojiStickerSetThumbnailOptions) {
  return callApi<boolean>("setCustomEmojiStickerSetThumbnail", options);
}

export async function deleteStickerSet(name: string) {
  return callApi<boolean>("deleteStickerSet", { name });
}
