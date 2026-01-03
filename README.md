# Telecli

A thin, zero-dependency CLI wrapper around the Telegram Bot API. Built with Bun for speed and simplicity.

## Installation

### Global Install (Recommended)

```bash
# Install globally via bun
bun add -g telecli

# Or install directly from GitHub
bun add -g github:danizord/telecli
```

After installation, configure your token once:

```bash
tg config token YOUR_BOT_TOKEN
```

Then use the `tg` command from anywhere:

```bash
tg me
```

### From Source

```bash
git clone https://github.com/danizord/telecli.git
cd telecli
bun install
bun link  # Makes 'tg' available globally
```

## Usage

```bash
tg <command> [options]
```

## Quick Start

```bash
# Get bot info
bun run tg me

# Poll for updates
bun run tg updates poll --timeout 30

# Send a message
bun run tg message send <chat_id> "Hello, World!"

# Send a photo
bun run tg media photo <chat_id> /path/to/photo.jpg

# Create a poll
bun run tg poll send <chat_id> "What's your favorite?" '["Option 1", "Option 2"]'
```

## Commands

### Bot Info & Management
```bash
tg me                              # Get bot info
tg bot commands list               # List bot commands
tg bot commands set <json>         # Set bot commands
tg bot name get                    # Get bot name
tg bot description get             # Get bot description
```

### Updates
```bash
tg updates poll                    # Poll for updates
tg updates poll --timeout 30       # With long polling
tg updates poll --offset <n>       # Resume from offset
tg updates webhook info            # Get webhook info
tg updates webhook set <url>       # Set webhook
```

### Messages
```bash
tg message send <chat_id> <text>           # Send message
tg message send <chat_id> <text> --parse-mode HTML
tg message reply <chat_id> <msg_id> <text> # Reply
tg message forward <chat_id> <from> <id>   # Forward
tg message edit <chat_id> <msg_id> <text>  # Edit
tg message delete <chat_id> <msg_id>       # Delete
```

### Media
```bash
tg media photo <chat_id> <photo>           # Photo (path, URL, or file_id)
tg media video <chat_id> <video>           # Video
tg media audio <chat_id> <audio>           # Audio
tg media document <chat_id> <file>         # Document
tg media sticker <chat_id> <sticker>       # Sticker
tg media photo <chat_id> <photo> --caption "Caption here"
```

### Chats
```bash
tg chat info <chat_id>             # Get chat info
tg chat admins <chat_id>           # List admins
tg chat count <chat_id>            # Member count
tg chat leave <chat_id>            # Leave chat
```

### Members
```bash
tg member ban <chat_id> <user_id>          # Ban user
tg member unban <chat_id> <user_id>        # Unban user
tg member restrict <chat_id> <user_id> <json>
tg member promote <chat_id> <user_id> <json>
```

### Polls
```bash
tg poll send <chat_id> "Question?" '["A", "B", "C"]'
tg poll send <chat_id> "Quiz?" '["A", "B"]' --quiz --correct 0
tg poll stop <chat_id> <msg_id>
```

### Forum Topics
```bash
tg forum create <chat_id> "Topic Name"
tg forum close <chat_id> <topic_id>
tg forum reopen <chat_id> <topic_id>
tg forum delete <chat_id> <topic_id>
```

### Reactions & Pins
```bash
tg reaction <chat_id> <msg_id> "👍"
tg pin <chat_id> <msg_id>
tg unpin <chat_id> <msg_id>
```

### Files
```bash
tg file info <file_id>             # Get file info
tg file download <file_id> <path>  # Download file
tg photos <user_id>                # Get user profile photos
```

### Location & Contact
```bash
tg location <chat_id> <lat> <lon>
tg location <chat_id> <lat> <lon> --live 3600
tg contact <chat_id> "+1234567890" "John" "Doe"
tg dice <chat_id> 🎲
```

### Inline & Callbacks
```bash
tg inline answer <query_id> <results_json>
tg callback answer <query_id> "Text"
tg callback answer <query_id> "Alert!" --alert
```

### Payments
```bash
tg payment invoice <chat_id> "Title" "Desc" "payload" "USD" '[{"label":"Item","amount":1000}]'
tg payment stars                   # Get star transactions
```

## Output Format

All commands output JSON for easy parsing:

```json
{"ok": true, "result": {...}}
```

Errors:
```json
{"ok": false, "error": "description"}
```

## Configuration

### Token Setup (Recommended)

Store your token once:

```bash
tg config token YOUR_BOT_TOKEN
```

The token is saved to `~/.telecli/config.json`.

### Environment Variable (Alternative)

You can also use an environment variable:

```bash
export TELEGRAM_BOT_TOKEN="your_token_here"
```

The CLI checks the environment variable first, then falls back to the config file.

**Getting a bot token:**
1. Open Telegram and message [@BotFather](https://t.me/botfather)
2. Send `/newbot` and follow the prompts
3. Copy the token (looks like `123456789:ABCdefGHIjklmNOpqrsTUVwxyz`)

## Claude Code Plugin

This repo includes a Claude Code plugin that provides:

- **Skill**: Comprehensive telecli usage guide with command reference
- **Commands**: `/telegram-poll`, `/telegram-send`, `/telegram-status`
- **Hooks**: Automatic polling with Stop hook to prevent exit when messages pending

### Installation

Add this repo as a marketplace and install the plugin:

```bash
# In Claude Code, run:
/plugin marketplace add danizord/telecli
/plugin install telecli@danizord/telecli
```

Or install directly from GitHub:

```bash
/plugin install danizord/telecli
```

### Plugin Features

**Automatic Polling**: The Stop hook checks for pending Telegram updates before Claude exits. If new messages are waiting, Claude will continue processing them.

**Commands**:
- `/telegram-poll` - Start/stop polling loop
- `/telegram-send` - Quick message send
- `/telegram-status` - Show bot and polling status

**Skill**: Claude automatically learns how to use the `tg` CLI when you ask it to interact with Telegram.

### Plugin Structure

```
plugin/
├── .claude-plugin/
│   └── plugin.json        # Plugin manifest
├── commands/              # Slash commands
│   ├── telegram-poll.md
│   ├── telegram-send.md
│   └── telegram-status.md
├── hooks/
│   ├── hooks.json         # Hook configuration
│   └── scripts/           # Hook scripts
└── skills/
    └── telecli/
        ├── SKILL.md       # Main skill
        └── references/    # Command reference
```

## AI Agent Integration

This CLI is designed for AI agents to control Telegram bots:

- **JSON output**: Machine-readable responses for parsing
- **Simple commands**: One command per operation
- **Comprehensive coverage**: Full Telegram Bot API support
- **No dependencies**: Just Bun and the Telegram API

## License

MIT
