# Telecli Command Reference

Complete reference for all `tg` CLI commands and options.

## Bot Commands

### tg me

Get bot information.

```bash
tg me
```

**Output:**
```json
{
  "ok": true,
  "result": {
    "id": 123456789,
    "is_bot": true,
    "first_name": "MyBot",
    "username": "MyBotUsername",
    "can_join_groups": true,
    "can_read_all_group_messages": false,
    "supports_inline_queries": false
  }
}
```

### tg config

Manage bot token configuration.

```bash
# Show current tokens
tg config token

# Set global token
tg config token <token>

# Set local token (current directory)
tg config token <token> --local

# Show config file paths
tg config path
```

**Priority:** Environment variable > Local config > Global config

## Update Commands

### tg updates poll

Poll for new updates (messages, callbacks, etc).

```bash
tg updates poll [options]
```

**Options:**
- `--timeout <seconds>` - Long polling timeout (0-60, default: 0)
- `--offset <id>` - Skip updates before this ID
- `--limit <count>` - Max updates to return (1-100, default: 100)

**Examples:**
```bash
# Immediate return
tg updates poll

# Wait up to 30 seconds
tg updates poll --timeout 30

# Get updates after ID 123
tg updates poll --offset 124

# Limit to 10 updates
tg updates poll --limit 10
```

### tg updates webhook

Manage webhook configuration.

```bash
# Set webhook
tg updates webhook set <url>

# Delete webhook
tg updates webhook delete

# Get webhook info
tg updates webhook info
```

## Message Commands

### tg message send

Send a text message.

```bash
tg message send <chat_id> <text> [options]
```

**Options:**
- `--reply-to <message_id>` - Reply to a specific message
- `--parse-mode <mode>` - Text formatting (HTML, Markdown, MarkdownV2)
- `--thread <thread_id>` - Send to a forum topic
- `--keyboard <json>` - Inline keyboard JSON

**Examples:**
```bash
# Simple message
tg message send 123456789 "Hello!"

# Reply to message
tg message send 123456789 "Thanks!" --reply-to 42

# HTML formatting
tg message send 123456789 "<b>Bold</b> and <i>italic</i>" --parse-mode HTML

# With inline keyboard
tg message send 123456789 "Choose:" --keyboard '[{"text":"Option 1","callback_data":"opt1"}]'
```

### tg message forward

Forward a message.

```bash
tg message forward <to_chat_id> <from_chat_id> <message_id>
```

### tg message edit

Edit a message.

```bash
tg message edit <chat_id> <message_id> <new_text> [options]
```

**Options:**
- `--parse-mode <mode>` - Text formatting

### tg message delete

Delete a message.

```bash
tg message delete <chat_id> <message_id>
```

### tg message copy

Copy a message.

```bash
tg message copy <to_chat_id> <from_chat_id> <message_id>
```

## Reaction Commands

### tg reaction set

Set a reaction on a message.

```bash
tg reaction set <chat_id> <message_id> <emoji>
```

**Supported emoji:** 👍 👎 ❤️ 🔥 🥰 👏 😁 🤔 🤯 😱 🤬 😢 🎉 🤩 🤮 💩 🙏 👌 🕊 🤡 🥱 🥴 😍 🐳 ❤️‍🔥 🌚 🌭 💯 🤣 ⚡ 🍌 🏆 💔 🤨 😐 🍓 🍾 💋 🖕 😈 😴 😭 🤓 👻 👨‍💻 👀 🎃 🙈 😇 😨 🤝 ✍️ 🤗 🫡 🎅 🎄 ☃️ 💅 🤪 🗿 🆒 💘 🙉 🦄 😘 💊 🙊 😎 👾 🤷‍♂️ 🤷 🤷‍♀️ 😡

## Media Commands

### tg photo send

Send a photo.

```bash
tg photo send <chat_id> <file_path> [options]
```

**Options:**
- `--caption <text>` - Photo caption
- `--parse-mode <mode>` - Caption formatting
- `--reply-to <message_id>` - Reply to message

### tg document send

Send a document/file.

```bash
tg document send <chat_id> <file_path> [options]
```

**Options:**
- `--caption <text>` - Document caption
- `--filename <name>` - Override filename

### tg video send

Send a video.

```bash
tg video send <chat_id> <file_path> [options]
```

### tg audio send

Send an audio file.

```bash
tg audio send <chat_id> <file_path> [options]
```

### tg voice send

Send a voice message.

```bash
tg voice send <chat_id> <file_path>
```

### tg sticker send

Send a sticker.

```bash
tg sticker send <chat_id> <sticker_id_or_path>
```

## File Commands

### tg file get

Get file information.

```bash
tg file get <file_id>
```

### tg file download

Download a file.

```bash
tg file download <file_id> <output_path>
```

## Chat Commands

### tg chat get

Get chat information.

```bash
tg chat get <chat_id>
```

### tg chat members

Get chat member count.

```bash
tg chat members <chat_id>
```

### tg chat admins

Get chat administrators.

```bash
tg chat admins <chat_id>
```

### tg chat member

Get specific member info.

```bash
tg chat member <chat_id> <user_id>
```

### tg chat leave

Leave a chat.

```bash
tg chat leave <chat_id>
```

### tg chat title

Set chat title.

```bash
tg chat title <chat_id> <new_title>
```

### tg chat description

Set chat description.

```bash
tg chat description <chat_id> <new_description>
```

## Poll Commands

### tg poll send

Send a poll.

```bash
tg poll send <chat_id> <question> <option1> <option2> [options...]
```

**Options:**
- `--anonymous` - Anonymous voting
- `--multiple` - Allow multiple answers
- `--quiz` - Quiz mode (one correct answer)
- `--correct <index>` - Correct answer index (for quiz)

### tg poll stop

Stop a poll.

```bash
tg poll stop <chat_id> <message_id>
```

## Location Commands

### tg location send

Send a location.

```bash
tg location send <chat_id> <latitude> <longitude>
```

### tg venue send

Send a venue.

```bash
tg venue send <chat_id> <latitude> <longitude> <title> <address>
```

## Contact Commands

### tg contact send

Send a contact.

```bash
tg contact send <chat_id> <phone_number> <first_name> [last_name]
```

## Action Commands

### tg action send

Send a chat action (typing indicator, etc).

```bash
tg action send <chat_id> <action>
```

**Actions:** typing, upload_photo, upload_video, upload_audio, upload_document, upload_voice, find_location, record_video, record_voice, record_video_note, upload_video_note, choose_sticker

## Pin Commands

### tg pin add

Pin a message.

```bash
tg pin add <chat_id> <message_id>
```

### tg pin remove

Unpin a message.

```bash
tg pin remove <chat_id> <message_id>
```

### tg pin clear

Unpin all messages.

```bash
tg pin clear <chat_id>
```

## Forum Commands

### tg forum topic create

Create a forum topic.

```bash
tg forum topic create <chat_id> <name> [--icon <emoji>]
```

### tg forum topic edit

Edit a forum topic.

```bash
tg forum topic edit <chat_id> <topic_id> <new_name>
```

### tg forum topic close

Close a forum topic.

```bash
tg forum topic close <chat_id> <topic_id>
```

### tg forum topic reopen

Reopen a forum topic.

```bash
tg forum topic reopen <chat_id> <topic_id>
```

### tg forum topic delete

Delete a forum topic.

```bash
tg forum topic delete <chat_id> <topic_id>
```

## Callback Commands

### tg callback answer

Answer a callback query.

```bash
tg callback answer <callback_query_id> [options]
```

**Options:**
- `--text <message>` - Notification text
- `--alert` - Show as alert popup
- `--url <url>` - URL to open

## Inline Commands

### tg inline answer

Answer an inline query.

```bash
tg inline answer <inline_query_id> <results_json>
```

## Bot Settings

### tg bot commands set

Set bot commands.

```bash
tg bot commands set <commands_json>
```

### tg bot commands get

Get bot commands.

```bash
tg bot commands get
```

### tg bot commands delete

Delete bot commands.

```bash
tg bot commands delete
```

### tg bot name set

Set bot name.

```bash
tg bot name set <name>
```

### tg bot description set

Set bot description.

```bash
tg bot description set <description>
```
