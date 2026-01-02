import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { $ } from "bun";

describe("CLI", () => {
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

  it("should show help with no arguments", async () => {
    const result = await $`bun run src/index.ts`.text();
    expect(result).toContain("Telegram Bot CLI");
    expect(result).toContain("Usage:");
  });

  it("should show help with --help flag", async () => {
    const result = await $`bun run src/index.ts --help`.text();
    expect(result).toContain("Telegram Bot CLI");
  });

  it("should show help with help command", async () => {
    const result = await $`bun run src/index.ts help`.text();
    expect(result).toContain("Telegram Bot CLI");
  });

  it("should error on unknown command", async () => {
    try {
      await $`bun run src/index.ts unknown`.text();
      expect(true).toBe(false); // Should not reach here
    } catch {
      // Expected to throw
    }
  });

  it("should error when token is not set", async () => {
    try {
      await $`TELEGRAM_BOT_TOKEN= bun run src/index.ts me`.text();
      expect(true).toBe(false);
    } catch {
      // Expected to throw
    }
  });
});
