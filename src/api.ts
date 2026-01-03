import type { ApiResponse } from "./types";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { homedir } from "os";
import { join } from "path";

const BASE_URL = "https://api.telegram.org/bot";
const CONFIG_DIR = join(homedir(), ".telecli");
const CONFIG_FILE = join(CONFIG_DIR, "config.json");

interface Config {
  token?: string;
}

export function getConfig(): Config {
  if (existsSync(CONFIG_FILE)) {
    try {
      return JSON.parse(readFileSync(CONFIG_FILE, "utf-8"));
    } catch {
      return {};
    }
  }
  return {};
}

export function setConfig(config: Config): void {
  if (!existsSync(CONFIG_DIR)) {
    mkdirSync(CONFIG_DIR, { recursive: true });
  }
  writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

function getToken(): string {
  // First check env var
  const envToken = process.env.TELEGRAM_BOT_TOKEN;
  if (envToken) {
    return envToken;
  }

  // Then check config file
  const config = getConfig();
  if (config.token) {
    return config.token;
  }

  throw new Error(
    "Bot token not found. Set it with:\n" +
    "  tg config token <your_token>\n" +
    "Or use the TELEGRAM_BOT_TOKEN environment variable."
  );
}

export async function callApi<T>(
  method: string,
  params?: object
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
  params: object,
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
