import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import {
  getChat,
  getChatAdministrators,
  getChatMemberCount,
  leaveChat,
} from "../../src/commands/chat";

describe("chat commands", () => {
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

  describe("getChat", () => {
    it("should get chat info", async () => {
      const originalFetch = globalThis.fetch;
      let sentParams: Record<string, unknown> = {};

      (globalThis as any).fetch = async (url: string | URL | Request, init?: RequestInit) => {
        sentParams = JSON.parse(init?.body as string);
        return new Response(
          JSON.stringify({
            ok: true,
            result: {
              id: 123,
              type: "group",
              title: "Test Group",
            },
          }),
        );
      };

      try {
        const result = await getChat(123);
        expect(sentParams.chat_id).toBe(123);
        expect(result.ok).toBe(true);
        expect(result.result?.title).toBe("Test Group");
      } finally {
        globalThis.fetch = originalFetch;
      }
    });
  });

  describe("getChatAdministrators", () => {
    it("should get chat administrators", async () => {
      const originalFetch = globalThis.fetch;

      (globalThis as any).fetch = async () => {
        return new Response(
          JSON.stringify({
            ok: true,
            result: [
              {
                user: { id: 1, is_bot: false, first_name: "Admin" },
                status: "creator",
              },
            ],
          }),
        );
      };

      try {
        const result = await getChatAdministrators(123);
        expect(result.ok).toBe(true);
        expect(result.result?.length).toBe(1);
        expect(result.result?.[0].status).toBe("creator");
      } finally {
        globalThis.fetch = originalFetch;
      }
    });
  });

  describe("getChatMemberCount", () => {
    it("should get member count", async () => {
      const originalFetch = globalThis.fetch;

      (globalThis as any).fetch = async () => {
        return new Response(
          JSON.stringify({
            ok: true,
            result: 42,
          }),
        );
      };

      try {
        const result = await getChatMemberCount(123);
        expect(result.ok).toBe(true);
        expect(result.result).toBe(42);
      } finally {
        globalThis.fetch = originalFetch;
      }
    });
  });

  describe("leaveChat", () => {
    it("should leave chat", async () => {
      const originalFetch = globalThis.fetch;
      let sentParams: Record<string, unknown> = {};

      (globalThis as any).fetch = async (url: string | URL | Request, init?: RequestInit) => {
        sentParams = JSON.parse(init?.body as string);
        return new Response(JSON.stringify({ ok: true, result: true }));
      };

      try {
        const result = await leaveChat(123);
        expect(sentParams.chat_id).toBe(123);
        expect(result.ok).toBe(true);
      } finally {
        globalThis.fetch = originalFetch;
      }
    });
  });
});
