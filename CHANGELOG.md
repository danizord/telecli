# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-01-04

### Added

- Initial release of Telecli - a thin, zero-dependency CLI wrapper around the Telegram Bot API
- Full Telegram Bot API coverage:
  - Bot info and management (`tg me`, `tg bot commands`)
  - Update polling with long polling support (`tg updates poll`)
  - Webhook management (`tg updates webhook`)
  - Message operations (send, reply, forward, edit, delete)
  - Media sending (photo, video, audio, document, sticker)
  - Chat management (info, admins, member count)
  - Member moderation (ban, unban, restrict, promote)
  - Polls and quizzes
  - Forum topics management
  - Reactions and pins
  - File operations (info, download)
  - Location and contact sharing
  - Inline queries and callbacks
  - Payment and Star transactions
- Global installation support via `bun add -g telecli`
- Token configuration via `tg config token` (stored in `~/.telecli/config.json`)
- Environment variable support (`TELEGRAM_BOT_TOKEN`)
- JSON output format for easy parsing by AI agents and scripts
- Claude Code plugin with:
  - Skill for telecli usage guide
  - Slash commands (`/telegram-poll`, `/telegram-send`, `/telegram-status`)
  - Stop hook for automatic polling continuation
- Per-directory token configuration support
- GitHub Actions CI workflow with type checking, linting, and tests
- Modern tooling: tsgo, oxlint, oxfmt

[0.1.0]: https://github.com/danizord/telecli/releases/tag/v0.1.0
