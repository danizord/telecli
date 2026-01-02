import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { getUpdates, setWebhook, deleteWebhook, getWebhookInfo } from "../../src/commands/updates";

describe("updates commands", () => {
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

  describe("getUpdates", () => {
    it("should get updates with default params", async () => {
      const originalFetch = globalThis.fetch;
      let calledMethod = "";

      globalThis.fetch = async (url: string | URL | Request) => {
        calledMethod = url.toString().split("/").pop() || "";
        return new Response(
          JSON.stringify({
            ok: true,
            result: [],
          })
        );
      };

      try {
        const result = await getUpdates();
        expect(calledMethod).toBe("getUpdates");
        expect(result.ok).toBe(true);
        expect(result.result).toEqual([]);
      } finally {
        globalThis.fetch = originalFetch;
      }
    });

    it("should pass offset, limit, and timeout params", async () => {
      const originalFetch = globalThis.fetch;
      let sentParams: Record<string, unknown> = {};

      globalThis.fetch = async (url: string | URL | Request, init?: RequestInit) => {
        sentParams = JSON.parse(init?.body as string);
        return new Response(JSON.stringify({ ok: true, result: [] }));
      };

      try {
        await getUpdates({ offset: 100, limit: 10, timeout: 30 });
        expect(sentParams.offset).toBe(100);
        expect(sentParams.limit).toBe(10);
        expect(sentParams.timeout).toBe(30);
      } finally {
        globalThis.fetch = originalFetch;
      }
    });
  });

  describe("webhook management", () => {
    it("should set webhook", async () => {
      const originalFetch = globalThis.fetch;
      let sentParams: Record<string, unknown> = {};

      globalThis.fetch = async (url: string | URL | Request, init?: RequestInit) => {
        sentParams = JSON.parse(init?.body as string);
        return new Response(JSON.stringify({ ok: true, result: true }));
      };

      try {
        const result = await setWebhook({ url: "https://example.com/webhook" });
        expect(sentParams.url).toBe("https://example.com/webhook");
        expect(result.ok).toBe(true);
      } finally {
        globalThis.fetch = originalFetch;
      }
    });

    it("should delete webhook", async () => {
      const originalFetch = globalThis.fetch;
      let calledMethod = "";

      globalThis.fetch = async (url: string | URL | Request) => {
        calledMethod = url.toString().split("/").pop() || "";
        return new Response(JSON.stringify({ ok: true, result: true }));
      };

      try {
        const result = await deleteWebhook();
        expect(calledMethod).toBe("deleteWebhook");
        expect(result.ok).toBe(true);
      } finally {
        globalThis.fetch = originalFetch;
      }
    });

    it("should get webhook info", async () => {
      const originalFetch = globalThis.fetch;

      globalThis.fetch = async () => {
        return new Response(
          JSON.stringify({
            ok: true,
            result: {
              url: "",
              has_custom_certificate: false,
              pending_update_count: 0,
            },
          })
        );
      };

      try {
        const result = await getWebhookInfo();
        expect(result.ok).toBe(true);
        expect(result.result?.pending_update_count).toBe(0);
      } finally {
        globalThis.fetch = originalFetch;
      }
    });
  });
});
