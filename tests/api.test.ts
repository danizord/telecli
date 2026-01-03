import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { callApi } from "../src/api";

describe("API Client", () => {
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

  it("should throw error when token is not set", async () => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_BOT_TOKEN;

    try {
      await callApi("getMe");
      expect(true).toBe(false); // Should not reach here
    } catch (err) {
      expect((err as Error).message).toContain("Bot token not found");
    } finally {
      process.env.TELEGRAM_BOT_TOKEN = token;
    }
  });

  it("should call the correct API endpoint", async () => {
    const originalFetch = globalThis.fetch;
    let calledUrl = "";

    (globalThis as any).fetch = async (url: string | URL | Request, _init?: RequestInit) => {
      calledUrl = url.toString();
      return new Response(JSON.stringify({ ok: true, result: {} }));
    };

    try {
      await callApi("getMe");
      expect(calledUrl).toBe("https://api.telegram.org/bottest-token-123/getMe");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("should send params as JSON body", async () => {
    const originalFetch = globalThis.fetch;
    let sentBody = "";

    (globalThis as any).fetch = async (url: string | URL | Request, init?: RequestInit) => {
      sentBody = init?.body as string;
      return new Response(JSON.stringify({ ok: true, result: {} }));
    };

    try {
      await callApi("sendMessage", { chat_id: 123, text: "Hello" });
      expect(JSON.parse(sentBody)).toEqual({ chat_id: 123, text: "Hello" });
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("should return parsed JSON response", async () => {
    const originalFetch = globalThis.fetch;
    const mockResponse = {
      ok: true,
      result: { id: 123, first_name: "TestBot", is_bot: true },
    };

    (globalThis as any).fetch = async () => {
      return new Response(JSON.stringify(mockResponse));
    };

    try {
      const result = await callApi("getMe");
      expect(result).toEqual(mockResponse);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
