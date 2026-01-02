import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import {
  sendMessage,
  forwardMessage,
  editMessageText,
  deleteMessage,
} from "../../src/commands/message";

describe("message commands", () => {
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

  describe("sendMessage", () => {
    it("should send a message with correct params", async () => {
      const originalFetch = globalThis.fetch;
      let sentParams: Record<string, unknown> = {};

      globalThis.fetch = async (url: string | URL | Request, init?: RequestInit) => {
        sentParams = JSON.parse(init?.body as string);
        return new Response(
          JSON.stringify({
            ok: true,
            result: {
              message_id: 1,
              chat: { id: 123, type: "private" },
              date: Date.now(),
              text: "Hello",
            },
          })
        );
      };

      try {
        const result = await sendMessage({ chat_id: 123, text: "Hello" });
        expect(sentParams.chat_id).toBe(123);
        expect(sentParams.text).toBe("Hello");
        expect(result.ok).toBe(true);
      } finally {
        globalThis.fetch = originalFetch;
      }
    });

    it("should include optional params when provided", async () => {
      const originalFetch = globalThis.fetch;
      let sentParams: Record<string, unknown> = {};

      globalThis.fetch = async (url: string | URL | Request, init?: RequestInit) => {
        sentParams = JSON.parse(init?.body as string);
        return new Response(JSON.stringify({ ok: true, result: {} }));
      };

      try {
        await sendMessage({
          chat_id: 123,
          text: "Hello",
          parse_mode: "HTML",
          reply_to_message_id: 456,
          message_thread_id: 789,
        });
        expect(sentParams.parse_mode).toBe("HTML");
        expect(sentParams.reply_to_message_id).toBe(456);
        expect(sentParams.message_thread_id).toBe(789);
      } finally {
        globalThis.fetch = originalFetch;
      }
    });
  });

  describe("forwardMessage", () => {
    it("should forward a message with correct params", async () => {
      const originalFetch = globalThis.fetch;
      let sentParams: Record<string, unknown> = {};

      globalThis.fetch = async (url: string | URL | Request, init?: RequestInit) => {
        sentParams = JSON.parse(init?.body as string);
        return new Response(JSON.stringify({ ok: true, result: {} }));
      };

      try {
        await forwardMessage({
          chat_id: 123,
          from_chat_id: 456,
          message_id: 789,
        });
        expect(sentParams.chat_id).toBe(123);
        expect(sentParams.from_chat_id).toBe(456);
        expect(sentParams.message_id).toBe(789);
      } finally {
        globalThis.fetch = originalFetch;
      }
    });
  });

  describe("editMessageText", () => {
    it("should edit a message with correct params", async () => {
      const originalFetch = globalThis.fetch;
      let sentParams: Record<string, unknown> = {};

      globalThis.fetch = async (url: string | URL | Request, init?: RequestInit) => {
        sentParams = JSON.parse(init?.body as string);
        return new Response(JSON.stringify({ ok: true, result: {} }));
      };

      try {
        await editMessageText({
          chat_id: 123,
          message_id: 456,
          text: "Edited",
        });
        expect(sentParams.chat_id).toBe(123);
        expect(sentParams.message_id).toBe(456);
        expect(sentParams.text).toBe("Edited");
      } finally {
        globalThis.fetch = originalFetch;
      }
    });
  });

  describe("deleteMessage", () => {
    it("should delete a message with correct params", async () => {
      const originalFetch = globalThis.fetch;
      let sentParams: Record<string, unknown> = {};

      globalThis.fetch = async (url: string | URL | Request, init?: RequestInit) => {
        sentParams = JSON.parse(init?.body as string);
        return new Response(JSON.stringify({ ok: true, result: true }));
      };

      try {
        const result = await deleteMessage({ chat_id: 123, message_id: 456 });
        expect(sentParams.chat_id).toBe(123);
        expect(sentParams.message_id).toBe(456);
        expect(result.ok).toBe(true);
      } finally {
        globalThis.fetch = originalFetch;
      }
    });
  });
});
