---
name: telegram-poll
description: Start polling for Telegram updates in background
argument-hint: "[--stop]"
allowed-tools: ["Bash", "Read", "Write"]
---

# Telegram Polling Command

Start or stop the Telegram polling loop.

## Starting Polling

1. Create the polling state file at `.claude/telegram-polling.local.md`:
   ```yaml
   ---
   active: true
   last_offset: null
   started_at: <current ISO timestamp>
   ---

   Telegram polling active. Processing incoming messages.
   ```

2. Confirm polling has started

3. Begin the polling loop:
   - Run `tg updates poll --timeout 30` (or with `--offset` if resuming)
   - Process any incoming messages (respond, react, etc.)
   - Update `last_offset` in state file with highest update_id + 1
   - Continue polling

## Stopping Polling

If user passes `--stop`:

1. Read `.claude/telegram-polling.local.md`
2. Set `active: false` in frontmatter
3. Confirm polling has stopped

## Important

- The Stop and Notification hooks will keep polling alive even if you try to exit
- To fully stop, use `/telegram-poll --stop`
- State file location: `.claude/telegram-polling.local.md`
