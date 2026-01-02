#!/usr/bin/env bun

import { getMe } from "./commands/me";
import {
  getUpdates,
  setWebhook,
  deleteWebhook,
  getWebhookInfo,
} from "./commands/updates";
import {
  sendMessage,
  forwardMessage,
  forwardMessages,
  editMessageText,
  editMessageCaption,
  editMessageReplyMarkup,
  deleteMessage,
  deleteMessages,
  copyMessage,
  copyMessages,
} from "./commands/message";
import {
  getChat,
  getChatAdministrators,
  getChatMemberCount,
  getChatMember,
  leaveChat,
  setChatTitle,
  setChatDescription,
  banChatMember,
  unbanChatMember,
  restrictChatMember,
  promoteChatMember,
  setChatAdministratorCustomTitle,
  banChatSenderChat,
  unbanChatSenderChat,
  setChatPermissions,
  setChatPhoto,
  deleteChatPhoto,
  setChatStickerSet,
  deleteChatStickerSet,
} from "./commands/chat";
import {
  sendPhoto,
  sendVideo,
  sendAudio,
  sendDocument,
  sendVoice,
  sendSticker,
  sendAnimation,
  sendVideoNote,
  sendMediaGroup,
} from "./commands/media";
import { getFile, downloadFile } from "./commands/file";
import { setMessageReaction } from "./commands/reaction";
import {
  pinChatMessage,
  unpinChatMessage,
  unpinAllChatMessages,
} from "./commands/pin";
import {
  logOut,
  close,
  setMyCommands,
  deleteMyCommands,
  getMyCommands,
  setMyName,
  getMyName,
  setMyDescription,
  getMyDescription,
  setMyShortDescription,
  getMyShortDescription,
  setChatMenuButton,
  getChatMenuButton,
  setMyDefaultAdministratorRights,
  getMyDefaultAdministratorRights,
  getUserProfilePhotos,
} from "./commands/bot";
import { sendPoll, stopPoll } from "./commands/poll";
import {
  sendLocation,
  sendVenue,
  editMessageLiveLocation,
  stopMessageLiveLocation,
} from "./commands/location";
import { sendContact, sendDice, sendChatAction } from "./commands/contact";
import {
  getForumTopicIconStickers,
  createForumTopic,
  editForumTopic,
  closeForumTopic,
  reopenForumTopic,
  deleteForumTopic,
  unpinAllForumTopicMessages,
  editGeneralForumTopic,
  closeGeneralForumTopic,
  reopenGeneralForumTopic,
  hideGeneralForumTopic,
  unhideGeneralForumTopic,
  unpinAllGeneralForumTopicMessages,
} from "./commands/forum";
import {
  getStickerSet,
  getCustomEmojiStickers,
  uploadStickerFile,
  createNewStickerSet,
  addStickerToSet,
  setStickerPositionInSet,
  deleteStickerFromSet,
  replaceStickerInSet,
  setStickerEmojiList,
  setStickerKeywords,
  setStickerMaskPosition,
  setStickerSetTitle,
  setStickerSetThumbnail,
  setCustomEmojiStickerSetThumbnail,
  deleteStickerSet,
} from "./commands/sticker";
import { answerInlineQuery, answerWebAppQuery } from "./commands/inline";
import {
  sendInvoice,
  createInvoiceLink,
  answerShippingQuery,
  answerPreCheckoutQuery,
  refundStarPayment,
  getStarTransactions,
} from "./commands/payment";
import { sendGame, setGameScore, getGameHighScores } from "./commands/game";
import {
  answerCallbackQuery,
  getUserChatBoosts,
  getBusinessConnection,
} from "./commands/callback";
import {
  exportChatInviteLink,
  createChatInviteLink,
  editChatInviteLink,
  revokeChatInviteLink,
  approveChatJoinRequest,
  declineChatJoinRequest,
} from "./commands/invite";

function output(data: unknown) {
  console.log(JSON.stringify(data, null, 2));
}

function error(message: string) {
  console.error(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}

function usage() {
  console.log(`
Telegram Bot CLI - Full API Support

Usage: tg <command> [subcommand] [options]

═══════════════════════════════════════════════════════════════════════════════
BOT INFO & MANAGEMENT
═══════════════════════════════════════════════════════════════════════════════
  me                              Get bot info
  logout                          Log out from cloud Bot API server
  close                           Close the bot instance

  bot commands list               List bot commands
  bot commands set <json>         Set bot commands (JSON array)
  bot commands delete             Delete bot commands
  bot name get                    Get bot name
  bot name set <name>             Set bot name
  bot description get             Get bot description
  bot description set <text>      Set bot description
  bot shortdesc get               Get short description
  bot shortdesc set <text>        Set short description
  bot rights get                  Get default admin rights
  bot rights set <json>           Set default admin rights
  bot menu get [chat_id]          Get chat menu button
  bot menu set [chat_id] <json>   Set chat menu button

═══════════════════════════════════════════════════════════════════════════════
UPDATES
═══════════════════════════════════════════════════════════════════════════════
  updates poll [options]          Poll for updates
    --offset <n>                  Update offset
    --limit <n>                   Max updates (1-100)
    --timeout <n>                 Long polling timeout in seconds
  updates webhook info            Get webhook info
  updates webhook set <url>       Set webhook URL
  updates webhook delete          Delete webhook

═══════════════════════════════════════════════════════════════════════════════
MESSAGES
═══════════════════════════════════════════════════════════════════════════════
  message send <chat_id> <text>   Send a message
    --thread <id>                 Thread/topic ID
    --parse-mode <mode>           HTML, Markdown, or MarkdownV2
    --reply-to <id>               Reply to message ID
    --keyboard <json>             Inline keyboard JSON
  message reply <chat_id> <msg_id> <text>
  message forward <chat_id> <from_chat_id> <msg_id>
  message forward-batch <chat_id> <from_chat_id> <msg_ids...>
  message copy <chat_id> <from_chat_id> <msg_id>
  message copy-batch <chat_id> <from_chat_id> <msg_ids...>
  message edit <chat_id> <msg_id> <text>
  message edit-caption <chat_id> <msg_id> <caption>
  message delete <chat_id> <msg_id>
  message delete-batch <chat_id> <msg_ids...>

═══════════════════════════════════════════════════════════════════════════════
MEDIA
═══════════════════════════════════════════════════════════════════════════════
  media photo <chat_id> <photo>   Send photo (path, URL, or file_id)
  media video <chat_id> <video>   Send video
  media audio <chat_id> <audio>   Send audio
  media document <chat_id> <file> Send document
  media voice <chat_id> <voice>   Send voice
  media sticker <chat_id> <sticker>
  media animation <chat_id> <gif> Send animation/GIF
  media videonote <chat_id> <video_note>
  media group <chat_id> <json>    Send media group (JSON array)
    --caption <text>              Caption for media

═══════════════════════════════════════════════════════════════════════════════
FILES
═══════════════════════════════════════════════════════════════════════════════
  file info <file_id>             Get file info and download URL
  file download <file_id> <path>  Download a file

═══════════════════════════════════════════════════════════════════════════════
CHATS
═══════════════════════════════════════════════════════════════════════════════
  chat info <chat_id>             Get chat info
  chat admins <chat_id>           Get administrators
  chat count <chat_id>            Get member count
  chat member <chat_id> <user_id> Get member info
  chat leave <chat_id>            Leave chat
  chat title <chat_id> <title>    Set title
  chat description <chat_id> [text]
  chat photo <chat_id> <path>     Set chat photo
  chat photo-delete <chat_id>     Delete chat photo
  chat permissions <chat_id> <json>
  chat stickerset <chat_id> <name>
  chat stickerset-delete <chat_id>

═══════════════════════════════════════════════════════════════════════════════
MEMBERS
═══════════════════════════════════════════════════════════════════════════════
  member ban <chat_id> <user_id>
  member unban <chat_id> <user_id>
  member restrict <chat_id> <user_id> <permissions_json>
  member promote <chat_id> <user_id> <rights_json>
  member title <chat_id> <user_id> <title>
  member ban-chat <chat_id> <sender_chat_id>
  member unban-chat <chat_id> <sender_chat_id>

═══════════════════════════════════════════════════════════════════════════════
INVITE LINKS
═══════════════════════════════════════════════════════════════════════════════
  invite export <chat_id>         Export invite link
  invite create <chat_id>         Create invite link
    --name <name>                 Link name
    --expire <timestamp>          Expiration date
    --limit <n>                   Member limit
  invite edit <chat_id> <link>    Edit invite link
  invite revoke <chat_id> <link>  Revoke invite link
  invite approve <chat_id> <user_id>
  invite decline <chat_id> <user_id>

═══════════════════════════════════════════════════════════════════════════════
FORUM TOPICS
═══════════════════════════════════════════════════════════════════════════════
  forum icons                     Get topic icon stickers
  forum create <chat_id> <name>   Create topic
  forum edit <chat_id> <topic_id> <name>
  forum close <chat_id> <topic_id>
  forum reopen <chat_id> <topic_id>
  forum delete <chat_id> <topic_id>
  forum unpin-all <chat_id> <topic_id>
  forum general edit <chat_id> <name>
  forum general close <chat_id>
  forum general reopen <chat_id>
  forum general hide <chat_id>
  forum general unhide <chat_id>

═══════════════════════════════════════════════════════════════════════════════
PINS & REACTIONS
═══════════════════════════════════════════════════════════════════════════════
  pin <chat_id> <msg_id>          Pin message
  unpin <chat_id> [msg_id]        Unpin message(s)
  reaction <chat_id> <msg_id> <emoji>
  reaction clear <chat_id> <msg_id>

═══════════════════════════════════════════════════════════════════════════════
LOCATION & CONTACT
═══════════════════════════════════════════════════════════════════════════════
  location <chat_id> <lat> <lon>  Send location
    --live <seconds>              Live period
  venue <chat_id> <lat> <lon> <title> <address>
  contact <chat_id> <phone> <first_name> [last_name]
  dice <chat_id> [emoji]          Send dice (🎲🎯🏀⚽🎳🎰)
  action <chat_id> <action>       Send chat action

═══════════════════════════════════════════════════════════════════════════════
POLLS
═══════════════════════════════════════════════════════════════════════════════
  poll send <chat_id> <question> <options_json>
    --quiz                        Quiz mode
    --correct <n>                 Correct option index
    --anonymous                   Anonymous poll
  poll stop <chat_id> <msg_id>    Stop poll

═══════════════════════════════════════════════════════════════════════════════
STICKERS
═══════════════════════════════════════════════════════════════════════════════
  sticker set <name>              Get sticker set
  sticker emojis <ids_json>       Get custom emoji stickers
  sticker upload <user_id> <path> <format>
  sticker create-set <user_id> <name> <title> <stickers_json>
  sticker add <user_id> <name> <sticker_json>
  sticker position <sticker> <pos>
  sticker delete <sticker>        Delete from set
  sticker replace <user_id> <name> <old> <new_json>
  sticker set-emoji <sticker> <emojis_json>
  sticker set-keywords <sticker> <keywords_json>
  sticker set-title <name> <title>
  sticker delete-set <name>       Delete entire set

═══════════════════════════════════════════════════════════════════════════════
INLINE MODE
═══════════════════════════════════════════════════════════════════════════════
  inline answer <query_id> <results_json>
  inline webapp <query_id> <result_json>

═══════════════════════════════════════════════════════════════════════════════
PAYMENTS
═══════════════════════════════════════════════════════════════════════════════
  payment invoice <chat_id> <title> <desc> <payload> <currency> <prices_json>
  payment link <title> <desc> <payload> <currency> <prices_json>
  payment shipping <query_id> <ok> [options_json]
  payment precheckout <query_id> <ok> [error]
  payment refund <user_id> <charge_id>
  payment stars [offset] [limit]  Get star transactions

═══════════════════════════════════════════════════════════════════════════════
GAMES
═══════════════════════════════════════════════════════════════════════════════
  game send <chat_id> <short_name>
  game score <user_id> <score> --chat <id> --message <id>
  game scores <user_id> --chat <id> --message <id>

═══════════════════════════════════════════════════════════════════════════════
CALLBACKS & MISC
═══════════════════════════════════════════════════════════════════════════════
  callback answer <query_id> [text]
    --alert                       Show alert
    --url <url>                   URL to open
  boosts <chat_id> <user_id>      Get user chat boosts
  business <connection_id>        Get business connection
  photos <user_id>                Get user profile photos

Environment:
  TELEGRAM_BOT_TOKEN              Bot token (required)
`);
}

function parseArgs(args: string[]): { flags: Record<string, string>; positional: string[] } {
  const flags: Record<string, string> = {};
  const positional: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const value = args[++i];
      if (value === undefined) {
        // Boolean flag
        flags[key] = "true";
        i--;
      } else if (value.startsWith("--")) {
        // Boolean flag followed by another flag
        flags[key] = "true";
        i--;
      } else {
        flags[key] = value;
      }
    } else {
      positional.push(arg);
    }
  }

  return { flags, positional };
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === "help" || args[0] === "--help") {
    usage();
    process.exit(0);
  }

  const command = args[0];
  const subArgs = args.slice(1);
  const { flags, positional } = parseArgs(subArgs);

  try {
    switch (command) {
      case "me": {
        output(await getMe());
        break;
      }

      case "logout": {
        output(await logOut());
        break;
      }

      case "close": {
        output(await close());
        break;
      }

      case "bot": {
        const sub = positional[0];
        switch (sub) {
          case "commands": {
            const action = positional[1];
            switch (action) {
              case "list":
                output(await getMyCommands({}));
                break;
              case "set": {
                const cmds = JSON.parse(positional[2]);
                output(await setMyCommands({ commands: cmds }));
                break;
              }
              case "delete":
                output(await deleteMyCommands({}));
                break;
              default:
                error("Usage: tg bot commands <list|set|delete>");
            }
            break;
          }
          case "name": {
            const action = positional[1];
            if (action === "get") {
              output(await getMyName({}));
            } else if (action === "set") {
              output(await setMyName({ name: positional[2] }));
            } else {
              error("Usage: tg bot name <get|set>");
            }
            break;
          }
          case "description": {
            const action = positional[1];
            if (action === "get") {
              output(await getMyDescription({}));
            } else if (action === "set") {
              output(await setMyDescription({ description: positional[2] }));
            } else {
              error("Usage: tg bot description <get|set>");
            }
            break;
          }
          case "shortdesc": {
            const action = positional[1];
            if (action === "get") {
              output(await getMyShortDescription({}));
            } else if (action === "set") {
              output(await setMyShortDescription({ short_description: positional[2] }));
            } else {
              error("Usage: tg bot shortdesc <get|set>");
            }
            break;
          }
          case "rights": {
            const action = positional[1];
            if (action === "get") {
              output(await getMyDefaultAdministratorRights({}));
            } else if (action === "set") {
              output(await setMyDefaultAdministratorRights({ rights: JSON.parse(positional[2]) }));
            } else {
              error("Usage: tg bot rights <get|set>");
            }
            break;
          }
          case "menu": {
            const action = positional[1];
            if (action === "get") {
              output(await getChatMenuButton({ chat_id: positional[2] }));
            } else if (action === "set") {
              output(await setChatMenuButton({ chat_id: positional[2], menu_button: JSON.parse(positional[3]) }));
            } else {
              error("Usage: tg bot menu <get|set>");
            }
            break;
          }
          default:
            error("Usage: tg bot <commands|name|description|shortdesc|rights|menu>");
        }
        break;
      }

      case "updates": {
        const subcommand = positional[0];
        switch (subcommand) {
          case "poll": {
            output(
              await getUpdates({
                offset: flags.offset ? parseInt(flags.offset) : undefined,
                limit: flags.limit ? parseInt(flags.limit) : undefined,
                timeout: flags.timeout ? parseInt(flags.timeout) : undefined,
              })
            );
            break;
          }
          case "webhook": {
            const action = positional[1];
            switch (action) {
              case "info":
                output(await getWebhookInfo());
                break;
              case "set": {
                const url = positional[2];
                if (!url) error("Usage: tg updates webhook set <url>");
                output(await setWebhook({ url }));
                break;
              }
              case "delete":
                output(await deleteWebhook());
                break;
              default:
                error("Usage: tg updates webhook <info|set|delete>");
            }
            break;
          }
          default:
            error("Usage: tg updates <poll|webhook>");
        }
        break;
      }

      case "message": {
        const subcommand = positional[0];
        switch (subcommand) {
          case "send": {
            const chatId = positional[1];
            const text = positional[2];
            if (!chatId || !text) error("Usage: tg message send <chat_id> <text>");
            const opts: Parameters<typeof sendMessage>[0] = {
              chat_id: chatId,
              text,
              message_thread_id: flags.thread ? parseInt(flags.thread) : undefined,
              parse_mode: flags["parse-mode"] as "HTML" | "Markdown" | "MarkdownV2" | undefined,
              reply_to_message_id: flags["reply-to"] ? parseInt(flags["reply-to"]) : undefined,
            };
            if (flags.keyboard) {
              (opts as Record<string, unknown>).reply_markup = JSON.parse(flags.keyboard);
            }
            output(await sendMessage(opts));
            break;
          }
          case "reply": {
            const chatId = positional[1];
            const messageId = positional[2];
            const text = positional[3];
            if (!chatId || !messageId || !text) {
              error("Usage: tg message reply <chat_id> <message_id> <text>");
            }
            output(
              await sendMessage({
                chat_id: chatId,
                text,
                reply_to_message_id: parseInt(messageId),
                parse_mode: flags["parse-mode"] as "HTML" | "Markdown" | "MarkdownV2" | undefined,
              })
            );
            break;
          }
          case "forward": {
            const chatId = positional[1];
            const fromChatId = positional[2];
            const messageId = positional[3];
            if (!chatId || !fromChatId || !messageId) {
              error("Usage: tg message forward <chat_id> <from_chat_id> <message_id>");
            }
            output(
              await forwardMessage({
                chat_id: chatId,
                from_chat_id: fromChatId,
                message_id: parseInt(messageId),
              })
            );
            break;
          }
          case "forward-batch": {
            const chatId = positional[1];
            const fromChatId = positional[2];
            const messageIds = positional.slice(3).map(Number);
            if (!chatId || !fromChatId || messageIds.length === 0) {
              error("Usage: tg message forward-batch <chat_id> <from_chat_id> <msg_ids...>");
            }
            output(
              await forwardMessages({
                chat_id: chatId,
                from_chat_id: fromChatId,
                message_ids: messageIds,
              })
            );
            break;
          }
          case "edit": {
            const chatId = positional[1];
            const messageId = positional[2];
            const text = positional[3];
            if (!chatId || !messageId || !text) {
              error("Usage: tg message edit <chat_id> <message_id> <text>");
            }
            output(
              await editMessageText({
                chat_id: chatId,
                message_id: parseInt(messageId),
                text,
                parse_mode: flags["parse-mode"] as "HTML" | "Markdown" | "MarkdownV2" | undefined,
              })
            );
            break;
          }
          case "edit-caption": {
            const chatId = positional[1];
            const messageId = positional[2];
            const caption = positional[3];
            if (!chatId || !messageId) {
              error("Usage: tg message edit-caption <chat_id> <message_id> <caption>");
            }
            output(
              await editMessageCaption({
                chat_id: chatId,
                message_id: parseInt(messageId),
                caption,
                parse_mode: flags["parse-mode"] as "HTML" | "Markdown" | "MarkdownV2" | undefined,
              })
            );
            break;
          }
          case "delete": {
            const chatId = positional[1];
            const messageId = positional[2];
            if (!chatId || !messageId) {
              error("Usage: tg message delete <chat_id> <message_id>");
            }
            output(
              await deleteMessage({
                chat_id: chatId,
                message_id: parseInt(messageId),
              })
            );
            break;
          }
          case "delete-batch": {
            const chatId = positional[1];
            const messageIds = positional.slice(2).map(Number);
            if (!chatId || messageIds.length === 0) {
              error("Usage: tg message delete-batch <chat_id> <msg_ids...>");
            }
            output(
              await deleteMessages({
                chat_id: chatId,
                message_ids: messageIds,
              })
            );
            break;
          }
          case "copy": {
            const chatId = positional[1];
            const fromChatId = positional[2];
            const messageId = positional[3];
            if (!chatId || !fromChatId || !messageId) {
              error("Usage: tg message copy <chat_id> <from_chat_id> <message_id>");
            }
            output(
              await copyMessage({
                chat_id: chatId,
                from_chat_id: fromChatId,
                message_id: parseInt(messageId),
              })
            );
            break;
          }
          case "copy-batch": {
            const chatId = positional[1];
            const fromChatId = positional[2];
            const messageIds = positional.slice(3).map(Number);
            if (!chatId || !fromChatId || messageIds.length === 0) {
              error("Usage: tg message copy-batch <chat_id> <from_chat_id> <msg_ids...>");
            }
            output(
              await copyMessages({
                chat_id: chatId,
                from_chat_id: fromChatId,
                message_ids: messageIds,
              })
            );
            break;
          }
          default:
            error("Usage: tg message <send|reply|forward|edit|delete|copy|...>");
        }
        break;
      }

      case "chat": {
        const subcommand = positional[0];
        const chatId = positional[1];
        if (!chatId && subcommand !== undefined) {
          error("Chat ID is required");
        }
        switch (subcommand) {
          case "info":
            output(await getChat(chatId));
            break;
          case "admins":
            output(await getChatAdministrators(chatId));
            break;
          case "count":
            output(await getChatMemberCount(chatId));
            break;
          case "member": {
            const userId = positional[2];
            if (!userId) error("Usage: tg chat member <chat_id> <user_id>");
            output(await getChatMember(chatId, parseInt(userId)));
            break;
          }
          case "leave":
            output(await leaveChat(chatId));
            break;
          case "title": {
            const title = positional[2];
            if (!title) error("Usage: tg chat title <chat_id> <title>");
            output(await setChatTitle({ chat_id: chatId, title }));
            break;
          }
          case "description": {
            const description = positional[2];
            output(await setChatDescription({ chat_id: chatId, description }));
            break;
          }
          case "photo": {
            const path = positional[2];
            if (!path) error("Usage: tg chat photo <chat_id> <path>");
            output(await setChatPhoto(chatId, path));
            break;
          }
          case "photo-delete":
            output(await deleteChatPhoto(chatId));
            break;
          case "permissions": {
            const perms = JSON.parse(positional[2]);
            output(await setChatPermissions({ chat_id: chatId, permissions: perms }));
            break;
          }
          case "stickerset": {
            const name = positional[2];
            if (!name) error("Usage: tg chat stickerset <chat_id> <name>");
            output(await setChatStickerSet(chatId, name));
            break;
          }
          case "stickerset-delete":
            output(await deleteChatStickerSet(chatId));
            break;
          default:
            error("Usage: tg chat <info|admins|count|member|leave|title|...>");
        }
        break;
      }

      case "member": {
        const sub = positional[0];
        const chatId = positional[1];
        const userId = positional[2];
        switch (sub) {
          case "ban":
            output(await banChatMember({ chat_id: chatId, user_id: parseInt(userId) }));
            break;
          case "unban":
            output(await unbanChatMember({ chat_id: chatId, user_id: parseInt(userId) }));
            break;
          case "restrict": {
            const perms = JSON.parse(positional[3]);
            output(await restrictChatMember({ chat_id: chatId, user_id: parseInt(userId), permissions: perms }));
            break;
          }
          case "promote": {
            const rights = JSON.parse(positional[3]);
            output(await promoteChatMember({ chat_id: chatId, user_id: parseInt(userId), ...rights }));
            break;
          }
          case "title": {
            const title = positional[3];
            output(await setChatAdministratorCustomTitle({ chat_id: chatId, user_id: parseInt(userId), custom_title: title }));
            break;
          }
          case "ban-chat":
            output(await banChatSenderChat({ chat_id: chatId, sender_chat_id: parseInt(userId) }));
            break;
          case "unban-chat":
            output(await unbanChatSenderChat({ chat_id: chatId, sender_chat_id: parseInt(userId) }));
            break;
          default:
            error("Usage: tg member <ban|unban|restrict|promote|title|ban-chat|unban-chat>");
        }
        break;
      }

      case "media": {
        const subcommand = positional[0];
        const chatId = positional[1];
        const file = positional[2];
        if (!chatId || (!file && subcommand !== "group")) {
          error("Usage: tg media <photo|video|...> <chat_id> <file>");
        }
        const caption = flags.caption;
        const parseMode = flags["parse-mode"] as "HTML" | "Markdown" | "MarkdownV2" | undefined;
        const threadId = flags.thread ? parseInt(flags.thread) : undefined;

        switch (subcommand) {
          case "photo":
            output(await sendPhoto({ chat_id: chatId, photo: file, caption, parse_mode: parseMode, message_thread_id: threadId }));
            break;
          case "video":
            output(await sendVideo({ chat_id: chatId, video: file, caption, parse_mode: parseMode, message_thread_id: threadId }));
            break;
          case "audio":
            output(await sendAudio({ chat_id: chatId, audio: file, caption, parse_mode: parseMode, message_thread_id: threadId }));
            break;
          case "document":
            output(await sendDocument({ chat_id: chatId, document: file, caption, parse_mode: parseMode, message_thread_id: threadId }));
            break;
          case "voice":
            output(await sendVoice({ chat_id: chatId, voice: file, caption, parse_mode: parseMode, message_thread_id: threadId }));
            break;
          case "sticker":
            output(await sendSticker({ chat_id: chatId, sticker: file, message_thread_id: threadId }));
            break;
          case "animation":
            output(await sendAnimation({ chat_id: chatId, animation: file, caption, parse_mode: parseMode, message_thread_id: threadId }));
            break;
          case "videonote":
            output(await sendVideoNote({ chat_id: chatId, video_note: file, message_thread_id: threadId }));
            break;
          case "group": {
            const media = JSON.parse(positional[2]);
            output(await sendMediaGroup({ chat_id: chatId, media, message_thread_id: threadId }));
            break;
          }
          default:
            error("Usage: tg media <photo|video|audio|document|voice|sticker|animation|videonote|group>");
        }
        break;
      }

      case "file": {
        const subcommand = positional[0];
        switch (subcommand) {
          case "info": {
            const fileId = positional[1];
            if (!fileId) error("Usage: tg file info <file_id>");
            output(await getFile(fileId));
            break;
          }
          case "download": {
            const fileId = positional[1];
            const outputPath = positional[2];
            if (!fileId || !outputPath) {
              error("Usage: tg file download <file_id> <output_path>");
            }
            output(await downloadFile(fileId, outputPath));
            break;
          }
          default:
            error("Usage: tg file <info|download>");
        }
        break;
      }

      case "invite": {
        const sub = positional[0];
        const chatId = positional[1];
        switch (sub) {
          case "export":
            output(await exportChatInviteLink(chatId));
            break;
          case "create":
            output(await createChatInviteLink({
              chat_id: chatId,
              name: flags.name,
              expire_date: flags.expire ? parseInt(flags.expire) : undefined,
              member_limit: flags.limit ? parseInt(flags.limit) : undefined,
            }));
            break;
          case "edit": {
            const link = positional[2];
            output(await editChatInviteLink({
              chat_id: chatId,
              invite_link: link,
              name: flags.name,
              expire_date: flags.expire ? parseInt(flags.expire) : undefined,
              member_limit: flags.limit ? parseInt(flags.limit) : undefined,
            }));
            break;
          }
          case "revoke": {
            const link = positional[2];
            output(await revokeChatInviteLink({ chat_id: chatId, invite_link: link }));
            break;
          }
          case "approve": {
            const userId = positional[2];
            output(await approveChatJoinRequest({ chat_id: chatId, user_id: parseInt(userId) }));
            break;
          }
          case "decline": {
            const userId = positional[2];
            output(await declineChatJoinRequest({ chat_id: chatId, user_id: parseInt(userId) }));
            break;
          }
          default:
            error("Usage: tg invite <export|create|edit|revoke|approve|decline>");
        }
        break;
      }

      case "forum": {
        const sub = positional[0];
        switch (sub) {
          case "icons":
            output(await getForumTopicIconStickers());
            break;
          case "create": {
            const chatId = positional[1];
            const name = positional[2];
            output(await createForumTopic({ chat_id: chatId, name }));
            break;
          }
          case "edit": {
            const chatId = positional[1];
            const topicId = parseInt(positional[2]);
            const name = positional[3];
            output(await editForumTopic({ chat_id: chatId, message_thread_id: topicId, name }));
            break;
          }
          case "close": {
            const chatId = positional[1];
            const topicId = parseInt(positional[2]);
            output(await closeForumTopic({ chat_id: chatId, message_thread_id: topicId }));
            break;
          }
          case "reopen": {
            const chatId = positional[1];
            const topicId = parseInt(positional[2]);
            output(await reopenForumTopic({ chat_id: chatId, message_thread_id: topicId }));
            break;
          }
          case "delete": {
            const chatId = positional[1];
            const topicId = parseInt(positional[2]);
            output(await deleteForumTopic({ chat_id: chatId, message_thread_id: topicId }));
            break;
          }
          case "unpin-all": {
            const chatId = positional[1];
            const topicId = parseInt(positional[2]);
            output(await unpinAllForumTopicMessages({ chat_id: chatId, message_thread_id: topicId }));
            break;
          }
          case "general": {
            const action = positional[1];
            const chatId = positional[2];
            switch (action) {
              case "edit":
                output(await editGeneralForumTopic({ chat_id: chatId, name: positional[3] }));
                break;
              case "close":
                output(await closeGeneralForumTopic(chatId));
                break;
              case "reopen":
                output(await reopenGeneralForumTopic(chatId));
                break;
              case "hide":
                output(await hideGeneralForumTopic(chatId));
                break;
              case "unhide":
                output(await unhideGeneralForumTopic(chatId));
                break;
              default:
                error("Usage: tg forum general <edit|close|reopen|hide|unhide>");
            }
            break;
          }
          default:
            error("Usage: tg forum <icons|create|edit|close|reopen|delete|unpin-all|general>");
        }
        break;
      }

      case "reaction": {
        const chatId = positional[0];
        const messageId = positional[1];

        if (chatId === "clear") {
          const actualChatId = positional[1];
          const actualMessageId = positional[2];
          if (!actualChatId || !actualMessageId) {
            error("Usage: tg reaction clear <chat_id> <message_id>");
          }
          output(
            await setMessageReaction({
              chat_id: actualChatId,
              message_id: parseInt(actualMessageId),
              reaction: [],
            })
          );
        } else {
          const emoji = positional[2];
          if (!chatId || !messageId || !emoji) {
            error("Usage: tg reaction <chat_id> <message_id> <emoji>");
          }
          output(
            await setMessageReaction({
              chat_id: chatId,
              message_id: parseInt(messageId),
              reaction: [{ type: "emoji", emoji }],
            })
          );
        }
        break;
      }

      case "pin": {
        const chatId = positional[0];
        const messageId = positional[1];
        if (!chatId || !messageId) {
          error("Usage: tg pin <chat_id> <message_id>");
        }
        output(await pinChatMessage({ chat_id: chatId, message_id: parseInt(messageId) }));
        break;
      }

      case "unpin": {
        const chatId = positional[0];
        const messageId = positional[1];
        if (!chatId) {
          error("Usage: tg unpin <chat_id> [message_id]");
        }
        if (messageId) {
          output(await unpinChatMessage({ chat_id: chatId, message_id: parseInt(messageId) }));
        } else {
          output(await unpinAllChatMessages(chatId));
        }
        break;
      }

      case "location": {
        const chatId = positional[0];
        const lat = parseFloat(positional[1]);
        const lon = parseFloat(positional[2]);
        if (!chatId || isNaN(lat) || isNaN(lon)) {
          error("Usage: tg location <chat_id> <lat> <lon>");
        }
        output(await sendLocation({
          chat_id: chatId,
          latitude: lat,
          longitude: lon,
          live_period: flags.live ? parseInt(flags.live) : undefined,
        }));
        break;
      }

      case "venue": {
        const chatId = positional[0];
        const lat = parseFloat(positional[1]);
        const lon = parseFloat(positional[2]);
        const title = positional[3];
        const address = positional[4];
        if (!chatId || isNaN(lat) || isNaN(lon) || !title || !address) {
          error("Usage: tg venue <chat_id> <lat> <lon> <title> <address>");
        }
        output(await sendVenue({
          chat_id: chatId,
          latitude: lat,
          longitude: lon,
          title,
          address,
        }));
        break;
      }

      case "contact": {
        const chatId = positional[0];
        const phone = positional[1];
        const firstName = positional[2];
        const lastName = positional[3];
        if (!chatId || !phone || !firstName) {
          error("Usage: tg contact <chat_id> <phone> <first_name> [last_name]");
        }
        output(await sendContact({
          chat_id: chatId,
          phone_number: phone,
          first_name: firstName,
          last_name: lastName,
        }));
        break;
      }

      case "dice": {
        const chatId = positional[0];
        const emoji = positional[1] as "🎲" | "🎯" | "🏀" | "⚽" | "🎳" | "🎰" | undefined;
        if (!chatId) {
          error("Usage: tg dice <chat_id> [emoji]");
        }
        output(await sendDice({ chat_id: chatId, emoji }));
        break;
      }

      case "action": {
        const chatId = positional[0];
        const action = positional[1];
        if (!chatId || !action) {
          error("Usage: tg action <chat_id> <action>");
        }
        output(await sendChatAction({ chat_id: chatId, action: action as Parameters<typeof sendChatAction>[0]["action"] }));
        break;
      }

      case "poll": {
        const sub = positional[0];
        switch (sub) {
          case "send": {
            const chatId = positional[1];
            const question = positional[2];
            const optionsJson = positional[3];
            if (!chatId || !question || !optionsJson) {
              error("Usage: tg poll send <chat_id> <question> <options_json>");
            }
            const options = JSON.parse(optionsJson).map((o: string) => ({ text: o }));
            output(await sendPoll({
              chat_id: chatId,
              question,
              options,
              type: flags.quiz ? "quiz" : "regular",
              correct_option_id: flags.correct ? parseInt(flags.correct) : undefined,
              is_anonymous: flags.anonymous === "true",
            }));
            break;
          }
          case "stop": {
            const chatId = positional[1];
            const msgId = parseInt(positional[2]);
            output(await stopPoll({ chat_id: chatId, message_id: msgId }));
            break;
          }
          default:
            error("Usage: tg poll <send|stop>");
        }
        break;
      }

      case "sticker": {
        const sub = positional[0];
        switch (sub) {
          case "set":
            output(await getStickerSet(positional[1]));
            break;
          case "emojis":
            output(await getCustomEmojiStickers(JSON.parse(positional[1])));
            break;
          case "upload": {
            const userId = parseInt(positional[1]);
            const path = positional[2];
            const format = positional[3] as "static" | "animated" | "video";
            output(await uploadStickerFile({ user_id: userId, sticker: path, sticker_format: format }));
            break;
          }
          case "create-set": {
            const userId = parseInt(positional[1]);
            const name = positional[2];
            const title = positional[3];
            const stickers = JSON.parse(positional[4]);
            output(await createNewStickerSet({ user_id: userId, name, title, stickers }));
            break;
          }
          case "add": {
            const userId = parseInt(positional[1]);
            const name = positional[2];
            const sticker = JSON.parse(positional[3]);
            output(await addStickerToSet({ user_id: userId, name, sticker }));
            break;
          }
          case "position":
            output(await setStickerPositionInSet({ sticker: positional[1], position: parseInt(positional[2]) }));
            break;
          case "delete":
            output(await deleteStickerFromSet(positional[1]));
            break;
          case "replace": {
            const userId = parseInt(positional[1]);
            const name = positional[2];
            const oldSticker = positional[3];
            const newSticker = JSON.parse(positional[4]);
            output(await replaceStickerInSet({ user_id: userId, name, old_sticker: oldSticker, sticker: newSticker }));
            break;
          }
          case "set-emoji":
            output(await setStickerEmojiList({ sticker: positional[1], emoji_list: JSON.parse(positional[2]) }));
            break;
          case "set-keywords":
            output(await setStickerKeywords({ sticker: positional[1], keywords: JSON.parse(positional[2]) }));
            break;
          case "set-title":
            output(await setStickerSetTitle({ name: positional[1], title: positional[2] }));
            break;
          case "delete-set":
            output(await deleteStickerSet(positional[1]));
            break;
          default:
            error("Usage: tg sticker <set|emojis|upload|create-set|add|position|delete|...>");
        }
        break;
      }

      case "inline": {
        const sub = positional[0];
        switch (sub) {
          case "answer": {
            const queryId = positional[1];
            const results = JSON.parse(positional[2]);
            output(await answerInlineQuery({ inline_query_id: queryId, results }));
            break;
          }
          case "webapp": {
            const queryId = positional[1];
            const result = JSON.parse(positional[2]);
            output(await answerWebAppQuery({ web_app_query_id: queryId, result }));
            break;
          }
          default:
            error("Usage: tg inline <answer|webapp>");
        }
        break;
      }

      case "payment": {
        const sub = positional[0];
        switch (sub) {
          case "invoice": {
            const chatId = positional[1];
            const title = positional[2];
            const desc = positional[3];
            const payload = positional[4];
            const currency = positional[5];
            const prices = JSON.parse(positional[6]);
            output(await sendInvoice({
              chat_id: chatId,
              title,
              description: desc,
              payload,
              currency,
              prices,
            }));
            break;
          }
          case "link": {
            const title = positional[1];
            const desc = positional[2];
            const payload = positional[3];
            const currency = positional[4];
            const prices = JSON.parse(positional[5]);
            output(await createInvoiceLink({
              title,
              description: desc,
              payload,
              currency,
              prices,
            }));
            break;
          }
          case "shipping": {
            const queryId = positional[1];
            const ok = positional[2] === "true";
            const options = positional[3] ? JSON.parse(positional[3]) : undefined;
            output(await answerShippingQuery({ shipping_query_id: queryId, ok, shipping_options: options }));
            break;
          }
          case "precheckout": {
            const queryId = positional[1];
            const ok = positional[2] === "true";
            const errMsg = positional[3];
            output(await answerPreCheckoutQuery({ pre_checkout_query_id: queryId, ok, error_message: errMsg }));
            break;
          }
          case "refund": {
            const userId = parseInt(positional[1]);
            const chargeId = positional[2];
            output(await refundStarPayment({ user_id: userId, telegram_payment_charge_id: chargeId }));
            break;
          }
          case "stars":
            output(await getStarTransactions(
              positional[1] ? parseInt(positional[1]) : undefined,
              positional[2] ? parseInt(positional[2]) : undefined
            ));
            break;
          default:
            error("Usage: tg payment <invoice|link|shipping|precheckout|refund|stars>");
        }
        break;
      }

      case "game": {
        const sub = positional[0];
        switch (sub) {
          case "send": {
            const chatId = parseInt(positional[1]);
            const shortName = positional[2];
            output(await sendGame({ chat_id: chatId, game_short_name: shortName }));
            break;
          }
          case "score": {
            const userId = parseInt(positional[1]);
            const score = parseInt(positional[2]);
            output(await setGameScore({
              user_id: userId,
              score,
              chat_id: flags.chat ? parseInt(flags.chat) : undefined,
              message_id: flags.message ? parseInt(flags.message) : undefined,
            }));
            break;
          }
          case "scores": {
            const userId = parseInt(positional[1]);
            output(await getGameHighScores({
              user_id: userId,
              chat_id: flags.chat ? parseInt(flags.chat) : undefined,
              message_id: flags.message ? parseInt(flags.message) : undefined,
            }));
            break;
          }
          default:
            error("Usage: tg game <send|score|scores>");
        }
        break;
      }

      case "callback": {
        const sub = positional[0];
        if (sub === "answer") {
          const queryId = positional[1];
          const text = positional[2];
          output(await answerCallbackQuery({
            callback_query_id: queryId,
            text,
            show_alert: flags.alert === "true",
            url: flags.url,
          }));
        } else {
          error("Usage: tg callback answer <query_id> [text]");
        }
        break;
      }

      case "boosts": {
        const chatId = positional[0];
        const userId = parseInt(positional[1]);
        output(await getUserChatBoosts({ chat_id: chatId, user_id: userId }));
        break;
      }

      case "business": {
        const connId = positional[0];
        output(await getBusinessConnection(connId));
        break;
      }

      case "photos": {
        const userId = parseInt(positional[0]);
        output(await getUserProfilePhotos({ user_id: userId }));
        break;
      }

      default:
        error(`Unknown command: ${command}. Run 'tg help' for usage.`);
    }
  } catch (err) {
    error(err instanceof Error ? err.message : String(err));
  }
}

main();
