import { callApi } from "../api";
import type { ReactionType } from "../types";

export interface SetMessageReactionOptions {
  chat_id: number | string;
  message_id: number;
  reaction?: ReactionType[];
  is_big?: boolean;
}

export async function setMessageReaction(options: SetMessageReactionOptions) {
  return callApi<boolean>("setMessageReaction", options);
}
