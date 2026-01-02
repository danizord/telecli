import type { ApiResponse } from "./types";

const BASE_URL = "https://api.telegram.org/bot";

function getToken(): string {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN environment variable is not set");
  }
  return token;
}

export async function callApi<T>(
  method: string,
  params?: Record<string, unknown>
): Promise<ApiResponse<T>> {
  const token = getToken();
  const url = `${BASE_URL}${token}/${method}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: params ? JSON.stringify(params) : undefined,
  });

  return response.json() as Promise<ApiResponse<T>>;
}

export async function callApiWithFile<T>(
  method: string,
  params: Record<string, unknown>,
  fileField: string,
  filePath: string
): Promise<ApiResponse<T>> {
  const token = getToken();
  const url = `${BASE_URL}${token}/${method}`;

  const formData = new FormData();

  // Add regular params
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      formData.append(key, String(value));
    }
  }

  // Add file
  const file = Bun.file(filePath);
  formData.append(fileField, file);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  return response.json() as Promise<ApiResponse<T>>;
}

export function getFileUrl(filePath: string): string {
  const token = getToken();
  return `https://api.telegram.org/file/bot${token}/${filePath}`;
}
