import { callApi } from "../api";
import type { Message } from "../types";

export interface SendGameOptions {
  chat_id: number;
  game_short_name: string;
  message_thread_id?: number;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
}

export async function sendGame(options: SendGameOptions) {
  return callApi<Message>("sendGame", options);
}

export interface SetGameScoreOptions {
  user_id: number;
  score: number;
  force?: boolean;
  disable_edit_message?: boolean;
  chat_id?: number;
  message_id?: number;
  inline_message_id?: string;
}

export async function setGameScore(options: SetGameScoreOptions) {
  return callApi<Message | boolean>("setGameScore", options);
}

export interface GetGameHighScoresOptions {
  user_id: number;
  chat_id?: number;
  message_id?: number;
  inline_message_id?: string;
}

export interface GameHighScore {
  position: number;
  user: {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
  };
  score: number;
}

export async function getGameHighScores(options: GetGameHighScoresOptions) {
  return callApi<GameHighScore[]>("getGameHighScores", options);
}
