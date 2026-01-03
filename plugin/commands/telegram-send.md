---
name: telegram-send
description: Send a message to a Telegram chat
argument-hint: "<chat_id> <message>"
allowed-tools: ["Bash"]
---

# Send Telegram Message

Quick command to send a message to a Telegram chat.

## Usage

Parse the arguments:
- First argument: `chat_id` (number or @username)
- Remaining arguments: message text

## Execution

Run:
```bash
tg message send <chat_id> "<message>"
```

## Options

If user mentions:
- `--reply-to <id>`: Add `--reply-to <id>` flag
- `--parse-mode html|markdown`: Add `--parse-mode` flag
- `--keyboard <json>`: Add `--keyboard` flag with inline keyboard JSON

## Examples

```bash
# Simple message
tg message send 123456789 "Hello!"

# Reply to a message
tg message send 123456789 "Thanks!" --reply-to 42

# With formatting
tg message send 123456789 "<b>Bold</b> text" --parse-mode html
```
