---
name: telegram-status
description: Show Telegram bot status and polling state
allowed-tools: ["Bash", "Read"]
---

# Telegram Status Command

Show current Telegram bot status and polling configuration.

## Steps

1. **Bot Info**: Run `tg me` to get bot information

2. **Config**: Run `tg config token` to show configured tokens (masked)

3. **Polling State**: Check if `.claude/telegram-polling.local.md` exists
   - If exists: Read and show polling status (active, last_offset, started_at)
   - If not: Report "Polling not active"

4. **Recent Updates**: Optionally run `tg updates poll --timeout 1` to check for pending updates

## Output Format

Present a summary like:

```
Bot: @BotUsername (ID: 123456789)
Token: 12345...67890 (global)

Polling: Active
  - Started: 2024-01-15T10:30:00Z
  - Last offset: 729538157

Pending updates: 0
```
