import { getConfig, setConfig } from "../api";
import { homedir } from "os";
import { join } from "path";

const CONFIG_FILE = join(homedir(), ".telecli", "config.json");

export function configToken(token?: string): void {
  if (token) {
    // Set token
    const config = getConfig();
    config.token = token;
    setConfig(config);
    console.log(JSON.stringify({ ok: true, message: `Token saved to ${CONFIG_FILE}` }));
  } else {
    // Get token
    const config = getConfig();
    if (config.token) {
      // Mask the token for security
      const masked = config.token.slice(0, 5) + "..." + config.token.slice(-5);
      console.log(JSON.stringify({ ok: true, token: masked }));
    } else {
      console.log(JSON.stringify({ ok: false, error: "No token configured" }));
    }
  }
}

export function configPath(): void {
  console.log(JSON.stringify({ ok: true, path: CONFIG_FILE }));
}
