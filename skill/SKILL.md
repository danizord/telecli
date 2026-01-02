---
name: telecli
description: Control Telegram bots via CLI using Telecli. Use when the user asks to send Telegram messages, manage a bot, poll for updates, send photos/media, create polls, manage groups/channels, handle reactions, or perform any Telegram Bot API operation. All commands output JSON for easy parsing.
---

# Telecli - Telegram Bot CLI

A thin CLI wrapper around the Telegram Bot API. All commands output JSON.

## Setup

```bash
export TELEGRAM_BOT_TOKEN="your_token"
```

Run commands with: `bun run src/index.ts <command>` or `bun run tg <command>`

## Core Commands

### Get Bot Info
```bash
tg me
```

### Poll for Updates
```bash
tg updates poll --timeout 30
tg updates poll --timeout 30 --offset <last_update_id + 1>
```

### Send Messages
```bash
tg message send <chat_id> "Hello!"
tg message send <chat_id> "**Bold**" --parse-mode MarkdownV2
tg message send <chat_id> "Reply" --reply-to <msg_id>
tg message reply <chat_id> <msg_id> "Reply text"
```

### Send Media
```bash
tg media photo <chat_id> /path/to/photo.jpg
tg media photo <chat_id> /path/to/photo.jpg --caption "Caption"
tg media video <chat_id> /path/to/video.mp4
tg media document <chat_id> /path/to/file.pdf
tg media sticker <chat_id> <sticker_file_id>
```

### Polls
```bash
tg poll send <chat_id> "Question?" '["Option 1", "Option 2", "Option 3"]'
tg poll send <chat_id> "Quiz?" '["Wrong", "Correct"]' --quiz --correct 1
```

### Reactions & Pins
```bash
tg reaction <chat_id> <msg_id> "👍"
tg pin <chat_id> <msg_id>
tg unpin <chat_id> <msg_id>
```

### Chat Info
```bash
tg chat info <chat_id>
tg chat admins <chat_id>
tg chat count <chat_id>
```

### User Profile Photos
```bash
tg photos <user_id>
tg file download <file_id> /tmp/photo.jpg
```

## Patterns for AI Agents

### Infinite Polling Loop
```bash
# First poll
tg updates poll --timeout 30

# Extract max update_id from response, then:
tg updates poll --timeout 30 --offset <max_update_id + 1>
```

### Handling Different Message Types
Update objects contain different fields:
- `message.text` - Text messages
- `message.photo` - Photo messages (array of sizes)
- `message.sticker` - Stickers
- `message.poll` - Polls
- `message.reply_to_message` - Reply context

### Group vs Private Chats
- Private chat: `chat.type == "private"`, `chat.id` is positive
- Group chat: `chat.type == "group"` or `"supergroup"`, `chat.id` is negative
- Channel: `chat.type == "channel"`

### Downloading Files
```bash
# Get file info first
tg file info <file_id>
# Then download
tg file download <file_id> /tmp/filename.ext
```

### Sending Inline Keyboards
```bash
tg message send <chat_id> "Choose:" --keyboard '[
  [{"text": "Option 1", "callback_data": "opt1"}],
  [{"text": "Option 2", "callback_data": "opt2"}]
]'
```

## Common Chat IDs
- User IDs: Positive integers (e.g., `230200830`)
- Group IDs: Negative integers (e.g., `-793893399`)
- Channels: Large negative integers (e.g., `-1001234567890`)

## Response Format

Success:
```json
{"ok": true, "result": {...}}
```

Error:
```json
{"ok": false, "error": "description"}
```

## Full Command Reference

See `references/commands.md` for complete command documentation.
