#!/bin/bash
set -euo pipefail

# Telegram polling hook for Claude Code
# Checks for new updates and blocks exit if there are pending messages

STATE_FILE="${CLAUDE_PROJECT_DIR:-.}/.claude/telegram-polling.local.md"

# If no state file, polling is not active - allow exit
if [ ! -f "$STATE_FILE" ]; then
  echo '{"decision": "approve"}'
  exit 0
fi

# Extract last_offset from frontmatter
last_offset=$(sed -n '/^---$/,/^---$/p' "$STATE_FILE" | grep "^last_offset:" | cut -d' ' -f2)
offset_arg=""
if [ -n "$last_offset" ] && [ "$last_offset" != "null" ]; then
  offset_arg="--offset $last_offset"
fi

# Poll for updates with short timeout
result=$(tg updates poll --timeout 1 $offset_arg 2>&1) || true

# Check if we got any updates
if echo "$result" | grep -qF '"update_id"'; then
  # Extract the updates for Claude to process
  updates=$(echo "$result" | jq -c '.result // []')

  # Get the highest update_id + 1 for next offset
  new_offset=$(echo "$result" | jq '[.result[].update_id] | max + 1 // null')

  # Update state file with new offset
  if [ "$new_offset" != "null" ]; then
    sed -i.bak "s/^last_offset:.*/last_offset: $new_offset/" "$STATE_FILE" && rm -f "${STATE_FILE}.bak"
  fi

  # Block exit and inject updates for Claude to process
  cat <<EOF
{
  "decision": "block",
  "reason": "New Telegram messages received",
  "systemMessage": "New Telegram updates received. Process these messages:\n\n\`\`\`json\n$updates\n\`\`\`\n\nRespond to any messages that need a response, then continue polling with: tg updates poll --offset $new_offset"
}
EOF
else
  # No updates - allow exit but remind about polling
  echo '{"decision": "approve", "systemMessage": "No new Telegram messages. Polling will resume on next notification."}'
fi
