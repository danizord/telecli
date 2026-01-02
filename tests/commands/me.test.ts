import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { getMe } from "../../src/commands/me";

describe("getMe command", () => {
  const originalEnv = process.env.TELEGRAM_BOT_TOKEN;

  beforeAll(() => {
    process.env.TELEGRAM_BOT_TOKEN = "test-token-123";
  });

  afterAll(() => {
    if (originalEnv) {
      process.env.TELEGRAM_BOT_TOKEN = originalEnv;
    } else {
      delete process.env.TELEGRAM_BOT_TOKEN;
    }
  });

  it("should call getMe API method", async () => {
    const originalFetch = globalThis.fetch;
    let calledMethod = "";

    globalThis.fetch = async (url: string | URL | Request) => {
      calledMethod = url.toString().split("/").pop() || "";
      return new Response(
        JSON.stringify({
          ok: true,
          result: {
            id: 123,
            is_bot: true,
            first_name: "TestBot",
            username: "test_bot",
          },
        })
      );
    };

    try {
      const result = await getMe();
      expect(calledMethod).toBe("getMe");
      expect(result.ok).toBe(true);
      expect(result.result?.is_bot).toBe(true);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
