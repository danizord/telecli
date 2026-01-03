import type { ApiResponse } from "./types";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { homedir } from "os";
import { join } from "path";

const BASE_URL = "https://api.telegram.org/bot";

// Config paths
const LOCAL_CONFIG_DIR = join(process.cwd(), ".telecli");
const LOCAL_CONFIG_FILE = join(LOCAL_CONFIG_DIR, "config.json");
const GLOBAL_CONFIG_DIR = join(homedir(), ".telecli");
const GLOBAL_CONFIG_FILE = join(GLOBAL_CONFIG_DIR, "config.json");

interface Config {
  token?: string;
}

function readConfigFile(path: string): Config {
  if (existsSync(path)) {
    try {
      return JSON.parse(readFileSync(path, "utf-8"));
    } catch {
      return {};
    }
  }
  return {};
}

export function getLocalConfig(): Config {
  return readConfigFile(LOCAL_CONFIG_FILE);
}

export function getGlobalConfig(): Config {
  return readConfigFile(GLOBAL_CONFIG_FILE);
}

export function getConfig(): Config {
  // Merge: local overrides global
  return { ...getGlobalConfig(), ...getLocalConfig() };
}

export function setConfig(config: Config, local: boolean = false): void {
  const configDir = local ? LOCAL_CONFIG_DIR : GLOBAL_CONFIG_DIR;
  const configFile = local ? LOCAL_CONFIG_FILE : GLOBAL_CONFIG_FILE;

  if (!existsSync(configDir)) {
    mkdirSync(configDir, { recursive: true });
  }

  // Merge with existing config
  const existing = readConfigFile(configFile);
  writeFileSync(configFile, JSON.stringify({ ...existing, ...config }, null, 2));
}

export function getConfigPaths(): { local: string; global: string } {
  return { local: LOCAL_CONFIG_FILE, global: GLOBAL_CONFIG_FILE };
}

function getToken(): string {
  // Priority: env var > local config > global config
  const envToken = process.env.TELEGRAM_BOT_TOKEN;
  if (envToken) {
    return envToken;
  }

  const localConfig = getLocalConfig();
  if (localConfig.token) {
    return localConfig.token;
  }

  const globalConfig = getGlobalConfig();
  if (globalConfig.token) {
    return globalConfig.token;
  }

  throw new Error(
    "Bot token not found. Set it with:\n" +
      "  tg config token <your_token>         # global\n" +
      "  tg config token <your_token> --local # local (./.telecli/)\n" +
      "Or use the TELEGRAM_BOT_TOKEN environment variable.",
  );
}

export async function callApi<T>(method: string, params?: object): Promise<ApiResponse<T>> {
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
  filePath: string,
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
