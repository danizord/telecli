import { getLocalConfig, getGlobalConfig, setConfig, getConfigPaths } from "../api";

export function configToken(token?: string, local: boolean = false): void {
  const paths = getConfigPaths();

  if (token) {
    // Set token
    setConfig({ token }, local);
    const savedTo = local ? paths.local : paths.global;
    console.log(JSON.stringify({ ok: true, message: `Token saved to ${savedTo}` }));
  } else {
    // Get token info
    const localConfig = getLocalConfig();
    const globalConfig = getGlobalConfig();

    const result: Record<string, unknown> = { ok: true };

    if (localConfig.token) {
      result.local = {
        path: paths.local,
        token: localConfig.token.slice(0, 5) + "..." + localConfig.token.slice(-5),
      };
    }

    if (globalConfig.token) {
      result.global = {
        path: paths.global,
        token: globalConfig.token.slice(0, 5) + "..." + globalConfig.token.slice(-5),
      };
    }

    if (!localConfig.token && !globalConfig.token) {
      result.ok = false;
      result.error = "No token configured";
    }

    console.log(JSON.stringify(result));
  }
}

export function configPath(): void {
  const paths = getConfigPaths();
  console.log(
    JSON.stringify({
      ok: true,
      local: paths.local,
      global: paths.global,
    }),
  );
}
