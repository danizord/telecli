# Telecli Command Reference

## Bot Info & Management

| Command | Description |
|---------|-------------|
| `tg me` | Get bot info |
| `tg logout` | Log out from cloud Bot API server |
| `tg close` | Close the bot instance |
| `tg bot commands list` | List bot commands |
| `tg bot commands set <json>` | Set bot commands |
| `tg bot commands delete` | Delete bot commands |
| `tg bot name get` | Get bot name |
| `tg bot name set <name>` | Set bot name |
| `tg bot description get` | Get bot description |
| `tg bot description set <text>` | Set bot description |

## Updates

| Command | Description |
|---------|-------------|
| `tg updates poll` | Poll for updates |
| `tg updates poll --timeout <n>` | With long polling timeout |
| `tg updates poll --offset <n>` | Resume from offset |
| `tg updates poll --limit <n>` | Max updates (1-100) |
| `tg updates webhook info` | Get webhook info |
| `tg updates webhook set <url>` | Set webhook |
| `tg updates webhook delete` | Delete webhook |

## Messages

| Command | Description |
|---------|-------------|
| `tg message send <chat_id> <text>` | Send message |
| `tg message send ... --thread <id>` | To forum topic |
| `tg message send ... --parse-mode <mode>` | HTML, Markdown, MarkdownV2 |
| `tg message send ... --reply-to <id>` | Reply to message |
| `tg message send ... --keyboard <json>` | Inline keyboard |
| `tg message reply <chat_id> <msg_id> <text>` | Reply to message |
| `tg message forward <chat_id> <from_chat_id> <msg_id>` | Forward message |
| `tg message forward-batch <chat_id> <from> <ids...>` | Forward multiple |
| `tg message copy <chat_id> <from_chat_id> <msg_id>` | Copy message |
| `tg message edit <chat_id> <msg_id> <text>` | Edit message |
| `tg message edit-caption <chat_id> <msg_id> <caption>` | Edit caption |
| `tg message delete <chat_id> <msg_id>` | Delete message |
| `tg message delete-batch <chat_id> <ids...>` | Delete multiple |

## Media

| Command | Description |
|---------|-------------|
| `tg media photo <chat_id> <photo>` | Send photo (path/URL/file_id) |
| `tg media video <chat_id> <video>` | Send video |
| `tg media audio <chat_id> <audio>` | Send audio |
| `tg media document <chat_id> <file>` | Send document |
| `tg media voice <chat_id> <voice>` | Send voice |
| `tg media sticker <chat_id> <sticker>` | Send sticker |
| `tg media animation <chat_id> <gif>` | Send animation/GIF |
| `tg media videonote <chat_id> <video>` | Send video note |
| `tg media group <chat_id> <json>` | Send media group |
| All media support `--caption <text>` | Add caption |

## Files

| Command | Description |
|---------|-------------|
| `tg file info <file_id>` | Get file info and download URL |
| `tg file download <file_id> <path>` | Download file |
| `tg photos <user_id>` | Get user profile photos |

## Chats

| Command | Description |
|---------|-------------|
| `tg chat info <chat_id>` | Get chat info |
| `tg chat admins <chat_id>` | Get administrators |
| `tg chat count <chat_id>` | Get member count |
| `tg chat member <chat_id> <user_id>` | Get member info |
| `tg chat leave <chat_id>` | Leave chat |
| `tg chat title <chat_id> <title>` | Set title |
| `tg chat description <chat_id> [text]` | Set description |
| `tg chat photo <chat_id> <path>` | Set chat photo |
| `tg chat photo-delete <chat_id>` | Delete chat photo |
| `tg chat permissions <chat_id> <json>` | Set permissions |

## Members

| Command | Description |
|---------|-------------|
| `tg member ban <chat_id> <user_id>` | Ban user |
| `tg member unban <chat_id> <user_id>` | Unban user |
| `tg member restrict <chat_id> <user_id> <json>` | Restrict user |
| `tg member promote <chat_id> <user_id> <json>` | Promote user |
| `tg member title <chat_id> <user_id> <title>` | Set admin title |

## Invite Links

| Command | Description |
|---------|-------------|
| `tg invite export <chat_id>` | Export invite link |
| `tg invite create <chat_id>` | Create invite link |
| `tg invite create ... --name <name>` | With name |
| `tg invite create ... --limit <n>` | With member limit |
| `tg invite edit <chat_id> <link>` | Edit link |
| `tg invite revoke <chat_id> <link>` | Revoke link |
| `tg invite approve <chat_id> <user_id>` | Approve join request |
| `tg invite decline <chat_id> <user_id>` | Decline join request |

## Forum Topics

| Command | Description |
|---------|-------------|
| `tg forum icons` | Get topic icon stickers |
| `tg forum create <chat_id> <name>` | Create topic |
| `tg forum edit <chat_id> <topic_id> <name>` | Edit topic |
| `tg forum close <chat_id> <topic_id>` | Close topic |
| `tg forum reopen <chat_id> <topic_id>` | Reopen topic |
| `tg forum delete <chat_id> <topic_id>` | Delete topic |
| `tg forum general close <chat_id>` | Close general topic |
| `tg forum general reopen <chat_id>` | Reopen general topic |

## Reactions & Pins

| Command | Description |
|---------|-------------|
| `tg reaction <chat_id> <msg_id> <emoji>` | Set reaction |
| `tg reaction clear <chat_id> <msg_id>` | Clear reactions |
| `tg pin <chat_id> <msg_id>` | Pin message |
| `tg unpin <chat_id> [msg_id]` | Unpin message(s) |

## Polls

| Command | Description |
|---------|-------------|
| `tg poll send <chat_id> <question> <options_json>` | Send poll |
| `tg poll send ... --quiz` | Quiz mode |
| `tg poll send ... --correct <n>` | Correct option index |
| `tg poll send ... --anonymous` | Anonymous poll |
| `tg poll stop <chat_id> <msg_id>` | Stop poll |

## Location & Contact

| Command | Description |
|---------|-------------|
| `tg location <chat_id> <lat> <lon>` | Send location |
| `tg location ... --live <seconds>` | Live location |
| `tg venue <chat_id> <lat> <lon> <title> <address>` | Send venue |
| `tg contact <chat_id> <phone> <first_name> [last]` | Send contact |
| `tg dice <chat_id> [emoji]` | Send dice |
| `tg action <chat_id> <action>` | Send chat action |

## Stickers

| Command | Description |
|---------|-------------|
| `tg sticker set <name>` | Get sticker set |
| `tg sticker upload <user_id> <path> <format>` | Upload sticker |
| `tg sticker create-set <user_id> <name> <title> <json>` | Create set |
| `tg sticker add <user_id> <name> <json>` | Add to set |
| `tg sticker delete <sticker>` | Delete from set |
| `tg sticker delete-set <name>` | Delete entire set |

## Inline Mode

| Command | Description |
|---------|-------------|
| `tg inline answer <query_id> <results_json>` | Answer inline query |
| `tg inline webapp <query_id> <result_json>` | Web app answer |

## Callbacks

| Command | Description |
|---------|-------------|
| `tg callback answer <query_id> [text]` | Answer callback |
| `tg callback answer ... --alert` | Show alert |
| `tg callback answer ... --url <url>` | Open URL |

## Payments

| Command | Description |
|---------|-------------|
| `tg payment invoice <chat> <title> <desc> <payload> <currency> <prices>` | Send invoice |
| `tg payment link <title> <desc> <payload> <currency> <prices>` | Create payment link |
| `tg payment shipping <query_id> <ok> [options]` | Answer shipping |
| `tg payment precheckout <query_id> <ok> [error]` | Answer pre-checkout |
| `tg payment refund <user_id> <charge_id>` | Refund payment |
| `tg payment stars [offset] [limit]` | Get star transactions |

## Games

| Command | Description |
|---------|-------------|
| `tg game send <chat_id> <short_name>` | Send game |
| `tg game score <user> <score> --chat <id> --message <id>` | Set score |
| `tg game scores <user> --chat <id> --message <id>` | Get scores |

## Miscellaneous

| Command | Description |
|---------|-------------|
| `tg boosts <chat_id> <user_id>` | Get user chat boosts |
| `tg business <connection_id>` | Get business connection |
