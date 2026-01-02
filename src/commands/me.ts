import { callApi } from "../api";
import type { User } from "../types";

export async function getMe() {
  return callApi<User>("getMe");
}
